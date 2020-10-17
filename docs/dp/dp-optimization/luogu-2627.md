+++
tags = ["dp"]
+++

# 洛谷P2627 [USACO11OPEN]Mowing the Lawn G

在一年前赢得了小镇的最佳草坪比赛后，Farm John变得很懒，再也没有修剪过草坪。现在，新一轮的最佳草坪比赛又开始了，Farm John希望能够再次夺冠。

然而，Farm John的草坪非常脏乱，因此，Farm John只能够让他的奶牛来完成这项工作。Farm John有 $N(1 \le N \le 100,000)$ 只排成一排的奶牛，编号为 $1\dots N$。每只奶牛的效率是不同的，奶牛 $i$ 的效率为 $E_i(0 \le E_i \le 1,000,000,000)$。

靠近的奶牛们很熟悉，因此，如果Farm John安排超过 $K$ 只连续的奶牛，那么，这些奶牛就会罢工去开派对:)。因此，现在Farm John需要你的帮助，计算FJ可以得到的最大效率，并且该方案中没有连续的超过 $K$ 只奶牛。

## Input

第一行：空格隔开的两个整数 $N$ 和 $K$

第二到 $N+1$ 行：第 $i+1$ 行有一个整数 $E_i$

## Output

第一行：一个值，表示 Farm John 可以得到的最大的效率值。

## Examples

Input 1:

```
5 2
1
2
3
4
5
```

Output 1:

```
12
```

Input 2:

```
5 3
3
2
1
10
10
```

Output 2:

```
25
```

## Solution

单调队列模板题，$f[i][0], f[i][1]$ 分别表示前i头奶牛中选了第 $i$ 头和没选第 $i$ 头的最大和

```c++
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int N = 1e5+3;

int a[N];
ll sa[N], f[N][2];
pair<int, ll> q[N];
int ql, qr;

int main() {
  int n, k;
  scanf("%d%d", &n, &k);
  for (int i = 1; i <= n; i ++)
    scanf("%d", a+i),
    sa[i] = sa[i-1] + a[i];

  ll d = 0;
  for (int i = 1, j = 0; i <= n; i ++) {
    for (; j < i; j ++) {
      pair<int, ll> t = {j, f[j][0] + sa[i] - sa[j] - d};
      while (ql < qr && q[ql].first < i - k) ql ++;
      while (ql < qr && q[qr-1].second <= t.second) qr --;
      q[qr ++] = t;
    }

    f[i][0] = max(f[i-1][1], f[i-1][0]);
    f[i][1] = q[ql].second + d;
    d += a[i+1];
  }
  printf("%lld", max(f[n][0], f[n][1]));
  return 0;
}
```
