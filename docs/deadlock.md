# 死锁检测 —— parking_lot 源码阅读

[toc]

## 1 概述

[parking_lot](https://github.com/Amanieu/parking_lot) 是 Rust 中的一个用来检测死锁的库，提供了一些基本而高效的同步原语（Mutex、条件变量，读写锁），且提供了一个实验性的死锁检测方法。当使用这些原语的时候，锁的申请和释放都会被记录，从而可以实现死锁的检测。它采用简单的 [Wait-for Graph](https://en.wikipedia.org/wiki/Wait-for_graph) 算法来完成死锁检测。

作为开始，我们先来复习一下这些同步原语。

### 1.1 Mutex

互斥锁，顾名思义就是同一时刻至多一个线程能持有该锁，其他等待的线程进行自旋或入睡，直至锁的释放。用来保护需要互斥访问的资源。

### 1.2 RwLock

Mutex 的改进版，同一时刻只有如下三种情况

- 锁空闲
- 一个写者持有该锁
- 若干个读者共同持有该锁

### 1.3 Condition variable

条件变量含有 wait/signal 两个操作，wait 就是等待（睡眠当前进程）直到有人来唤醒该变量，signal 就是唤醒所有正在等待该变量的进程



## 2 Wait-for Graph

parking_lot 将资源和线程都视作节点，等候关系视作有向边。注意到由于不存在资源等待资源、线程等待线程（线程不会直接等待线程，线程只会等待某个锁即资源）的情况，边仅有如下两种

- 资源等待线程释放它（从资源节点指向线程节点的边）：当线程持有了某种资源
- 线程等待资源被释放（从线程节点指向资源节点的边）：当线程想持有某种资源，但该资源已经被占用，于是当前线程进入睡眠，等待资源释放后唤醒之

显然，这是个二分图（然并卵）。由于信号量、读写锁均可用多个 Mutex 来实现，于是采用这些原语的资源总可以用一些 Mutex 来表示，我们可以将 Mutex 视作节点。易证，在只有 Mutex 场景下，有环等价于死锁。

### 2.1 Code: check_deadlock

这个函数中真正进行死锁检测是 `check_wait_graph_slow`，依次做了如下

- 对全局的线程持有锁的信息加锁，因为解除死锁需要改变这些信息
- 根据这些信息构建 Wait-for Graph，并用 DFS 得到图上的所有环
- 获取这些环上的所有线程节点的信息并上报，因为它们都陷入了死锁中



## 3 线程等待情况

在构建 wait-for graph 来检测死锁之前，我们需要知道系统中所有线程持有资源的情况，这可通过监控线程的每次拿锁、放锁、睡眠、唤醒来维护的。这也是为什么 parking_lot 只能检测到它提供的同步原语之间的死锁，而若使用标准库中的锁，则并不能给 parking_lot 提供这些信息。那需要记录哪些信息呢？注意到我们只需要维护如下两种边

- 线程等待资源，这通过维护一个全局等待队列即可（在实现等待队列的过程中完成了维护），对应于源码中的 `pack` 和 `unpack_one`
- 资源等待线程，在每次拿到资源后、释放资源前维护即可，对应于源码中的 `acquire_resouce` 和 `release_resource`



### 3.1 线程局部信息

为了维护每个线程各自的信息，parking_lot 采用 thread_local 宏为每个线程构造了一个 static 的 ThreadData 结构，下面仅展示了两个比较关键的信息。key 表示当前线程正在等待的资源的 key，deadlock_data 中有一个 vector 包含了所有当前线程已持有的资源的 key。

```rust
struct ThreadData {
    key: AtomicUsize,
    deadlock_data: deadlock::DeadlockData,
    ...
}
```

### 3.2 等待队列

为了执行效率，parking_lot 手写了哈希表来实现了一个等待队列，key 是线程正在等待的资源，value 是线程的 ThreadData。这其实也是 Unix v7 内核中实现进程睡眠的方式。

```rust
struct HashTable {
    // Hash buckets for the table
    entries: Box<[Bucket]>,
    ...
}

struct Bucket {
    // Lock protecting the queue
    mutex: WordLock,

    // Linked list of threads waiting on this bucket
    queue_head: Cell<*const ThreadData>,
    queue_tail: Cell<*const ThreadData>,
  	
    ...
}
```



### 3.3 已持有资源

```rust
pub unsafe fn acquire_resource(key: usize) {
  	// with_thread_data is just a wrapper of accessing thread-local data
    with_thread_data(|thread_data| {
        (*thread_data.deadlock_data.resources.get()).push(key);
    });
}

pub unsafe fn release_resource(key: usize) {
    with_thread_data(|thread_data| {
        let resources = &mut (*thread_data.deadlock_data.resources.get());
        if let Some(p) = resources.iter().rposition(|x| *x == key) {
            resources.swap_remove(p);
        }
    });
}
```

如上为具体维护当前线程已持有的资源，即拿到资源后、释放资源前维护已持有资源的操作，其实就是通过 ThreadData 中的 deadlock_data 中的 resource 字段的 vector 来记录的

```rust
pub struct DeadlockData {
    // Currently owned resources (keys)
    resources: UnsafeCell<Vec<usize>>,

    // Set when there's a pending callstack request
    deadlocked: Cell<bool>,

    // Sender used to report the backtrace
    backtrace_sender: UnsafeCell<Option<mpsc::Sender<DeadlockedThread>>>,

    // System thread id
    thread_id: usize,
}
```



## 4 死锁恢复

当监测到死锁后，理论上需要以最小代价来解除死锁，但 parking-lot 则并不会进行任何操作。但仔细想想，除了杀死对应线程/进程外，似乎也没有更好的方法了，因为加锁的初衷就是为了保护临界节的访问互斥性，贸然放锁而继续执行可能会违背程序原本的逻辑。



## 5 实验例子

```rust
use parking_lot::{deadlock, Mutex};
use std::sync::Arc;
use std::thread;
use std::time::Duration;

fn main() {
    let lk1 = Arc::new(Mutex::new(0 as u32));
    let lk2 = Arc::new(Mutex::new(0 as u32));

    let p1;
    let p2;

    {
        let (lk1, lk2) = (lk1.clone(), lk2.clone());
        p1 = thread::spawn(move || {
            let x = lk1.lock();
            thread::sleep(Duration::from_secs(1));
            let y = lk2.lock();
            println!("p1 finish");
        });
    }

    // Just revert the lock sequence to create a deadlock.
    {
        let (lk1, lk2) = (lk1.clone(), lk2.clone());
        p2 = thread::spawn(move || {
            let x = lk1.lock();
            thread::sleep(Duration::from_secs(1));
            let y = lk2.lock();
            println!("p2 finish");
        });
    }

    let p3 = thread::spawn(move || loop {
        thread::sleep(Duration::from_secs(2));
        let deadlocks = deadlock::check_deadlock();
        if deadlocks.is_empty() {
            println!("no deadlock");
            continue;
        }

        println!("{} deadlocks detected", deadlocks.len());
        for (i, threads) in deadlocks.iter().enumerate() {
            println!("Deadlock #{}", i);
            for t in threads {
                println!("Thread Id {:#?}", t.thread_id());
                println!("{:#?}", t.backtrace());
            }
        }
        break;
    });
    println!("p3: {:?}", p3.join());

    // check_deadlock doesn't recover from the detected deadlock
    // thus the following lines won't be reached.
    println!("p1: {:?}", p1.join());
    println!("p2: {:?}", p2.join());
}
```

这里简单的用两个线程来构造一个死锁，然后用第三个线程来检测其中发生的死锁，其中一种可能的死锁情况为

- 线程 1 拿到锁 1
- 线程 2 拿到锁 2
- 但它们都分别想拿对方的锁

相应的 wait-for graph 如下图，圆圈代表资源节点，方块代表线程节点

![](https://g.gravizo.com/svg?
  digraph G {
    aize ="4,4";
    p1 [shape=box];
    p2 [shape=box];
    p1 -> lk2 [weight=8];
    lk2 -> p2;
    p2 -> lk1;
    lk1 -> p1;
  }
)

### 5.1 依赖库中的全局变量

由于 parking_lot 中用了一些 static 数据来保存全局的线程等待信息，在多个依赖库都依赖 parking_lot 的时候，需要统一版本号来避免 cargo 编译出多个 static 变量，参见 [Do crates share public static variables of common dependencies?](https://stackoverflow.com/questions/38449414/do-crates-share-public-static-variables-of-common-dependencies)

