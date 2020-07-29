+++
tags = ["data-structure"]
+++

# 洛谷-P1438 无聊的数列

维护一个数列 $a_i$，支持两种操作：

- 1 l r K D：给出一个长度等于 $r-l+1$ 的等差数列，首项为 $K$，公差为 $D$，并将它对应加到 $[l,r]$ 范围中的每一个数上。
- 2 p：询问序列的第 $p$ 个数的值 $a_p$。

## Input

第一行两个整数数 $n,m$ 表示数列长度和操作个数。

第二行 $n$ 个整数，第 $i$ 个数表示 $a_i$。

接下来的 $m$ 行，每行先输入一个整数 $opt$。

若 $opt=1$ 则再输入四个整数 $l\ r\ K\ D$；

若 $opt=2$ 则再输入一个整数 $p$。

$0\le n,m\le 105,−200\le ai,K,D\le 200,1\le l\le r\le n,1\le p\le n$

## Output

对于每个询问，一行一个整数表示答案。

## Sample Input

```
5 5
1 2 3 4 5
1 1 5 1 2
2 5
2 3
1 1 5 2 3
2 4
```

## Sample Output

```
14
8
22
```

## Solution

正常线段树维护即可，标记为需要加上的等差数列在当前区间上的首项和公差，注意同意等差数列在不同区间的首项不同。

```c
#include <stdio.h>

#define MAXN 400007

#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

int a[MAXN];
int ql, qr;
long long qk, qd;
struct Node {
  long long val, tag, a0, d;
} node[MAXN];

void update(int l, int r, int p, long long a0, long long d) {
  node[p].val += (a0 + a0+d*(r-l)) * (r-l+1) / 2;
  if (node[p].tag) node[p].a0 += a0, node[p].d += d;
  else node[p].tag = 1, node[p].a0 = a0, node[p].d = d;
}

void pushdown(int l, int r, int p) {
  if (node[p].tag) {
    node[p].tag = 0;
    int m = (l+r)/2, lc = left(p), rc = right(p);
    update(l, m, lc, node[p].a0, node[p].d);
    update(m+1, r, rc, node[p].a0 + (m+1-l)*node[p].d, node[p].d);
  }
}

void build(int l, int r, int p) {
  if (l == r) node[p].val = a[l]; 
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    node[p].val = node[lc].val + node[rc].val;
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr)
    update(l, r, p, qk + (l-ql)*qd, qd);
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p);
    modify(l, m, lc);
    modify(m+1, r, rc);
    node[p].val = node[lc].val + node[rc].val;
  }
}

long long query(int l, int r, int p) {
  if (ql <= l && r <= qr)
    return node[p].val;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p);
    return query(l, m, lc) + query(m+1, r, rc); 
  }
  return 0;
}

int main() {
  int n, m;
  scanf("%d%d", &n, &m);
  for (int i = 1; i <= n; i ++) scanf("%d", a+i);
  build(1, n, 1);
  while (m--) {
    int op;
    scanf("%d%d", &op, &ql);
    if (op == 1) {
      scanf("%d%lld%lld", &qr, &qk, &qd);
      modify(1, n, 1);
    }
    else {
      qr = ql;
      printf("%lld\n", query(1, n, 1));
    }
  }

  return 0;
}
```
