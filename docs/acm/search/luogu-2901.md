+++
tags = ["bfs", "dp"]
+++

# 洛谷P2901 Cow Jogging G 

贝西终于尝到了懒惰的后果，决定每周从谷仓到池塘慢跑几次来健身。当然，她不想跑得太累，所以她只打算从谷仓慢跑下山到池塘，然后悠闲地散步回谷仓。

同时，贝西不想跑得太远，所以她只想沿着通向池塘的最短路径跑步。一共有 M 条道路，其中每一条都连接了两个牧场。这些牧场从 1 到 N 编号，如果 X > Y，则说明牧场 X 的地势高于牧场 Y，即下坡的道路是从 X 通向 Y 的，N 为贝西所在的牛棚（最高点），1 为池塘（最低点）。

然而，一周之后，贝西开始对单调的路线感到厌烦，她希望可以跑不同的路线。比如说，她希望能有 K 种不同的路线。同时，为了避免跑得太累，她希望这 K 条路线是从牛棚到池塘的路线中最短的 K 条。如果两条路线包含的道路组成的序列不同，则这两条路线被认为是不同的。

请帮助贝西算算她的训练强度，即将牧场网络里最短的 KKK 条路径的长度分别算出来。你将会被提供一份牧场间路线的列表，每条道路用 $(X_i, Y_i, D_i)$ 表示，意为从 $X_i$ 到 $Y_i$ 有一条长度为 $D_i$ 的下坡道路。

## Input

第一行三个用空格分开的整数 N, M, K。第二行到第 M+1 行每行有三个用空格分开的整数 $X_i,Y_i,D_i$，描述一条下坡的道路。

## Output

共 KKK 行，在第 iii 行输出第 iii 短的路线长度，如果不存在则输出 −1-1−1。如果出现多种有相同长度的路线，务必将其全部输出。

## Sample Input

```
5 8 7 
5 4 1 
5 3 1 
5 2 1 
5 1 1 
4 3 4 
3 1 1 
3 2 1 
2 1 1 
```

## Sample Output

```
1 
2 
2 
3 
6 
7 
-1 
```

## Solution

用A\*算法解k短路。更具体地说，维护节点集合S，其中的每个节点u都表示了一条从s到u的不同的路径，每次从S中取出一个**u代表的从s到u的路径的距离+u-t最短路长度**最近的节点，并加入其相邻节点。显然，这种遍历方式可以遍历到所有s-t路，而且是按长度从小到大遍历到的，于是第k次搜到t即第k短路。



```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1007;
const int MAXM = 10007;
const int INF = 1e9;
int n, m, q;

struct Graph {
  struct Edge {
    int to, w, nxt;
  } edge[MAXM];
  int head[MAXN], nedges;
  void addedge(int u, int v, int w) {
    edge[++nedges] = {v, w, head[u]};
    head[u] = nedges;
  }

  int fin[MAXN], dist[MAXN];
  void dijkstra(int s) {
    struct Item {
      int u, d;
      bool operator<(const Item& rhs) const {
        return d > rhs.d;
      }
    };
    for (int i = 0; i < MAXN; i ++) dist[i] = INF;
    priority_queue<Item> pq;
    pq.push({s, 0});
    dist[s] = 0;
    while (!pq.empty()) {
      Item itm = pq.top();
      pq.pop();
      int u = itm.u, d = itm.d;
      if (!fin[u]) {
        fin[u] = 1;
        for (int i = head[u]; i; i = edge[i].nxt) {
          int v = edge[i].to, w = edge[i].w;
          if (dist[u] + w < dist[v])
            pq.push({v, dist[v] = dist[u] + w});
        }
      }
    }
  }
} g, gi;

vector<int> astar(int s, int t) {
  struct Item {
    int u, d;
    bool operator<(const Item& rhs) const {
      return d + gi.dist[u] > rhs.d + gi.dist[rhs.u];
    }
  };
  priority_queue<Item> pq;
  pq.push({s, 0});
  vector<int> kshort;
  while (!pq.empty()) {
    Item itm = pq.top();
    pq.pop();
    int u = itm.u, d = itm.d;
    if (u == t) {
      kshort.push_back(d);
      if (kshort.size() == q) return kshort;
    }
    for (int i = g.head[u]; i; i = g.edge[i].nxt)
      pq.push({g.edge[i].to, d+g.edge[i].w});
  }
  return kshort;
}

int main() {
  scanf("%d%d%d", &n, &m, &q);
  for (int i = 0, x, y, d; i < m; i ++) {
    scanf("%d%d%d", &x, &y, &d);
    g.addedge(x, y, d);
    gi.addedge(y, x, d);
  }
  gi.dijkstra(1);
  vector<int> ans = astar(n, 1);
  for (auto d: ans) printf("%d\n", d);
  for (int i = ans.size(); i < q; i ++) printf("-1\n");

  return 0;
}
```



在洛谷题解中看到的一个比较有意思的dp做法：$f[i][j]$为以第i点为终点第j短路的长度。复杂度$O(mk)$

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1003;
const int MAXK = 203;
int n, m, q;
vector<pair<int, int>> pre[MAXN];
int dp[MAXN][MAXK], sz[MAXN];
int g[MAXK], tmp[MAXK];

int main() {
  scanf("%d%d%d", &n, &m, &q);
  sz[n] = 1;
  for (int i = 0, x, y, z; i < m; i ++) {
    scanf("%d%d%d", &x, &y, &z);
    pre[y].push_back({x, z});
  }
  for (int i = n-1; i > 0; i --) {
    for (auto& p: pre[i]) {
      for (int k = 0; k < sz[p.first]; k ++)
        g[k] = dp[p.first][k] + p.second;

      merge(g, g+sz[p.first], dp[i], dp[i]+sz[i], tmp);
      sz[i] = min(q, sz[i] + sz[p.first]);
      for (int k = 0; k < sz[i]; k ++)
        dp[i][k] = tmp[k];
    }
  }
  for (int k = 0; k < q; k ++)
    printf("%d\n", k < sz[1] ? dp[1][k]: -1);
  return 0;
}
```

