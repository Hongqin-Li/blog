+++
tags = ["data structures"]
+++


# 洛谷-P6157 有趣的游戏

游戏在一棵大小为 $n$ 的树上进行。其中每个点都有点权，第 $i$ 个点的点权为 $w_i$。

每一次系统会给出一条链，小 A 可以从这条链上找出两个点权不同的点 $x,y$，他的得分是 $w_x\bmod w_y$。然后小 B 会从整棵树中选取两个小 A 没有选过的点，计分方式同小 A。

为了保持游戏难度，系统有时会增加一个点的权值。

当然，小 A 会尽可能使自己得分最大，他想知道这个值是多少。同时，他想知道，在自己得分最大的情况下，小 B 的最大得分是多少。


## Input

第一行一个整数 $n$ 表示树的节点个数。

接下来 $n-1$ 行，每行两个整数 $a,b$，表示 $a,b$ 之间有一条边。

接下来一行 $n$ 个整数，第 $i$ 个数表示第 $i$ 个点的点权。

接下来一行一个整数 $q$。

接下来 $q$ 行，每行三个整数 $opt,x,y$。

若 $opt=0$，将 $w_x$ 增加 $y$。

若 $opt=1$，表示系统给出一条从 $x$ 到 $y$ 的链。

## Output

对于每一次 $opt=1$，输出一行两个整数 $suma,sumb$。分别表示小 A 的最大得分和在这情况下小 B 的最大得分 。

如果小 A 无法选出两个权值不同的点，那么只输出一个数 $−1$。

## Sample Input

```
7
1 2
2 3
2 4
1 5
5 6
5 7
5 4 3 2 1 4 3
6
1 3 4
1 2 5
1 2 1
0 2 1
1 2 5
1 2 1
```

## Sample Output

```
3 4
4 3
4 3
1 4
-1
```

## Solution

前置知识：树链剖分+线段树

易证，A的得分为链上第2大，B的得分可通过map计数，并去除A所选两个点权后，map中最大的两个值得到。其他就是超常规的链剖+线段树。


```c++
#include <cstdio>
#include <algorithm>
#include <map>
using namespace std;
typedef pair<int, int> pii;
const int MAXN = 1e5+3;

struct Edge { int to, nxt; } edge[MAXN*2];
int head[MAXN], nedges;

struct Node {pair<int, int> val;} node[MAXN*4];
int ql, qr, qx;

int fa[MAXN], dep[MAXN], son[MAXN], sz[MAXN];
int top[MAXN], rnk[MAXN], nrnks;

int n, a[MAXN], w[MAXN];
map<int, int> cnt;

void addedge(int u, int v) {
  edge[++nedges] = {v, head[u]};
  head[u] = nedges;
}

pii combine(const pii& p1, const pii& p2) {
  if (p1.first == p2.first)
    return {p1.first, max(p1.second, p2.second)};
  else if (p1.first > p2.first)
    return {p1.first, max(p1.second, p2.first)};
  else return {p2.first, max(p2.second, p1.first)};
}

void pushup(int p, int lc, int rc) {
  node[p].val = combine(node[lc].val, node[rc].val);
}
void build(int l, int r, int p) {
  if (l == r) node[p].val = {a[l], 0};
  else {
    int m = (l+r)/2, lc = p<<1, rc = p<<1|1;
    build(l, m, lc), build(m+1, r, rc);
    pushup(p, lc, rc);
  }
}
void modify(int l, int r, int p) {
  if (l == ql && r == qr) node[p].val.first += qx;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = p<<1, rc = p<<1|1;
    modify(l, m, lc), modify(m+1, r, rc);
    pushup(p, lc, rc);
  }
}
pii query(int l, int r, int p) {
  if (ql <= l && r <= qr) return node[p].val;
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = p<<1, rc = p<<1|1;
    return combine(query(l, m, lc), query(m+1, r, rc));
  }
  return {0, 0};
}

void dfs1(int u, int r) {
  sz[u] = 1, dep[u] = dep[r] + 1, fa[u] = r;
  int maxs = 0;
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != r) {
      dfs1(v, u);
      sz[u] += sz[v];
      if (sz[v] > maxs) son[u] = v, maxs = sz[v];
    }
  }
}

void dfs2(int u, int r) {
  top[u] = r, rnk[u] = ++nrnks;
  if (son[u]) dfs2(son[u], r);
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].to;
    if (v != fa[u] && v != son[u]) dfs2(v, v);
  }
}

pii query2(int u, int v) {
  pii ret = {0, 0};
  for (; top[u] != top[v]; u = fa[top[u]]) {
    if (dep[top[u]] < dep[top[v]]) swap(u, v);
    ql = rnk[top[u]], qr = rnk[u];
    ret = combine(ret, query(1, nrnks, 1));
  }
  if (rnk[u] > rnk[v]) swap(u, v);
  ql = rnk[u], qr = rnk[v];
  return combine(ret, query(1, nrnks, 1));
}

int main() {
  
  int n, nq, op, x, y;
  scanf("%d", &n);
  for (int i = 0; i < n-1; i ++) {
    scanf("%d%d", &x, &y);
    addedge(x, y), addedge(y, x);
  }
  dfs1(1, 0), dfs2(1, 1);
  for (int i = 1; i <= n; i ++) {
    scanf("%d", w+i);
    a[rnk[i]] = w[i];
    cnt[w[i]] ++;
  }
  build(1, nrnks, 1);
  scanf("%d", &nq);
  while (nq--) {
    scanf("%d%d%d", &op, &x, &y);
    if (op == 0) {
      ql = qr = rnk[x], qx = y;
      modify(1, nrnks, 1);
      cnt[w[x]+y] ++;
      auto it = cnt.find(w[x]);
      if (--it->second == 0) cnt.erase(it);
      w[x] += y;
    }
    else {
      pii p = query2(x, y);
      if (p.second) {
        int bw[2];
        auto it = cnt.end();
        for (int i = 0; i < 2; i ++) {
          it --;
          while ((it->first == p.first || it->first == p.second)
                 && it->second == 1) it --;
          bw[i] = it->first;
        }
        printf("%d %d\n", p.second, bw[1]);
      }
      else printf("-1\n");
    }
  }
  return 0;
}
```
