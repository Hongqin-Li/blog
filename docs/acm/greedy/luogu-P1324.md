+++
tags = ["greedy"]
+++



# 「洛谷P1324」矩形分割

出于某些方面的需求，我们要把一块N×M的木板切成一个个1×1的小方块。

对于一块木板，我们只能从某条横线或者某条竖线（要在方格线上），而且这木板是不均匀的，从不同的线切割下去要花不同的代价。而且，对于一块木板，切割一次以后就被分割成两块，而且不能把这两块木板拼在一起然后一刀切成四块，只能两块分别再进行一次切割。

现在，给出从不同的线切割所要花的代价，求把整块木板分割成1×1块小方块所需要耗费的最小代价。



输入格式：第一行包括N和M，表示长N宽M的矩阵。第二行包括N-1个非负整数，分别表示沿着N-1条横线切割的代价。第三行包括M-1个非负整数，分别表示沿着M-1条竖线切割的代价。

输出格式：一个整数，表示最小代价。



## 样例

输入

```
2 2
3
3
```

输出

```
9
```



## 思路

贪心，令$m = m_1 + m_2, n = n_1+n_2$，解递推式$f(m, n) = f(m_1, n) + f(m_2, n) = f(m, n_1) + f(m, n_2)$，可知切的次数恰为$N\cdot M-1$。由于总次数是固定的，要想代价大的切法（某一行/列）次数最小，尽可能地早切，且要切完（从左切到右/从上切到下）



## 代码

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 4005;
int n, m;
struct Cut {
  int cost, type;
  bool operator<(const struct Cut& rhs) const {
    return cost < rhs.cost;
  }
} a[MAXN];

int main() {
  scanf("%d%d", &n, &m);
  for (int i = 0; i < n-1 + m-1; i ++) {
    scanf("%d", &a[i].cost);
    a[i].type = i < n-1 ? 0: 1;
  }
  sort(a, a + (n+m-2));
  long long ans = 0;
  int cx = 0, cy = 0;
  for (int i = n+m-2-1; i >= 0; i --) {
    if (!a[i].type) {
      ans += (cy+1)*a[i].cost;
      cx ++;
    }
    else {
      ans += (cx+1)*a[i].cost;
      cy ++;
    }
  }
  printf("%lld", ans);

  return 0;
}
```



