+++
tags = ["data structures"]
+++

# SPOJ-375 QTREE - Query on a tree

You are given a tree (an acyclic undirected connected graph) with $N$ nodes, and edges numbered $1, 2, 3...N-1$.

We will ask you to perfrom some instructions of the following form:

- `CHANGE i ti` : change the cost of the i-th edge to ti or
- `QUERY a b` : ask for the maximum edge cost on the path from node a to node b

## Input

The first line of input contains an integer $t(t\le 20)$, the number of test cases. $t$ test cases follow.

For each test case:

- In the first line there is an integer $N (N \le 10000)$,
- In the next N-1 lines, the i-th line describes the i-th edge: a line with three integers $a b c$ denotes an edge between $a$, $b$ of cost $c (c \le 1000000)$,
- The next lines contain instructions `CHANGE i ti` or `QUERY a b`,
- The end of each test case is signified by the string `DONE`.

There is one blank line between successive tests.

## Output

For each `QUERY` operation, write one integer representing its result.

## Sample Input

```
2

3
1 2 1
2 3 2
QUERY 1 2
CHANGE 1 3
QUERY 1 2
DONE

9
1 2 1
1 3 2
2 4 3
2 5 4
3 6 7
3 7 8
5 8 5
5 9 6
QUERY 9 7
QUERY 8 6
QUERY 5 3
CHANGE 4 10
QUERY 5 1
QUERY 2 6
DONE
```

## Sample Output

```
1
3
8
7
4
10
7
```

## Solution

树链剖分+线段树

可以将边当成一个点，或者将边权下放到远离根的端点上。后一种方法在查询和修改时需要改一下，为了简便，我用的是前者。


```c
#include <stdio.h>
#include <string.h>

#define MAXN 20003

#define swap(a, b) ({ __typeof__(a) t = (a); (a) = (b); (b) = t; })
#define max(a, b) ({ __typeof__(a) a_ = (a), b_ = (b); a_ > b_ ? a_: b_; })

#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

int n, w[MAXN], a[MAXN];

struct Edge { int to, nxt; } edge[MAXN*2];
int head[MAXN], nedges;
void addedge(int u, int v) {
  edge[++nedges] = (struct Edge){v, head[u]};
  head[u] = nedges;
}

struct Node { int v, t, x; } node[MAXN*4];
int ql, qr, qx;
void update(int l, int r, int p, int x) {
  node[p].v = node[p].x = x, node[p].t = 1;
}
void pushdown(int l, int r, int p, int m, int lc, int rc) {
  if (node[p].t) {
    node[p].t = 0;
    update(l, m, lc, node[p].x);
    update(m+1, r, rc, node[p].x);
  }
}
void build(int l, int r, int p) {
  if (l == r) node[p].v = a[l], node[p].t = 0;
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc), build(m+1, r, rc);
    node[p].v = max(node[lc].v, node[rc].v);
    node[p].t = 0;
  }
}
void modify(int l, int r, int p) {
  if (ql <= l && r <= qr) update(l, r, p, qx);
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    modify(l, m, lc), modify(m+1, r, rc);
    node[p].v = max(node[lc].v, node[rc].v);
  }
}
int query(int l, int r, int p) {
  if (ql <= l && r <= qr) return node[p].v;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p, m, lc, rc);
    return max(query(l, m, lc), query(m+1, r, rc));
  }
  return 0;
}
void change(int i, int x) {
  ql = qr = i, qx = x;
  modify(1, n, 1);
}
int query_max(int l, int r) {
  ql = l, qr = r;
  return query(1, n, 1);
}

int fa[MAXN], sz[MAXN], dep[MAXN], hson[MAXN];
int top[MAXN], rnk[MAXN], rcnt;

void dfs1(int u, int f) {
  fa[u] = f;
  dep[u] = dep[f] + 1;
  sz[u] = 1;
  hson[u] = 0;
  int maxs = 0;
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != f) {
      dfs1(v, u);
      if (sz[v] > maxs)
        maxs = sz[v], hson[u] = v;
    }
  }
}
void dfs2(int u, int t) {
  top[u] = t;
  rnk[u] = ++rcnt;
  if (hson[u]) dfs2(hson[u], t);
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != fa[u] && v != hson[u]) dfs2(v, v);
  }
}
int query_max2(int u, int v) {
  int ans = 0;
  for (; top[u] != top[v]; u = fa[top[u]]) {
    if (dep[top[u]] < dep[top[v]]) swap(u, v);
    ans = max(ans, query_max(rnk[top[u]], rnk[u]));
  }
  if (rnk[u] > rnk[v]) swap(u, v);
  return max(ans, query_max(rnk[u], rnk[v]));
}
void init() {
  memset(a, 0, sizeof(a));
  memset(w, 0, sizeof(w));
  memset(head, 0, sizeof(head));
  nedges = 0;
  rcnt = 0;
}

int main() {
  int nt;
  char op[10];
  scanf("%d", &nt);
  while (nt--) {
    init();
    scanf("%d", &n);
    int pren = n;
    for (int i = 0, u, v, c; i < pren-1; i ++) {
      scanf("%d%d%d", &u, &v, &c);
      w[++n] = c;
      addedge(u, n), addedge(n, u);
      addedge(v, n), addedge(n, v);
    }
    dfs1(1, 0), dfs2(1, 1);
    for (int i = 1; i <= n; i ++) a[rnk[i]] = w[i];
    build(1, n, 1);

    while (scanf("%s", op)) {
      if (op[0] == 'D') break;
      int a, b;
      scanf("%d%d", &a, &b);
      if (op[0] == 'C') change(rnk[a+pren], b);
      else printf("%d\n", query_max2(a, b));
    }
  }
  return 0;
}
```
