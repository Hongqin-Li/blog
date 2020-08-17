+++
tags = ["dp"]
+++

# SCOI-2015 小凸玩密室

小凸和小方相约玩密室逃脱，这个密室是一棵有 $n$ 个节点的完全二叉树，每个节点有一个灯泡。点亮所有灯泡即可逃出密室。每个灯泡有个权值 $a_i$，每条边也有个权值 $b_i$。点亮第一个灯泡不需要花费，之后每点亮一个新的灯泡 $v$ 的花费，等于上一个被点亮的灯泡 $u$ 到这个点 $v$ 的距离 $D_{u,v}$，乘以这个点的权值 $a_v$。在点灯的过程中，要保证任意时刻所有被点亮的灯泡必须连通，在点亮一个灯泡后必须先点亮其子树所有灯泡才能点亮其他灯泡。请告诉他们，逃出密室的最少花费是多少。

## Input

第 $1$ 行包含 $1$ 个数 $n$，代表节点的个数

第 $2$ 行包含 $n$ 个数，代表每个节点的权值 $a_i (i = 1, 2,\dots, n)$

第 $3$ 行包含 $n-1$ 个数，代表每条边的权值 $b_i$，第 $i$ 号边是由第 $(i+1)/2$ 号点连向第 $i+1$ 号点的边。$(i=1,2,\dots, n−1)$

## Input

输出包含 $1$ 个数，代表最少的花费。

## Examples

Input 1:

```
3
5 1 2
2 1
```

Output 1:

```
5
```

## Solution

树形 dp 神仙题

$f[u][i]$ 为点亮 $u$ 的子树后返回到 $u$ 的第 $i$ 个祖先的最小费用，$g[u][i]$ 为点亮 $u$ 的子树后返回到 $u$ 的第 $i$ 个祖先的另一个儿子的最小费用。状态转移见代码。

最后求答案时，枚举每个节点当成第一个点亮的节点，然后向上求和即可。由于最后一个点亮的节点不需要返回，一个小技巧是令 $f[u][dep[u]+1]$ 为点亮 $u$ 的子树后不需要返回的最小费用。

复杂度为 $O(n\log n)$

```c++
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int N = 2e5+3, LOGN = log2(N)+2;
const ll INF = 1e18;

int n;
ll a[N], w[N];
ll f[N][LOGN], g[N][LOGN];
ll dist[N][LOGN];

int left(int u) { return u<<1 <= n ? u<<1: 0; }
int right(int u) { return (u<<1|1) <= n ? u<<1|1: 0; }
int fa(int u, int i) { return u>>i; }
int bro(int u) { return (u^1) <= n ? u^1: 0; }

ll solve() {
  for (int u = n; u; u --) {
    int lc = left(u), rc = right(u);
    if  (lc && rc)
      for (int i = 1; fa(u, i); i ++)
        g[u][i] = min(w[lc]*a[lc] + g[lc][1] + g[rc][i+1],
                      w[rc]*a[rc] + g[rc][1] + g[lc][i+1]);
    else if (lc)
      for (int i = 1; fa(u, i); i ++)
        g[u][i] = w[lc]*a[lc] + g[lc][i+1];
    else
      for (int i = 1, b = bro(u); fa(u, i); b = bro(fa(u, i++)))
        if (b) g[u][i] = (dist[u][i] + w[b]) * a[b];
  }

  for (int u = n; u; u --) {
    int lc = left(u), rc = right(u);
    if  (lc && rc)
      for (int i = 1; fa(u, i-1); i ++)
        f[u][i] = min(w[lc]*a[lc] + g[lc][1] + f[rc][i+1],
                      w[rc]*a[rc] + g[rc][1] + f[lc][i+1]);
    else if (lc)
      for (int i = 1; fa(u, i-1); i ++)
        f[u][i] = w[lc]*a[lc] + f[lc][i+1];
    else
      for (int i = 1; fa(u, i-1); i ++)
        f[u][i] = dist[u][i] * a[fa(u, i)];
  }

  ll ans = INF;
  for (int u = n; u; u --) {
    ll cnt = f[u][1];
    for (int i = 1, b = bro(u); fa(u, i); b = bro(fa(u, i++))) {
      if (b) cnt += w[b]*a[b] + f[b][2];
      else cnt += w[fa(u, i)]*a[fa(u, i+1)];
    }
    ans = min(ans, cnt);
  }
  return ans;
}

int main() {
  cin >> n;
  for (int i = 1; i <= n; i ++) cin >> a[i];
  for (int i = 2; i <= n; i ++) cin >> w[i];
  
  for (int u = 1; u <= n; u ++)
    for (int i = 1; fa(u, i); i ++)
      dist[u][i] = dist[fa(u, 1)][i-1] + w[u];

  cout << solve();
  return 0;
}
```
