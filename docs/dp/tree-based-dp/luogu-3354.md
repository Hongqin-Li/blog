+++
tags = ["dp"]
+++

## IOI-2005 Riv 河流

几乎整个 Byteland 王国都被森林和河流所覆盖。小点的河汇聚到一起，形成了稍大点的河。就这样，所有的河水都汇聚并流进了一条大河，最后这条大河流进了大海。这条大河的入海口处有一个村庄名叫 Bytetown。

在 Byteland 国，有 $n$ 个伐木的村庄，这些村庄都座落在河边。目前在 Bytetown，有一个巨大的伐木场，它处理着全国砍下的所有木料。木料被砍下后，顺着河流而被运到 Bytetown 的伐木场。Byteland 的国王决定，为了减少运输木料的费用，再额外地建造 $k$ 个伐木场。这 $k$ 个伐木场将被建在其他村庄里。这些伐木场建造后，木料就不用都被送到 Bytetown 了，它们可以在运输过程中第一个碰到的新伐木场被处理。显然，如果伐木场座落的那个村子就不用再付运送木料的费用了。它们可以直接被本村的伐木场处理。

注：所有的河流都不会分叉，形成一棵树，根结点是 Bytetown。

国王的大臣计算出了每个村子每年要产多少木料，你的任务是决定在哪些村子建设伐木场能获得最小的运费。其中运费的计算方法为：每一吨木料每千米 $1$ 分钱。

## Input

第一行包括两个整数 $n,k$。$n$ 为村庄数，$k$ 为要建的伐木场的数目。除了 Bytetown 外，每个村子依次被命名为 $1,2,3\ldots n$，Bytetown 被命名为 $0$。

第 $2$ 到第 $(n+1)$ 行，每行 $3$ 个整数，第 $(i+1)$ 行的整数分别代表，分别表示每年 $i$ 村子产的木料的块数 $w_i$，离 $i$ 村子下游最近的村子 $v_i$（即 $i$ 村子的父结点），$v_i$ 到 $i$ 的距离 $d_i$（千米）。

- 对于 $100\%$ 的数据，保证 $2\le n\le 100$，$1\le k\le \min(n,50)$，$0\le v_i\le n$，$0\le w_i\le 10^4$，$1\le d_i\le 10^4$。
- 保证每年所有的木料流到 bytetown 的运费不超过 $2\times 10^9$ 分。

## Output

输出最小花费，单位为分。

## Examples

Input 1:

```
4 2
1 0 1
1 1 10
10 2 5
1 2 3
```

Output 1:

```
4
```

## Solution

树上背包好题

令 $f[u][p][i]$ 为 $u$ 子树中建了（不超过）$i$ 个且剩余木头（最远）流至 $p$ 节点。显然，答案即 $f[0][0][k]$。然后同树上背包类似，依次合并每个子节点的状态即可。

```c++
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int N = 103, K = 53;
const ll INF = 1e18;

int n, k;
int w[N], fa[N], d[N];
ll f[N][N][K];
vector<int> child[N];

void dfs(int u) {
  vector<vector<ll>> g(N, vector<ll>(K, 0));
  for (auto v: child[u]) {
    dfs(v);
    for (int p = u; p != -1; p = fa[p])
      for (int i = k; i >= 0; i --) {
        ll a = INF;
        for (int j = 0; j <= i; j ++)
          a = min(a, g[p][j] + f[v][p][i-j]);
        g[p][i] = a;
      }
  }
  for (int p = u, dd = 0; p != -1; dd += d[p], p = fa[p])
    for (int i = 0; i <= k; i ++)
      f[u][p][i] = min(i >= 1 ? g[u][i-1]: INF, g[p][i] + (ll)w[u]*dd);
}

int main() {
  cin >> n >> k;
  for (int i = 1; i <= n; i ++) {
    cin >> w[i] >> fa[i] >> d[i];
    child[fa[i]].push_back(i);
  }
  fa[0] = -1;
  dfs(0);
  cout << f[0][0][k];
  return 0;
}
```
