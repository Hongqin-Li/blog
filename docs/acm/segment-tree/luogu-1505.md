+++
tags = ["data structures"]
+++

# 洛谷-P1505 [国家集训队]旅游

Ray 乐忠于旅游，这次他来到了 T 城。T 城是一个水上城市，一共有 $n$ 个景点，有些景点之间会用一座桥连接。为了方便游客到达每个景点但又为了节约成本，T 城的任意两个景点之间有且只有一条路径。换句话说， T 城中只有 $n-1$ 座桥。

Ray 发现，有些桥上可以看到美丽的景色，让人心情愉悦，但有些桥狭窄泥泞，令人烦躁。于是，他给每座桥定义一个愉悦度 $w$，也就是说，Ray 经过这座桥会增加 $w$ 的愉悦度，这或许是正的也可能是负的。有时，Ray 看待同一座桥的心情也会发生改变。

现在，Ray 想让你帮他计算从 $u$ 景点到 $v$ 景点能获得的总愉悦度。有时，他还想知道某段路上最美丽的桥所提供的最大愉悦度，或是某段路上最糟糕的一座桥提供的最低愉悦度。
题目描述

给定一棵 $n$ 个节点的树，边带权，编号 $0 \sim n-1$，需要支持五种操作：

- `C i w` 将输入的第 $i$ 条边权值改为 $w$
- `N u v` 将 $u, v$ 节点之间的边权都变为相反数
- `SUM u v` 询问 $u, v$ 节点之间边权和
- `MAX u v` 询问 $u, v$ 节点之间边权最大值
- `MIN u v` 询问 $u, v$ 节点之间边权最小值

保证任意时刻所有边的权值都在 $[-1000,1000]$ 内。

## Input

第一行一个正整数 $n$，表示节点个数。
接下来 $n-1$ 行，每行三个整数 $u,v,w$，表示 $u,v$ 之间有一条权值为 $w$ 的边，描述这棵树。
然后一行一个正整数 $m$，表示操作数。
接下来 $m$ 行，每行表示一个操作。

## Output

对于每一个询问操作，输出一行一个整数表示答案。

## Sample Input

```
8
0 1 10
1 2 -3
1 3 7
2 4 -4
2 5 6
5 6 -9
5 7 2

13
MIN 1 0
SUM 0 7
MIN 1 6
N 4 3
MIN 3 7
C 2 11
SUM 3 6
MAX 0 2
SUM 4 6
MIN 4 6
N 0 7
SUM 3 4
SUM 3 6
```

## Sample Output

```
10
15
-9
-7
1
11
1
-9
-14
-33
```

## Solution

树链剖分+线段树模板题，可以用来练手，代码量比较大，<del>是时候骚一波泛型模板了</del>。

