+++
tags = ["dp"]
+++

# IOI-2008 Island

你准备浏览一个公园，该公园由 $N$ 个岛屿组成，当地管理部门从每个岛屿 $i$ 出发向另外一个岛屿建了一座长度为 $L_i$ 的桥，不过桥是可以双向行走的。同时，每对岛屿之间都有一艘专用的往来两岛之间的渡船。相对于乘船而言，你更喜欢步行。你希望经过的桥的总长度尽可能长，但受到以下的限制：

- 可以自行挑选一个岛开始游览。
- 任何一个岛都不能游览一次以上。
- 无论任何时间，你都可以由当前所在的岛 $S$ 去另一个从未到过的岛 $D$。从 $S$ 到 $D$ 有如下方法：
  - 步行：仅当两个岛之间有一座桥时才有可能。对于这种情况，桥的长度会累加到你步行的总距离中。
  - 渡船：你可以选择这种方法，仅当没有任何桥和以前使用过的渡船的组合可以由 $S$ 走到 $D$ (当检查是否可到达时，你应该考虑所有的路径，包括经过你曾游览过的那些岛)。

注意，你不必游览所有的岛，也可能无法走完所有的桥。

请你编写一个程序，给定 $N$ 座桥以及它们的长度，按照上述的规则，计算你可以走过的桥的长度之和的最大值。

## Input

第一行包含 $N(2\le N\le 10^6)$ 个整数，即公园内岛屿的数目。

随后的 $N$ 行每一行用来表示一个岛。第 $i$ 行由两个以单空格分隔的整数，表示由岛 $i$ 筑的桥。第一个整数表示桥另一端的岛，第二个整数表示该桥的长度 $L_i(1\le L_i \le 10^8)$。你可以假设对于每座桥，其端点总是位于不同的岛上。

## Output

仅包含一个整数，即可能的最大步行距离。

## Examples

Input 1:

```
7
3 8
7 2
4 2
1 4
1 9
3 4
2 3
```

Output 1:

```
24
```

Input 2:

```
10
8 7
8 2
8 8
1 6
1 10
4 1
10 6
1 6
10 9
6 5
```

Output 2:

```
36
```

Input 3:

```
5
2 999999
3 1
4 1
2 1
2 999999
```

Output 3:

```
1999998
```

## Solution

题意是求基环树的直径，首先得找到环，然后注意到直径要么在环上某个节点的“子树”内（这里的“子树”指，节点除了根之外均不在环上的子树），要么通过环上某两点加上对应“子树”内最长链。

第一种情况通过树上 dp 可求得，第二种情况暴力枚举点对的话是 $O(n^2)$，我们得用单调队列优化至 $O(n)$。

```c++
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int N = 1e6+3;
struct E { int nxt, v, w; } edge[N*2];
int head[N], nedges;
int found[N], vis[N], on_ring[N];

void addedge(int u, int v, int w) {
  edge[++nedges] = {head[u], v, w};
  head[u] = nedges;
}

int find(int u, int fi, vector<int>& ring) {
  if (found[u]) return u;
  found[u] = 1;
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (i != fi) {
      int r = find(v, ((i-1)^1)+1, ring);
      if (r) {
        if (r > 0) {
          ring.push_back(i);
          if (r == u) r = -r;
        }
        return r;
      }
    }
  }
  return 0;
}

pair<ll, ll> dfs(int u, int fa) {
  vis[u] = 1;
  ll maxl = 0, max1 = 0, max2 = 0;
  for (int i = head[u]; i; i = edge[i].nxt) {
    int v = edge[i].v;
    if (!on_ring[v] && v != fa) {
      auto p = dfs(v, u);
      maxl = max(maxl, p.second);
      ll l = p.first + edge[i].w;
      if (l > max1) max2 = max1, max1 = l;
      else max2 = max(max2, l);
    }
  }
  return {max1, max(maxl, max1 + max2)};
}

ll solve(vector<int>& ring) {
  int n = ring.size();
  vector<int> us(n);
  vector<ll> d(2*n), e(2*n), se(2*n, 0);

  for (int i = 0; i < n; i ++) {
    auto& x = edge[ring[i]];
    us[i] = x.v, e[i] = x.w, on_ring[x.v] = 1;
  }
  ll maxl = 0;
  for (int i = 0; i < n; i ++) {
    auto p = dfs(us[i], 0);
    maxl = max(maxl, p.second);
    d[i] = p.first;
  }
  for (int i = n; i < 2*n; i ++)
    d[i] = d[i-n], e[i] = e[i-n];
  for (int i = 1; i < 2*n; i ++)
    se[i] = se[i-1] + e[i-1];

  ll r = 0;
  static pair<int, ll> q[N*2];
  int qr = 0, ql = 0;
  for (int i = 0, j = 1; i < n; i ++) {
    while (ql < qr && q[ql].first <= i) ql ++;
    for (;j < i + n; j ++) {
      pair<int, ll> p = {j, d[j] + se[j] - se[i] + r};
      while (ql < qr && q[qr-1].second <= p.second) qr --;
      q[qr ++] = p;
    }
    assert(ql < qr);
    maxl = max(maxl, d[i] + q[ql].second - r);
    r += e[i];
  }
  return maxl;
}

int main() {
  int n;
  scanf("%d", &n);
  for (int i = 1, v, w; i <= n; i ++) {
    scanf("%d%d", &v, &w);
    addedge(i, v, w), addedge(v, i, w);
  }
  ll ans = 0;
  for (int i = 1; i <= n; i ++) {
    if (!vis[i]) {
      vector<int> ring;
      assert(find(i, 0, ring));
      ans += solve(ring);
    }
  }
  printf("%lld", ans);
  return 0;
}
```
