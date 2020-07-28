+++
tags = ["data-structure"]
+++

# 洛谷-P6327 区间加区间sin和

给出一个长度为 $n$ 的整数序列 $a_1,a_2,\ldots,a_n$，进行 $m$ 次操作，操作分为两类。

操作 $1$：给出 $l,r,v$，将 $a_l,a_{l+1},\ldots,a_r$ 分别加上 $v$。

操作 $2$：给出 $l,r$，询问 $\sum\limits_{i=l}^{r}\sin(a_i)$。

## Input

第一行一个整数 $n$。

接下来一行 $n$ 个整数表示 $a_1,a_2,\ldots,a_n$。

接下来一行一个整数 $m$。

接下来 $m$ 行，每行表示一个操作，操作 $1$ 表示为 1 l r v，操作 $2$ 表示为 2 l r。

## Output

对每个操作 $2$，输出一行，表示答案，四舍五入保留一位小数。

保证答案的绝对值大于 $0.1$，且答案的准确值的小数点后第二位不是 $4$ 或 $5$。

## Sample Input

```
5
1 3 1 5 5
5
1 5 5 5
2 3 3
2 1 5
2 2 2
2 4 4
```

## Sample Output

```
0.8
0.3
0.1
-1.0
```

## Solution

三角函数和角公式，略微卡常，故查询增量v的cos/sin可以提前算好。

$$
\begin{aligned}
\sum\sin(a_i + v) &= \sum \sin(a_i)\cos v + \sum \cos(a_i)\sin v
\sum\cos(a_i + v) &= \sum \cos(a_i)\cos v - \sum \sin(a_i)\sin v
\end{aligned}
$$

```c++
#include <cstdio>
#include <cmath>
using namespace std;

const int MAXN = 200007;

struct Node {
  double cos, sin;
  long long tag, x;
} node[MAXN<<2];
int a[MAXN], ql, qr, qx;
double qs, qc;

inline int left(int i) { return i<<1; }
inline int right(int i) { return (i<<1)+1; }

inline void pushup(int l, int r, int p, int lc, int rc) {
  node[p].cos = node[lc].cos + node[rc].cos;
  node[p].sin = node[lc].sin + node[rc].sin;
}

inline void update(int l, int r, int p, long long x, double xs, double xc) {
  double ns = node[p].sin, nc = node[p].cos;
  node[p].sin = ns*xc + nc*xs;
  node[p].cos = nc*xc - ns*xs;
  if (node[p].tag) node[p].x += x;
  else node[p].tag = 1, node[p].x = x;
}

inline void pushdown(int l, int r, int p, int m, int lc, int rc) {
  if (node[p].tag) {
    node[p].tag = 0;
    double c = cos(node[p].x), s = sin(node[p].x);
    update(l, m, lc, node[p].x, s, c);
    update(m+1, r, rc, node[p].x, s, c);
  }
}

void build(int l, int r, int p) {
  if (l == r) node[p].cos = cos(a[l]), node[p].sin = sin(a[l]);
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    pushup(l, r, p, lc, rc);
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr) update(l, r, p, qx, qs, qc);
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    modify(l, m, lc);
    modify(m+1, r, rc);
    pushup(l, r, p, lc, rc);
  }
}

double query(int l, int r, int p) {
  if (ql <= l && r <= qr) return node[p].sin;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    return query(l, m, lc) + query(m+1, r, rc);
  }
  return 0;
}

int main() {
  int n, m, op;
  scanf("%d", &n);
  for (int i = 1; i <= n; i++) scanf("%d", a+i);
  build(1, n, 1);
  scanf("%d", &m);
  while (m--) {
    scanf("%d%d%d", &op, &ql, &qr);
    if (op == 1) {
      scanf("%d", &qx);
      qs = sin(qx), qc = cos(qx);
      modify(1, n, 1);
    }
    else printf("%.1lf\n", query(1, n, 1));
  }
  return 0;
}
```
