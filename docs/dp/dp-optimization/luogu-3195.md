+++
tags = ["dp"]
+++

# HNOI-2008 玩具装箱

P 教授要去看奥运，但是他舍不下他的玩具，于是他决定把所有的玩具运到北京。他使用自己的压缩器进行压缩，其可以将任意物品变成一堆，再放到一种特殊的一维容器中。

P 教授有编号为 $1 \cdots n$ 的 $n$ 件玩具，第 $i$ 件玩具经过压缩后的一维长度为 $C_i$。

为了方便整理，P教授要求：

- 在一个一维容器中的玩具编号是连续的。

- 同时如果一个一维容器中有多个玩具，那么两件玩具之间要加入一个单位长度的填充物。形式地说，如果将第 $i$ 件玩具到第 $j$ 个玩具放到一个容器中，那么容器的长度将为 $x=j-i+\sum\limits_{k=i}^{j}C_k$。

制作容器的费用与容器的长度有关，根据教授研究，如果容器长度为 $x$，其制作费用为 $(x-L)^2$。其中 $L$ 是一个常量。P 教授不关心容器的数目，他可以制作出任意长度的容器，甚至超过 $L$。但他希望所有容器的总费用最小。

## Input

第一行有两个整数，用一个空格隔开，分别代表 $n$ 和 $L$。

第 $2$ 到 第 $(n+1)$ 行，每行一个整数，第 $(i+1)$ 行的整数代表第 $i$ 件玩具的长度 $C_i$。

对于全部的测试点，$1 \leq n \leq 5 \times 10^4$，$1 \leq L \leq 10^7$，$1 \leq C_i \leq 10^7$。

## Output

输出一行一个整数，代表所有容器的总费用最小是多少。

## Examples

Input 1:

```
5 4
3
4
2
1
4
```

Output 1:

```
1
```

Input 2:

```
10 100
1
2
3
4
5
6
7
8
9
10
```

Output 2:

```
1296
```

## Solution

斜率优化 dp 例题

首先写出状态转移方程 $f_i = \min_{0 \le j \l i} \{ f_j + \left( i - j - 1 - L - \sum_{k=j+1}^i{} C_k \right)^2\}$

化简一下，暂时隐藏 $\min$，并令 $s_i = \sum_{i=1}^{i} c_i + i$，整理一下可得

$$
\underbrace{f[i] - {s_i}^2 + 2(L+1)s_i}_b =
\underbrace{\left(f[j] + s_j^2 + 2(l+1)s_j + (L+1)^2\right)}_{y_j} -
\underbrace{2s_i}_{k} \cdot \underbrace{s_j}_{x_j}
$$

注意到对于给定 $i$，k是固定的，而之前每个 $j$ 代表一个点 $(x_j, y_j)$，最小化截距 $b$ 就是最优解。画个图模拟一下可知这是一个下凸包。于是找到最近的那个点 $j_0$ 进行转移得到 $f[i]$（通常是二分），并计算出 $(x_i, y_i)$ 并加入凸包即可。而对于此题，由于 $s_i$ 是单调递增的，可以证明如果某个点在 $j_0$ 左边，即 $x < x_{j_0}$，我们维护凸包时不考虑它也可以保证正确性。故可用单调队列 $O(n)$ 维护。

注意判断斜率的时候交叉相乘会爆 long long，用除法即可

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int N = 5e4+3;

int n;
ll l, c[N], s[N], f[N];

struct Point { ll x, y; };
struct Item { int i; Point p; };

Point get_point(int i) {
  return {2*s[i], f[i]+s[i]*s[i]+2*(l+1)*s[i]+(l+1)*(l+1)};
}
double slope(Point p1, Point p2) {
  return (double)(p2.y - p1.y) / (p2.x - p1.x);
}

int main() {
  cin >> n >> l;
  for (int i = 1; i <= n; i ++) cin >> c[i], s[i] = s[i-1] + c[i];
  for (int i = 1; i <= n; i ++) s[i] += i;

  static Item q[N];
  int ql = 0, qr = 0;
  q[qr ++] = {0, get_point(0)};
  for (int i = 1; i <= n; i ++) {
    while (ql < qr-1 && slope(q[ql].p, q[ql+1].p) < s[i])
      ql ++;
    f[i] = q[ql].p.y - s[i] * q[ql].p.x + s[i]*s[i] - 2*(l+1)*s[i];
    auto p = get_point(i);
    while (ql < qr-1 && slope(q[qr-1].p, p) < slope(q[qr-2].p, p))
      qr --;
    q[qr++] = {i, p};
  }
  cout << f[n];
  return 0;
}
```
