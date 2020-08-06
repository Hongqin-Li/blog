+++
tags = ["data structures"]
+++

# 洛谷-P4145 上帝造题的七分钟2

"第一分钟，X说，要有数列，于是便给定了一个正整数数列。

第二分钟，L说，要能修改，于是便有了对一段数中每个数都开平方(下取整)的操作。

第三分钟，k说，要能查询，于是便有了求一段数的和的操作。

第四分钟，彩虹喵说，要是noip难度，于是便有了数据范围。

第五分钟，诗人说，要有韵律，于是便有了时间限制和内存限制。

第六分钟，和雪说，要省点事，于是便有了保证运算过程中及最终结果均不超过64位有符号整数类型的表示范围的限制。

第七分钟，这道题终于造完了，然而，造题的神牛们再也不想写这道题的程序了。"

《上帝造题的七分钟·第二部》

所以这个神圣的任务就交给你了。

## Input

第一行一个整数 $n$，代表数列中数的个数。

第二行 $n$ 个正整数，表示初始状态下数列中的数。

第三行一个整数 $m$，表示有 $m$ 次操作。

接下来 $m$ 行每行三个整数 $k,l,r$

- $k=0$ 表示给 $[l,r]$  中的每个数开平方(下取整)
- $k=1$ 表示询问 $[l,r]$ 中各个数的和。

数据中有可能 $l>r$，所以遇到这种情况请交换 $l$ 和 $r$。

$1\le n,m\le 100000$, $1\le l,r\le n$，数列中的数大于 $0$，且不超过 $10^{12}$。

## Output

对于询问操作，每行输出一个回答。

## Sample Output

```
10
1 2 3 4 5 6 7 8 9 10
5
0 1 10
1 1 10
1 1 5
0 5 8
1 4 8
```

## Sample Input

```
19
7
6
```

## Solution

注意到每个数最多被连续开方的次数小于7，之后开方总是1，于是用线段树维护区间是否全1，若是则不用修改该区间。有点类似剪枝线段树。

```c
#include <stdio.h>
#include <math.h>

#define MAXN 400007

#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

long long a[MAXN];
struct Node {
  int all1;
  long long val;
} node[MAXN];
int ql, qr;

void pushup(int l, int r, int p) {
  int m = (l+r)/2, lc = left(p), rc = right(p);
  node[p].all1 = node[lc].all1 & node[rc].all1;
  node[p].val = node[lc].val + node[rc].val;
}

void build(int l, int r, int p) {
  if (l == r) node[p].val = a[l];
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    pushup(l, r, p);
  }
}

void modify(int l, int r, int p) {
  if (node[p].all1) return;
  if (l == r) {
    node[p].val = sqrt(node[p].val);
    if (node[p].val == 1) node[p].all1 = 1;
  }
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    if (ql <= m) modify(l, m, lc);
    if (qr >= m+1) modify(m+1, r, rc);
    pushup(l, r, p);
  }
}

long long query(int l, int r, int p) {
  if (ql <= l && r <= qr) return node[p].val;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    return query(l, m, lc) + query(m+1, r, rc);
  }
  return 0;
}

int main() {
  int n, m, op;
  scanf("%d", &n);
  for (int i = 1; i <= n; i ++) scanf("%lld", a+i);
  build(1, n, 1);
  scanf("%d", &m);
  while (m--) {
    scanf("%d%d%d", &op, &ql, &qr);
    if (ql > qr) { int t = ql; ql = qr; qr = t; }
    if (op == 0) modify(1, n, 1);
    else printf("%lld\n", query(1, n, 1));
  }
  return 0;
}
```
