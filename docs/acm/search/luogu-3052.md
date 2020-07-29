+++
tags = ["dfs", "dp"]
+++

# 洛谷P3052 [USACO12MAR] Cows in a Skyscraper G

A little known fact about Bessie and friends is that they love stair climbing races. A better known fact is that cows really don't like going down stairs. So after the cows finish racing to the top of their favorite skyscraper, they had a problem. Refusing to climb back down using the stairs, the cows are forced to use the elevator in order to get back to the ground floor.

The elevator has a maximum weight capacity of W (1 <= W <= 100,000,000) pounds and cow i weighs $C_i$ (1 <= $C_i$ <= W) pounds. Please help Bessie figure out how to get all the N (1 <= N <= 18) of the cows to the ground floor using the least number of elevator rides. The sum of the weights of the cows on each elevator ride must be no larger than W.

给出n个物品，体积为w[i]，现把其分成若干组，要求每组总体积<=W，问最小分组。(n<=18)

## Input

Line 1: N and W separated by a space.

Lines 2..1+N: Line i+1 contains the integer $C_i$, giving the weight of one of the cows.

## Output

A single integer, R, indicating the minimum number of elevator rides needed.

one of the R trips down the elevator.

## Sample Input

```
4 10 
5 
6 
3 
7 
```

## Sample Output

```
3
```

## Solution

暴搜剪枝：

```c++
#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;
int n, w, a[20], ans = INF, sum;
int vis[20];

void dfs(int x, int s, int dep, int headi, int maxi) {
  if (s == sum) ans = min(ans, dep);
  if (dep >= ans) return;

  if (x == 0) {
    while (vis[headi]) headi --;
    vis[headi] = 1;
    dfs(a[headi], s+a[headi], dep, headi, headi - 1);
    vis[headi] = 0;
  }
  else {
    int more = 0;
    for (int i = maxi; i >= 0; i --) {
      if (!vis[i]) {
        vis[i] = 1;
        if (x + a[i] <= w) {
          more = 1;
          dfs(x+a[i], s+a[i], dep, headi, i-1);
        }
        vis[i] = 0;
      }
    }
    if (!more) dfs(0, s, dep+1, headi, n-1);
  }
}

int main() {
  scanf("%d%d", &n, &w);
  for (int i = 0; i < n; i ++) {
    scanf("%d", a+i);
    sum += a[i];
  }
  sort(a, a+n);
  dfs(0, 0, 1, n-1, n-1);
  printf("%d", ans);
  return 0;
}
```

状压dp：$f[i][j]$表示当前已经装了i个电梯且状态为j的最后一个电梯的最大剩余空间。状态j中第k位为1表示第k只奶牛已经在电梯里了。

```c++
#include <cstdio>
#include <algorithm>
using namespace std;

const int MAXN = 18;
int a[MAXN], f[MAXN+1][1<<MAXN];

int main() {
  int n, w;
  scanf("%d%d", &n, &w);
  for (int i = 0; i < n; i ++) scanf("%d", a+i);
  int st = (1<<n)-1;

  for (int i = 0; i < n; i ++) {
    f[i][0] = w;
    for (int j = 1; j <= st; j ++)
      f[i][j] = -1;
  }

  for (int i = 0; i < n; i ++) {
    for (int s = 0; s < st; s ++) {
      if (f[i][s] >= 0) {
        for (int j = 0; j < n; j ++) {
          if (!(s & (1<<j))) {
            int ns = s | (1<<j);
            if (a[j] <= f[i][s])
              f[i][ns] = max(f[i][ns], f[i][s]-a[j]);
            else
              f[i+1][ns] = max(f[i+1][ns], w-a[j]);
          }
        }
      }
    }
  }
  for (int i = 0; i < n; i ++) {
    if (f[i][st] >= 0) {
      printf("%d", i+1);
      break;
    }
  }

  return 0;
}
```

枚举子集dp：f[i]表示状态i需要的最少电梯数，而每个状态i总是由最后一个电梯状态 $i_0$（其中奶牛重量之和小于电梯限制，即$sum[i_0] \le W$）加上之前电梯状态（$i-i_0$）


```c++
#include <cstdio>
#include <algorithm>
using namespace std;

const int INF = 1e9;
const int MAXN = 18;
int a[MAXN], sum[1<<MAXN], f[1<<MAXN];

int main() {
  int n, w;
  scanf("%d%d", &n, &w);
  for (int i = 0; i < n; i ++) {
    scanf("%d", a+i);
    sum[1<<i] = a[i];
  }
  int st = (1<<n)-1;
  for (int i = 1; i <= st; i ++)
    sum[i] = sum[i-(i&-i)] + sum[i&-i];

  for (int i = 1; i <= st; i ++) {
    f[i] = INF;
    for (int j = i; j; j = (j-1)&i)
      if (sum[j] <= w)
        f[i] = min(f[i], f[i-j]+1);
  }
  printf("%d", f[st]);
  return 0;
}
```

