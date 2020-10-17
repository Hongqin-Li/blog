+++
tags = ["dp"]
+++

# P1896 [SCOI2005]互不侵犯

在 $N\times N$ 的棋盘里面放 $K$ 个国王，使他们互不攻击，共有多少种摆放方案。国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 $8$ 个格子。

## Input

只有一行，包含两个数$N, K(1 \le N \le 9, 0 \le K \le N^2)$

## Output

所得的方案数

## Examples

Input 1:

```
3 1
```

Output 1:

```
9
```

Input 2:

```
3 2
```

Output 2:

```
16
```

Input 3:

```
9 10
```

Output 3:

```
17143061738
```

## Solution

状压dp经典题，$f[i][j][k] = \sum f[i-1][r][k-ks[j]]$ 为在前 $i$ 行种放了 $k$ 个国王且第 $i$ 行的状态为 $j$，其中 $ks[j]$ 为行状态 j 中的国王数量，可以通过 dfs 预处理出来。状态转移时需要判断上一行状态 $r$ 和当前状态 $j$ 是否有国王冲突。

```c++
#include <cstdio>
using namespace std;

const int MAXN = 13, MAXS = 100;
int n, kk;
int s[MAXS], ks[MAXS], ns;
long long f[MAXN][MAXS][MAXN*MAXN];

void dfs(int i, int st, int k) {
  if (i >= n)
    ks[ns] = k, s[ns++] = st;
  else
    dfs(i+1, st, k), dfs(i+2, st|(1<<i), k+1);
}

int main() {
  scanf("%d%d", &n, &kk);
  dfs(0, 0, 0);

  for (int j = 0; j < ns; j ++)
    f[0][j][ks[j]] = 1;

  for (int i = 1; i < n; i ++)
    for (int j = 0; j < ns; j ++)
      for (int k = 0; k <= kk; k ++) {
        int pk = k - ks[j];
        if (pk >= 0) {
          for (int r = 0; r < ns; r ++)
            if (!(s[r]&s[j]) && !((s[r]>>1)&s[j])
                && !((s[r]<<1)&s[j]))
            f[i][j][k] += f[i-1][r][pk];
        }
      }

  long long ans = 0;
  for (int i = 0; i < ns; i ++)
    ans += f[n-1][i][kk];
  printf("%lld", ans);
  return 0;
}
```
