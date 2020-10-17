+++
tags = ["dp"]
+++

# 洛谷P2340 [USACO03FALL]Cow Exhibition G

贝西有权选择让哪些奶牛参加展览。由于负的智商或情商会造成负面效果，所以贝西不希望出展奶牛的智商之和小于零，或情商之和小于零。满足这两个条件下，她希望出展奶牛的智商与情商之和越大越好，请帮助贝西求出这个最大值。

## Input

- 第一行：单个整数 $N(1 \le N\le 400)$
- 第二行到第 $N+1$ 行：第 $i+1$ 行有两个整数：$S_i, F_i(-1000\le S_i, F_i \le 1000)$，表示第 $i$ 头奶牛的智商和情商

## Output

单个整数：表示情商与智商和的最大值。贝西可以不让任何奶牛参加展览，如果这样做是最好的，输出 $0$

## Sample Input

```
5
-5 7
8 -6
6 -3
2 1
-8 -5
```

## Sample Output

```
8
```

## Solution

动态规划好题，考虑前 $i$ 头中情商之和为 $j$ 的最大智商和即可

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 403;
const int MAXM = 8e5;
const int INF = 1e9;
int s[MAXN], f[MAXN];
int dp[2][MAXM+3];

int main() {
  int n;
  scanf("%d", &n);
  for (int i = 1; i <= n; i ++) scanf("%d%d", s+i, f+i);

  for (int j = 0; j <= MAXM; j ++)
    dp[0][j] = j == MAXM/2 ? 0: -INF;

  int cur = 1;
  for (int i = 1; i <= n; i ++) {
    int pre = cur^1;
    for (int j = 0; j <= MAXM; j ++) {
      int pj = j - s[i];
      if (0 <= pj && pj <= MAXM && dp[pre][pj] != -INF)
        dp[cur][j] = max(dp[pre][j], dp[pre][pj] + f[i]);
      else dp[cur][j] = dp[pre][j];
    }
    cur = pre;
  }
  cur ^= 1;
  int ans = 0;
  for (int j = MAXM/2; j <= MAXM; j ++) {
    if (dp[cur][j] >= 0)
      ans = max(ans, j - MAXM/2 + dp[cur][j]);
  }
  printf("%d", ans);

  return 0;
}
```
