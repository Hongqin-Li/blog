+++
tags = ["operating-system", "notes"]
+++
# 操作系统笔记



## Overview

### 操作系统的阶段

- Open Shop（开放车间）
- Batch Processing（批处理）：先进先出（FIFO）的工作方式
  - FIFO对于系统吞吐率的影响：不利于短作业（就平均等待时间而言），还不利于资源利用（不可分割的程序出错代价高）
- Multiprogramming（多道程序设计）：受益于技术进步（内存增大、可随机访问的二级存储器、中断硬件）
- Timesharing（分时）
- Concurrent Programming（并发程序设计）
- Personal Computing（PC）
- Distributed System（分布式系统）



## Memory Management



## Concurrency

1. Explain memory hierarchy and cost-performance trade-offs.
2. Summarize the principles of virtual memory as applied to caching and paging.
3. Evaluate the trade-offs in term s of memory size (main memory, cache memory, auxiliary memory) and  processor speed.
4. Defend the different ways of allocating memory to tasks, citing the relative merits of each.
5. Describe the reason for and use of cache memory (performance and proximity, different dimension of how caches complicate isolation and VM abstraction).
6. Discuss the concept of thrashing, both in terms of the reasons it occurs and the techniques used to recognize and manage the problem. 



### 死锁的充要条件

- 互斥
- 持有并等待
- 循环等待
- 不可剥夺

### Deadlock Prevention

破除四个条件中的一个即可，破除互斥（不可行，会产生竞态条件）、破除持有并等待（非持有或者不等待，即不申请或一次性申请）、破除循环等待（单调申请策略、进退策略）、破除不可剥夺

### Deadlock Avoidance

系统安全，系统安全一定没有死锁，系统不安全可能有死锁，当前系统安全并不意味着之后也安全。

