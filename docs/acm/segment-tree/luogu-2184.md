+++
tags = ["data-structure", "tricks"]
+++

# 洛谷-P2184 贪婪大陆

小FF最后一道防线是一条长度为 N 的战壕， 小FF拥有无数多种地雷，而SCV每次可以在 [L, R] 区间埋放同一种不同于之前已经埋放的地雷。由于情况已经十万火急，小FF在某些时候可能会询问你在 [L', R'] 区间内有多少种不同的地雷，他希望你能尽快的给予答复。

对于30%的数据： 0<=n, m<=1000;

对于100%的数据： 0<=n, m<=10^5.

## Input

第一行为两个整数n和m；n表示防线长度，m表示SCV布雷次数及小FF询问的次数总和。

接下来有m行，每行三个整数Q, L, R； 若 Q=1 则表示SCV在 [L, R] 这段区间布上一种地雷，若 Q=2 则表示小FF询问当前 [L, R] 区间总共有多少种地雷。

## Output

对于小FF的每次询问，输出一个答案（单独一行），表示当前区间地雷种数。

## Sample Input

```
5 4
1 1 3
2 2 5
1 2 4
2 3 5
```

## Sample Output

```
1
2
```

## Solution

问题可化为查询与区间 [L, R] 相交的区间个数 C

我一开始的想法是 C = $r_i \in [L, R]$ 的区间个数 + $r_i > R \text{ and } l_i \le R$ 的区间个数，用两棵线段树维护即可，而标程的思路是 C = 左端点小于等于R的区间个数 - 右端点小于L的区间个数，用两个树状数组维护即可。

```c++
#include <cstdio>

const int MAXN = 100007;
int n;
struct BIT {
  int bit[MAXN];
  inline int lowbit(int i) { return i & -i; }
  void add(int i, int x) {
    for (; i <= n; i += lowbit(i)) bit[i] += x;
  }
  int sum(int i) {
    int sum = 0;
    for (; i; i -= lowbit(i)) sum += bit[i];
    return sum;
  }
} tl, tr;

int main() {
  int m;
  scanf("%d%d", &n, &m);
  while (m--) {
    int op, l, r;
    scanf("%d%d%d", &op, &l, &r);
    if (op == 1)
      tl.add(l, 1), tr.add(r, 1);
    else
      printf("%d\n", tl.sum(r) - tr.sum(l-1));
  }
  return 0;
}
```

```c++
#include <cstdio>
#include <algorithm>
using namespace std;

const int MAXN = 500003;

int n;
struct SegmentTree {
  struct Node {
    int val, tag, x;
  } node[MAXN];
  int ql, qr, qx;

  inline int left(int i) { return i<<1; }
  inline int right(int i) { return (i<<1) + 1;}

  void update(int l, int r, int p, int x) {
    node[p].val += (r-l+1)*x;
    if (node[p].tag) node[p].x += x;
    else node[p].tag = 1, node[p].x = x;
  }
  void pushdown(int l, int r, int p) {
    if (node[p].tag) {
      node[p].tag = 0;
      int m = (l+r)/2, lc = left(p), rc = right(p);
      update(l, m, lc, node[p].x);
      update(m+1, r, rc, node[p].x);
    }
  }
  void modify(int l, int r, int p) {
    if (ql <= l && r <= qr)
      update(l, r, p, qx);
    else if (ql <= r && qr >= l) {
      int m = (l+r)/2, lc = left(p), rc = right(p);
      pushdown(l, r, p);
      modify(l, m, lc);
      modify(m+1, r, rc);
      node[p].val = node[lc].val + node[rc].val;
    }
  }
  int query(int l, int r, int p) {
    if (ql <= l && r <= qr) return node[p].val;
    else if (ql <= r && qr >= l) {
      int m = (l+r)/2, lc = left(p), rc = right(p);
      pushdown(l, r, p);
      return query(l, m, lc) + query(m+1, r, rc);
    }
    return 0;
  }

  void add(int l, int r, int dx) {
    qx = dx, ql = l, qr = r;
    modify(1, n, 1);
  }
  int sum(int l, int r) {
    ql = l, qr = r;
    return query(1, n, 1); 
  }
} t1, t2;

int main() {
  int m;
  scanf("%d%d", &n, &m);
  while (m--) {
    int op, l, r;
    scanf("%d%d%d", &op, &l, &r);
    if (op == 1) t1.add(r, r, 1), t2.add(l, r-1, 1);
    else printf("%d\n", t1.sum(l, r) + t2.sum(r, r));
  }
  return 0;
}
```
