+++
tags = ["data-structure"]
+++

# 洛谷-P3373 【模板】线段树 2

如题，已知一个数列，你需要进行下面三种操作：将某区间每一个数乘上 $x$，将某区间每一个数加上 $x$，求出某区间每一个数的和。

## Input

第一行包含三个整数 $n,m,p$，分别表示该数列数字的个数、操作的总个数和模数。

第二行包含 $n$ 个用空格分隔的整数，其中第 $i$ 个数字表示数列第 $i$ 项的初始值。

接下来 $m$ 行每行包含若干个整数，表示一个操作，具体如下：

操作 1： 格式：`1 x y k` 含义：将区间 $[x,y]$ 内每个数乘上 $k$

操作 2： 格式：`2 x y k` 含义：将区间 $[x,y]$ 内每个数加上 $k$

操作 3： 格式：`3 x y` 含义：输出区间 $[x,y]$ 内每个数的和对 $p$ 取模所得的结果

## Ouput

输出包含若干行整数，即为所有操作 333 的结果。

## Sample Input

Sample input 1:

```
5 5 38
1 5 4 2 3
2 1 4 1
3 2 5
1 2 4 2
2 3 5 5
3 1 4
```

Sample input 2:

```
8 10 571373
5929 7152 8443 6028 8580 5449 8473 4237 
2 4 8 4376
1 2 8 9637
2 2 6 7918
2 5 8 5681
3 2 8
1 1 5 6482
3 1 5
1 5 8 8701
2 5 8 7992
2 5 8 7806
```

## Sample Output

Sample output 1:
```
17
2
```

Sample output 2:

```
478836
562114
```

## Solution

线段树板子

```c
#include <stdio.h>

#define MAXN 400007

#define left(i) (i<<1)
#define right(i) ((i<<1) + 1)

int n, m, a[MAXN];
long long mod;
struct Node {
  int tag;
  long long val;
  long long k, d;
} node[MAXN];
// For modify/query
int ql, qr;
long long qk, qd;

// 1. Make sure the val is valid
// 2. Add tag or merge previous tag
void update(int l, int r, int p, long long qk, long long qd) {
  node[p].val = (node[p].val * qk + (long long)(r-l+1)*qd) % mod;
  if (node[p].tag) {
    node[p].k = (node[p].k * qk) % mod;
    node[p].d = (node[p].d * qk + qd) % mod;
  }
  else {
    node[p].tag = 1;
    node[p].k = qk;
    node[p].d = qd;
  }
}

// Make sure the val of left/right child is valid
void pushdown(int l, int r, int p) {
  if (node[p].tag) {
    node[p].tag = 0;
    if (l < r) {
      int m = (l+r)/2;
      update(l, m, left(p), node[p].k, node[p].d);
      update(m+1, r, right(p), node[p].k, node[p].d);
    }
  }
}

void build(int l, int r, int p) {
  if (l == r) node[p].val = a[l];
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    node[p].val = (node[lc].val + node[rc].val) % mod;
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr)
    update(l, r, p, qk, qd);
  else if (ql <= r && qr >= l) {
    int m = (l + r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p);
    modify(l, m, lc);
    modify(m+1, r, rc);
    node[p].val = (node[lc].val + node[rc].val) % mod;
  }
}

long long query(int l, int r, int p) {
  if (ql <= l && r <= qr)
    return node[p].val;
  else if (ql <= r && qr >= l) {
    int m = (l + r)/2;
    pushdown(l, r, p);
    return (query(l, m, left(p)) + query(m+1, r, right(p))) % mod;
  }
  return 0;
}

int main() {
  scanf("%d%d%lld", &n, &m, &mod);
  for (int i = 1; i <= n; i ++) scanf("%d", a+i);
  build(1, n, 1);
  while (m--) {
    int op;
    scanf("%d%d%d", &op, &ql, &qr);
    if (op == 1) {
      scanf("%lld", &qk);
      qd = 0;
      modify(1, n, 1);
    }
    else if (op == 2) {
      scanf("%lld", &qd);
      qk = 1;
      modify(1, n, 1);
    }
    else
      printf("%lld\n", query(1, n, 1) % mod);
  }

  return 0;
}
```
