+++
tags = ["combinatorics"]
+++

# HNOI-2004 树的计数

一个有 $n$ 个节点的树，设它的节点分别为 $v_1,v_2,\ldots,v_n$，已知第 $i$ 个节点 $v_i$ 的度数为 $d_i$，问满足这样的条件的不同的树有多少棵。

## Input

输入文件第一行是一个正整数 $n$ ，表示树有 $n$ 个结点。第二行有 $n$ 个数，第 $i$ 个数表示 $d_i$，即树的第 $i$ 个结点的度数。

$1\le n\le 150$，保证满足条件的树不超过 $10^{17}$ 个。

## Output

输出满足条件的树有多少棵。

## Solution

首先要知道 Prufer 序列，<del>然后就没了</del>

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
  int n;
  cin >> n;

  vector<vector<ll>> c(n, vector<ll>(n));
  for (int i = 0; i < n; i ++) {
    c[i][0] = c[i][i] = 1;
    for (int j = 1; j < i; j ++)
      c[i][j] = c[i-1][j] + c[i-1][j-1];
  }

  ll bad = 0, sum = 0, ans;
  vector<int> d(n);
  for (int i = 0; i < n; i ++) {
    cin >> d[i];
    sum += d[i];
    if (n > 1 && d[i] <= 0) bad = 1;
  }
  if (sum != 2*n-2) bad = 1;

  if (bad) ans = 0;
  else {
    ans = 1;
    if (n >= 2) {
      n -= 2;
      for (auto di: d) {
        ans *= c[n][di-1];
        n -= di-1;
      }
    }
  }
  cout << ans;

  return 0;
}
```
