+++
tags = ["dp"]
+++

# 洛谷P3047 [USACO12FEB]Nearby Cows G

Farmer John has noticed that his cows often move between nearby fields. Taking this into account, he wants to plant enough grass in each of his fields not only for the cows situated initially in that field, but also for cows visiting from nearby fields.

Specifically, FJ's farm consists of N fields (1 <= N <= 100,000), where some pairs of fields are connected with bi-directional trails (N-1 of them in total). FJ has designed the farm so that between any two fields i and j, there is a unique path made up of trails connecting between i and j. Field i is home to C(i) cows, although cows sometimes move to a different field by crossing up to K trails (1 <= K <= 20).

FJ wants to plant enough grass in each field i to feed the maximum number of cows, M(i), that could possibly end up in that field -- that is, the number of cows that can potentially reach field i by following at most K trails. Given the structure of FJ's farm and the value of C(i) for each field i, please help FJ compute M(i) for every field i.

给你一棵 $n$ 个点的树，点带权，对于每个节点求出距离它不超过 $k$ 的所有节点权值和 $m_i$。

$1 \le n \le 10^5$，$1 \le k \le 20$，$0 \le c_i \le 1000$

## Input

- Line 1: Two space-separated integers, N and K.

- Lines 2..N: Each line contains two space-separated integers, i and j (1 <= i,j <= N) indicating that fields i and j are directly connected by a trail.

- Lines N+1..2N: Line N+i contains the integer C(i). (0 <= C(i) <= 1000)

## Output

- Lines 1..N: Line i should contain the value of M(i).

## Examples

Input 1:

```
6 2 
5 1 
3 6 
2 4 
2 1 
3 2 
1 
2 
3 
4 
5 
6 
```

Output 1:

```
15 
21 
16 
10 
8 
11 
```

## Solution

换根dp，计算距离当前点为 $k$ 的节点权值之和。第一次 dfs 计算子树中的这个值，第二次 dfs 结合父节点完成计算

```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 1e5+3, K = 21;
struct E { int nxt, v; } edge[N*2];
int head[N], nedges;
int n, k, w[N];
int ks[N][K], ka[N][K];

void addedge(int u, int v) {
  edge[++nedges] = {head[u], v};
  head[u] = nedges;
}

void dfs1(int u, int f) {
  ks[u][0] = w[u];
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (v != f) {
      dfs1(v, u);
      for (int i = 1; i <= k; i ++)
        ks[u][i] += ks[v][i-1];
    }
  }
}

void dfs2(int u, int f) {
  for (int i = 0; i <= k; i ++)
    ka[u][i] = (f && i-1 >= 0 ? ka[f][i-1]: 0) -
               (f && i-2 >= 0 ? ks[u][i-2]: 0) +
               ks[u][i];
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (v != f) dfs2(v, u);
  }
}

int main() {
  scanf("%d%d", &n, &k);
  for (int i = 1; i < n; i ++) {
    int u, v;
    scanf("%d%d", &u, &v);
    addedge(u, v), addedge(v, u);
  }
  for (int i = 1; i <= n; i ++) scanf("%d", w+i);
  dfs1(1, 0), dfs2(1, 0);
  for (int i = 1; i <= n; i ++)
    printf("%d\n", accumulate(ka[i], ka[i]+k+1, 0));
  return 0;
}
```
