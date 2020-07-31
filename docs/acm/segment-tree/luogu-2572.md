+++
tags = ["data-structure"]
+++

# SCOI-2010 序列操作 

lxhgww 最近收到了一个 $01$ 序列，序列里面包含了 $n$ 个数，下标从 $0$ 开始。这些数要么是 $0$，要么是 $1$，现在对于这个序列有五种变换操作和询问操作：

- `0 l r` 把 $[l, r]$ 区间内的所有数全变成 $0$
- `1 l r` 把 $[l, r]$ 区间内的所有数全变成 $1$
- `2 l r` 把 $[l,r]$ 区间内的所有数全部取反，也就是说把所有的 $0$ 变成 $1$，把所有的 $1$ 变成 $0$
- `3 l r` 询问 $[l, r]$ 区间内总共有多少个 $1$
- `4 l r` 询问 $[l, r]$ 区间内最多有多少个连续的 $1$

对于每一种询问操作，lxhgww 都需要给出回答，聪明的程序员们，你们能帮助他吗？

## Input

第一行两个正整数 $n,m$，表示序列长度与操作个数。

第二行包括 $n$ 个数，表示序列的初始状态。

接下来 $m$ 行，每行三个整数，表示一次操作。

## Output

对于每一个询问操作，输出一行一个数，表示其对应的答案。

## Solution

线段树的维护比较斯巴达，我的做法是维护区间从左/右端点开始连续最长ll和rl，区间内部最长连续ml，区间内的含0/1个数cnt。对于这些信息都开成大小为2的数组，这样可以一起维护0/1，实现起来比较方便。

```c++
#include <cstdio>
#include <algorithm>
using namespace std;

const int MAXN = 1e5+3;

struct Node {
  int ll[2], rl[2], ml[2], cnt[2];
  int tag, x;
} node[MAXN<<2];
int ql, qr, qx, qa;
int a[MAXN];

inline int left(int i) { return i<<1;}
inline int right(int i) { return (i<<1)+1;}

inline void update(int l, int r, int p, int x) {
  if (x == 2) {
    swap(node[p].cnt[0], node[p].cnt[1]);
    swap(node[p].ml[0], node[p].ml[1]);
    swap(node[p].ll[0], node[p].ll[1]);
    swap(node[p].rl[0], node[p].rl[1]);
    if (node[p].tag)
      node[p].x = node[p].x == 0 ? 1:
                  node[p].x == 1 ? 0: (5-node[p].x);
    else node[p].tag = 1, node[p].x = x;
  }
  else {
    int nx = 1-x;
    node[p].cnt[x] = node[p].ml[x] = node[p].ll[x] = node[p].rl[x] = r-l+1;
    node[p].cnt[nx] = node[p].ml[nx] = node[p].ll[nx] = node[p].rl[nx] = 0;
    if (node[p].tag) node[p].x = x;
    else node[p].tag = 1, node[p].x = x;
  }
}
inline void pushdown(int l, int r, int p, int m, int lc, int rc) {
  if (node[p].tag) {
    node[p].tag = 0;
    if (node[p].x != 3) {
      update(l, m, lc, node[p].x);
      update(m+1, r, rc, node[p].x);
    }
  }
}

inline void pushup(int l, int r, int p, int m, int lc, int rc) {
  int llen = m-l+1, rlen = r-m;
  for (int i = 0; i < 2; i ++) {
    node[p].cnt[i] = node[lc].cnt[i] + node[rc].cnt[i];
    node[p].ml[i] = max(node[lc].rl[i]+node[rc].ll[i],
                        max(node[lc].ml[i], node[rc].ml[i]));
    if (node[lc].ll[i] < llen) node[p].ll[i] = node[lc].ll[i];
    else node[p].ll[i] = node[lc].ll[i] + node[rc].ll[i];
    if (node[rc].rl[i] < rlen) node[p].rl[i] = node[rc].rl[i];
    else node[p].rl[i] = node[rc].rl[i] + node[lc].rl[i];
  }
}

void build(int l, int r, int p) {
  if (l == r) {
    int x = a[l], nx = 1-a[l];
    node[p].ll[x] = node[p].rl[x] = node[p].ml[x] = node[p].cnt[x] = 1;
    node[p].ll[nx] = node[p].rl[nx] = node[p].ml[nx] = node[p].cnt[nx] = 0;
  }
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc), build(m+1, r, rc);
    pushup(l, r, p, m, lc, rc);
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr) update(l, r, p, qx);
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    modify(l, m, lc), modify(m+1, r, rc);
    pushup(l, r, p, m, lc, rc);
  }
}

int query_cnt(int l, int r, int p) {
  if (ql <= l && r <= qr) return node[p].cnt[1];
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    return query_cnt(l, m, lc) + query_cnt(m+1, r, rc);
  }
  return 0;
}
pair<int, int> query_seq(int l, int r, int p) {
  if (ql <= l && r <= qr) {
    qa = max(qa, max(node[p].ml[1], max(node[p].ll[1], node[p].rl[1])));
    return {node[p].ll[1], node[p].rl[1]};
  }
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    pair<int, int> lres = query_seq(l, m, lc), rres = query_seq(m+1, r, rc);
    int qml = max(ql, l), qmr = min(qr, r), ll, rl;

    if (qml <= m)
      ll = lres.first == m-qml+1 ? lres.first + rres.first: lres.first;
    else ll = rres.first;

    if (qmr > m)
      rl = rres.second == qmr-m ? lres.second + rres.second: rres.second;
    else rl = lres.second;

    qa = max(qa, max(lres.second + rres.first, max(ll, rl)));
    return {ll, rl};
  }
  return {0, 0};
}

int main() {
  int n, m;
  scanf("%d%d", &n, &m);
  for (int i = 1; i <= n; i ++) scanf("%d", a+i);
  build(1, n, 1);
  while (m--) {
    scanf("%d%d%d", &qx, &ql, &qr);
    ql ++, qr ++;
    if (qx <= 2) modify(1, n, 1);
    else if (qx == 3) printf("%d\n", query_cnt(1, n, 1));
    else {
      qa = 0;
      query_seq(1, n, 1);
      printf("%d\n", qa);
    }
  }

  return 0;
}
```