在每次分配资源时候，跑银行家算法（[The Banker’s Algorithm](https://en.wikipedia.org/wiki/Banker's_algorithm)）：模拟该次资源分配，并检测系统是否安全，复杂度为$O(mn^2)$

- `Available[m]`：资源向量，元素为特定资源的总实例数；
- `Max[n][m]`：进程对资源的需求矩阵，元素`Max[i][j]＝k`表明进程`Pi`对资源`Rj`的总需求实例数为`k`
- `Allocation[n][m]`：已分配资源矩阵，元素`Allocation[i][j]＝k`表明进程`Pi`已获得资源`Rj`的实例数为`k`
- `Need[n][m]`：未来资源需求矩阵，元素`Need[i][j]＝k`表明进程`Pi`将需要资源`Rj`的`k`个实例。显然，`Need[i][j]＝ Max[i][j] - Allocation[i][j]`。



```pseudocode
/** The Banker's Algorithm - Resource-Request Algorithm **/

/* Let Request[i][] be the request vector for process Pi.If Request[i][j] = k,then process Pi wants k instances of resource type Rj . When a request for resources is made by process Pi , the following actions are taken */

1. If Need[i][] ≤ Request[i][] raise an error condition, since the process has exceeded its maximum claim and exit;
2. If Available[] ≤ Request[i][] Pi must wait, since the resources are not available;
3. Have the system pretend to have allocated the requested resources to process Pi by modifying the state as follows:
   a. Available[] = Available[] – Request[i][] ; 
   b. Allocation[i][] = Allocation[i][] + Request[i][]; 
   c. Need[i][] = Need[i][] – Request[i][];
   d. If Safety function returns TRUE, the transaction is completed, and process Pi is allocated its resources. Otherwise, Pi must wait for Request[i][] , and the previous resource-allocation state is restored.
   
/** The Banker's Algorithm - Safety Algorithm **/

/* Let Work and Finish be vectors of length m and n, respectively. */ 
1. Work[] = Available[];
2. Finish[] = FALSE;
3. Find an index i such that both
   a. Finish[i] == FALSE, and
   b. Need[i][] ≤ Work;
   If no such i exists, go to step 6;
3. Work[] = Work[] + Allocation[i][] 
4. Finish[i] = TRUE;
5. Go to step 3;
6. Return (Finish[] == TRUE);
```



### Deadlock Detection and Recovery

不定期跑如下检测算法，类似安全检测算法，复杂度为$O(m n^2)$

```pseudocode
/** Deadlock Detection Algorithm **/

/* Let Work and Finish be vectors of length m and n, respectively.*/
1. Work[] = Available[];
2. For i = 0, 1, ..., n–1, 
      if Allocation[i] != 0 
         Finish[i] = FALSE; 
      else
         Finish[i] = TRUE;
3. Find an index i such that both
      a. Finish[i] == FALSE, and
      b. Request[i][] ≤ Work[];
   If no such i exists, go to step 7.
4. Work[] = Work[] + Allocation[i][]; /* collect resources of Pi */
5. Finish[i] = TRUE;
6. Go to step 3.
7. If Finish[i] == false for some i, 0 ≤ i < n, then the system is in a deadlocked state. More specifically, if Finish[i] == false, then process Pi is deadlocked.
```



## Scheduling and Dispatch

### 调度类型

- 长程调度：进程一开始是否能被运行，即进程一开始执行的调度
- 中程调度：进程是否要swap，即内存和二级内存（swap分区/磁盘）的调度
- 短程调度：调度就绪队列中哪个进程
- 磁盘调度：安排磁盘访问请求的执行顺序，以减少寻道时间或改善其它性能指标

### 调度性能指标

- CPU利用率
- 吞吐率：单位时间内进程完成数目
- 周转时间：进程从提交到完成的时间（运行时间+等待时间）
- 等待时间：进程处于非运行状态的时间
- 响应时间：从请求开始到开始响应的时间
- 公平性：调度策略应该尽量保持多所有待调度对象的公平处理，在需要优先照顾时也能体现等级差别

### 调度策略

非抢占式调度，也称为协作调度（[Nonpreemptive Scheduling](https://en.wikipedia.org/wiki/Cooperative_multitasking)）指的是运行进程除非自己主动放弃处理器，其它进程无法获得处理器而投入运行的调度方式。

抢占式调度（[Preemptive Scheduling](https://en.wikipedia.org/wiki/Preemption_(computing))）指的是当前进程由于非自身主动放弃处理器，而被暂时剥夺执行权力，留待之后再次调度时继续运行的一种调度方式。导致抢占的原因有如基于优先级的调度，时钟中断等。有更好的响应能力、执行调优能力和获得公平性的可能性。

一些简单的调度策略如下：

- 先来先服务（[First-Come-First-Served, FCFS](https://en.wikipedia.org/wiki/First-come,_first-served)）：优点是公平，缺点是短作业在后的等待时间会比较长，且非抢占式，不适用于分时系统。
- 轮转（[Round-Robin, RR](https://en.wikipedia.org/wiki/Round-robin_scheduling)）：按照时间片来通过时钟中断抢占CPU。优点是公平、兼顾长短作业，缺点是时间片趋于无穷大时为FCFS，时间片过小则会消耗大量时间在上下文切换上。适用于分时系统。

#### 短作业优先

短作业优先（[Shortest-Job-First, SJF](https://en.wikipedia.org/wiki/Shortest_job_next)或称SPN）：其抢占式版本也称为最小剩余时间优先（[Shortest-Remaining-time-First, SRF](https://en.wikipedia.org/wiki/Shortest_remaining_time)）策略。易证，SJF将给出最小的平均等待时间。优点是，缺点是，适用于

更适合于作业调度（[Job Scheduling](https://en.wikipedia.org/wiki/Job_scheduler)），属于长程调度范畴。因为用户可以对作业的总运行时间有一个较好的估计。也可用指数移动平均（[Exponential Moving Average](https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average)）方法预测下一次所需时间，令$t_n$代表第$n$次占用的时间，$\tau_{n+1}$为待预测的下一个所需时间，并令$\tau_{n+1}=\alpha t_n + (1-\alpha)\tau_n, 0\le \alpha \le 1$ 。

#### 高响应比优先

优先级定义为 $\text{priority} = \frac{\text{Response Time}}{\text{Expected Service Time}} = \frac{\text{Waiting Time } + \text{ Expected Service Time}}{\text{Expected Service Time}} = \frac{\text{Waiting Time }}{\text{Expected Service Time}}+1$。若等待时间相同的情况下，则为SJF，若期望服务时间相同，则为FCFS。优点是兼顾了长短作业，缺点是计算需要额外开销，适合批处理系统

#### 多重反馈队列

将时间片轮转与优先级调度相结合，把进程按优先级分成不同的队列，先按优先级调度，优先级相同的，按时间片轮转。优点是兼顾长短作业，有较好的响应时间，可行性强，适用于各种作业环境

TODO

#### 公平分享

公平分享调度（[Fair-Share Scheduling](https://en.wikipedia.org/wiki/Fair-share_scheduling)）策略关注进程分享CPU执行机会的公平性。经典的方法有乐透式调度策略（[Lottery Scheduling](https://en.wikipedia.org/wiki/Lottery_scheduling)）和带有**分组**特征的情况，力图在各个组间保持处理器的均衡分享，并兼顾组内各进程的公平分享。

Linux CFS

TODO

## Device Management

TODO

## File Systems

TODO

## Virtual Machine

TODO

## 面试题

操作系统的功能：进程管理、内存管理（隔离）、设备管理、API接口

### 进程

进程与线程的概念：进程是系统进行资源分配和调度的独立单位，以提高资源利用率和吞吐量；线程是比进程更小的可独立运行的基本单位，可理解为轻量级进程，目的是减少进程切换开销

进程和线程的区别：并发性（不同进程间并发、同一进程内的线程并发）、资源（进程是资源分配的单位，而线程资源的很少，但在同一进程下由相同的访问空间）、系统开销（同一进程下的线程由于共享地址空间，便于通信同步）

进程通信的几种方式：管道、消息队列、Signal、共享内存

进程同步的几种方式

用户态、核心态（Kernel Mode）的区别

### 死锁

死锁的概念：死锁（[Deadlock](https://en.wikipedia.org/wiki/Deadlock)）是一种进程间互锁的情况，这组进程中的每一个进程都在以其他进程产生的事件作为推进条件

导致死锁的充要条件：互斥、持有并等待、循环等待、不可剥夺

处理死锁的方式：预防、避免、检测并恢复、无视（鸵鸟政策）

死锁的预防：破除四个条件中的一个即可，具体措施及优缺点分析

死锁的避免：银行家算法原理

死锁的检测与恢复：检测算法，恢复通常采用鸵鸟政策



### 调度

进程调度算法及优缺点分析

FCFS、SJF、轮询、高响应比、多重反馈队列



### VM

内存连续分配方式采用的几种算法及各自优劣

分页和分段的区别，优缺点比较

几种页面置换算法，如何计算所需换页数

虚拟内存的定义和实现方式

