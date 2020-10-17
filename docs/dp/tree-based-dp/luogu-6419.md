+++
tags = ["dp"]
+++

# 洛谷P6419 [COCI2014-2015#1] Kamp

一颗树 $n$ 个点，n−1n-1n−1 条边，经过每条边都要花费一定的时间，任意两个点都是联通的。

有 $K$ 个人（分布在 $K$ 个不同的点）要集中到一个点举行聚会。

聚会结束后需要一辆车从举行聚会的这点出发，把这 $K$ 个人分别送回去。

请你回答，对于 $i=1 \sim n$，如果在第 $i$ 个点举行聚会，司机最少需要多少时间把 $K$ 个人都送回家。

## Input

第一行两个整数 $n,K(1 \le K \le n \leq 5\times 10^5)$。

接下来 $n-1$ 行，每行三个数 $x,y,z$ ($1 \le x,y \le n$，$1 \le z \le 10^8$) 表示 $x$ 到 $y$ 之间有一条需要花费 $z$ 时间的边。

接下来 $K$ 行，每行一个数，表示 $K$ 个人的分布。

## Output

输出 $n$ 个数。

第 $i$ 行的数表示：如果在第 $i$ 个点举行聚会，司机需要的最少时间。

## Solution

换根 dp 

1. 如果子节点的子树中乘客，则要加上两倍乘以这条边
2. 最后记得减去距离当前根最远的有乘客的子节点，因为司机不需要返回根
3. 换根转移时分类讨论一下

```c++
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int N = 5e5+3;

struct E { int nxt, v; ll w, maxl;} edge[N*2];
int head[N], nedges;
int n, k, sz[N];
ll cnt, ans[N], maxl[N];

void addedge(int u, int v, ll w) {
  edge[++nedges] = {head[u], v, w, 0};
  head[u] = nedges;
}

ll dfs1(int u, int f) {
  ll cml = 0;
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (v != f) {
      ll x = dfs1(v, u) + edge[i].w;
      sz[u] += sz[v];
      if (sz[v]) {
        cnt += 2*edge[i].w;
        cml = max(cml, x);
        edge[i].maxl = x;
      }
    }
  }
  maxl[u] = cml;
  return cml;
}

void dfs2(int u, int f, ll x, ll fml) {
  ll max1 = 0, max2 = 0, maxi = 0;
  for (int i = head[u]; i; i = edge[i].nxt) {
    if (edge[i].v == f && k-sz[u]) {
      edge[i].maxl = fml + edge[i].w,
      maxl[u] = max(maxl[u], edge[i].maxl);
    }
    if (edge[i].maxl > max1) {
      max2 = max1;
      max1 = edge[i].maxl, maxi = edge[i].v;
    }
    else max2 = max(max2, edge[i].maxl);
  }

  ans[u] = x - maxl[u];
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (v != f) {
      int ml = v == maxi ? max2: max1;
      if (sz[v] && k-sz[v] == 0)
        dfs2(v, u, x-2*edge[i].w, ml);
      else if (sz[v] && k-sz[v])
        dfs2(v, u, x, ml);
      else dfs2(v, u, x + 2*edge[i].w, ml);
    }
  }
}

int main() {
  scanf("%d%d", &n, &k);
  for (int i = 1; i < n; i ++) {
    int u, v; ll w;
    scanf("%d%d%lld", &u, &v, &w);
    addedge(u, v, w), addedge(v, u, w);
  }
  for (int i = 0; i < k; i ++) {
    int u;
    scanf("%d", &u);
    sz[u] += 1;
  }
  dfs1(1, 0);
  dfs2(1, 0, cnt, 0);
  for (int i = 1; i <= n; i ++)
    printf("%lld\n", ans[i]);
  return 0;
}
```