```c++
#include <cstdio>
#include <cassert>
#include <algorithm>
using namespace std;

const int INF = 1e9;
const int MAXN = 2e5+3;
enum {
  OP_SUM = 0, OP_MAX, OP_MIN, 
  OP_CHANGE, OP_NEG,
};

inline int sum(const int& a, const int& b) { return a + b; }
inline int min1(const int& a, const int& b) { return a < b ? a: b; }
inline int max1(const int& a, const int& b) { return a > b ? a: b; }

int n, w[MAXN], a[MAXN], ni[MAXN], nedges, head[MAXN];
struct Edge { int to, w, nxt; } edge[MAXN*2];
void addedge(int u, int v, int w) {
  edge[++nedges] = {v, w, head[u]};
  head[u] = nedges;
}

struct SegmentTree {
  struct Node { int t, x, v[3]; } node[MAXN*4];
  int ql, qr, qop, qx;
  inline int left(int i) { return i << 1;}
  inline int right(int i)  { return (i<<1)+1; }

  inline void update(int l, int r, int p) {
    int mi = node[p].v[2], ma = node[p].v[1];
    node[p].v[2] = -ma, node[p].v[1] = -mi, node[p].v[0] = -node[p].v[0]; 
    if (node[p].t) node[p].x ^= 1;
    else node[p].t = 1, node[p].x = 1;
  }
  inline void pushdown(int  l, int r, int p, int m, int lc, int rc) {
    if (node[p].t) {
      node[p].t = 0;
      if (node[p].x) update(l, m, lc), update(m+1, r, rc);
    }
  }
  inline void pushup(int l, int r, int  p, int m, int lc, int rc) {
    node[p].v[0] = node[lc].v[0] + node[rc].v[0];
    node[p].v[1] = max(node[lc].v[1], node[rc].v[1]);
    node[p].v[2] = min(node[lc].v[2], node[rc].v[2]);
  }
  void build(int l, int r, int p) {
    if (l == r) node[p].v[0] = node[p].v[1] = node[p].v[2] = a[l];
    else {
      int m = (l+r)/2, lc = left(p), rc = right(p);
      build(l, m, lc), build(m+1, r, rc);
      pushup(l, r, p, m, lc, rc);
    }
  }
  void modify(int l, int r, int p) {
    if (ql <= l && r <= qr) {
      if (qop == OP_NEG) update(l, r, p);
      else node[p].v[0] = node[p].v[1] = node[p].v[2] = qx;
    }
    else if (ql <= r && qr >= l) {
      int m = (l+r)/2, lc = left(p), rc = right(p);
      pushdown(l, r, p, m, lc, rc);
      modify(l, m, lc), modify(m+1, r, rc);
      pushup(l, r, p, m, lc, rc);
    }
  }
  inline void flip(int l, int r) {
    ql = l, qr = r, qop = OP_NEG;
    modify(1, n, 1);
  }
  inline void change(int i, int x) {
    ql = qr = i, qop = OP_CHANGE, qx = x;
    modify(1, n, 1);
  }
  template<int I, int (*F)(const int&, const int&)>
  inline int query(int l, int r, int op) {
    ql = l, qr = r, qop = op;
    return queryx<I, F>(1, n, 1);
  }
  template<int I, int (*F)(const int&, const int&)>
  int queryx(int l, int r, int p) {
    if (ql <= l && r <= qr) return node[p].v[qop];
    else if (ql <= r && qr >= l) {
      int m = (l+r)/2, lc = left(p), rc = right(p);
      pushdown(l, r, p, m, lc, rc);
      return F(queryx<I, F>(l, m, lc), queryx<I, F>(m+1, r, rc));
    }
    return I;
  }
} smt;

int dep[MAXN], sz[MAXN], fa[MAXN], hson[MAXN];
int top[MAXN], rnk[MAXN], rcnt;

void dfs1(int u, int r) {
  fa[u] = r, dep[u] = dep[r]+1, sz[u] = 1, hson[u] = 0;
  for (int i = head[u], maxs = 0; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != r) {
      dfs1(v, u);
      w[v] = edge[i].w,
      ni[(i+1)>>1] = v;
      if (sz[v] > maxs) maxs = sz[v], hson[u] = v;
    }
  }
}

void dfs2(int u, int r) {
  top[u] = r, rnk[u] = ++rcnt;
  if (hson[u]) dfs2(hson[u], r);
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != hson[u] && v != fa[u]) dfs2(v, v);
  }
}

template<int I, int (*F)(const int&, const int&)>
int query(int u, int v, int op) {
  int ans = I;
  for (; top[u] != top[v]; u = fa[top[u]]) {
    if (dep[top[u]] < dep[top[v]]) swap(u, v);
    int res = smt.query<I, F>(rnk[top[u]], rnk[u], op);
    ans = F(ans, res);
  }
  if (u == v) return ans;
  if (rnk[u] > rnk[v]) swap(u, v);
  return F(ans, smt.query<I, F>(rnk[u]+1, rnk[v], op));
}
void flip(int u, int v) {
  for (; top[u] != top[v]; u = fa[top[u]]) {
    if (dep[top[u]] < dep[top[v]]) swap(u, v);
    smt.flip(rnk[top[u]], rnk[u]);
  }
  if (u == v) return;
  if (rnk[u] > rnk[v]) swap(u, v);
  smt.flip(rnk[u]+1, rnk[v]);
}

int main() {
  scanf("%d", &n);
  for (int i = 1, u, v, w; i < n; i ++) {
    scanf("%d%d%d", &u, &v, &w);
    u++, v++;
    addedge(u, v, w);
    addedge(v, u, w);
  }
  dfs1(1, 0), dfs2(1, 1);
  for (int i = 1; i <= n; i ++) a[rnk[i]] = w[i];
  smt.build(1, n, 1);

  int m, x, y;
  char op[10];
  scanf("%d", &m);
  while (m--) {
    scanf("%s%d%d", op, &x, &y);
    if (op[0] == 'C') smt.change(rnk[ni[x]], y);
    else if (op[0] == 'N') flip(x+1, y+1);
    else if (op[0] == 'S')
      printf("%d\n", query<0, sum>(x+1, y+1, OP_SUM));
    else if (op[1] == 'A')
      printf("%d\n", query<-INF, max1>(x+1, y+1, OP_MAX));
    else
      printf("%d\n", query<INF, min1>(x+1, y+1, OP_MIN));
  }
  return 0;
}
```
