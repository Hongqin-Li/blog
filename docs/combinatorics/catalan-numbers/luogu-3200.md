+++
tags = ["combinatorics", "number theory"]
+++

# HNOI-2009 有趣的数列

我们称一个长度为 $2n$ 的数列是有趣的，当且仅当该数列满足以下三个条件：

- 它是从 $1 \sim 2n$ 共 $2n$ 个整数的一个排列 $\{a_n\}_{n=1}^{2n}$；

- 所有的奇数项满足 $a_1 < a_3 < \dots < a_{2n-1}$，所有的偶数项满足 $a_2 < a_4 < \dots < a_{2n}$；

- 任意相邻的两项 $a_{2i-1}$ 与 $a_{2i}$ 满足：$a_{2i-1} < a_{2i}$。

对于给定的 $n$，请求出有多少个不同的长度为 $2n$ 的有趣的数列。

因为最后的答案可能很大，所以只要求输出答案对 $p$ 取模。

## Input

一行两个正整数 $n,p$

$1\le n \le 10^6$，$1\le p \le 10^9$

## Output

输出一行一个整数表示答案。

## Solution

若 $i$ 出现在奇数列中，则表示为 `push`，否则表示 `pop`，可以证明，符合题意的数列和 $n$ 个不同元素依次进栈的出栈序列一一对应，于是答案为卡特兰数。

处理组合数时，需要一点约分小技巧。先线性筛出所有质数（同时也得到了所有数的最小质因子），然后统计每个因子的次数，如果因子为合数，则可以下传到它除以最小质因子的那个数上，具体可见代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

ll qpow(ll a, ll i, ll p) {
  if (a == 0) return 0;
  ll res = 1;
  for (; i; i >>= 1) {
    if (i & 1) res = res*a % p;
    a = a*a % p;
  }
  return res;
}

int main() {
  int n, p;
  cin >> n >> p;

  vector<int> prime, mp(2*n+1, 0);
  for (int i = 2; i <= 2*n; i ++) {
    if (!mp[i]) prime.push_back(i), mp[i] = i;
    for (auto p: prime) {
      if (i*p > 2*n) break;
      mp[i*p] = p;
      if (i % p == 0) break;
    }
  }

  vector<int> cnt(2*n+1, 0);
  for (int i = 1; i <= n; i ++) cnt[i] = -1;
  for (int i = n+2; i <= 2*n; i ++) cnt[i] = 1;
  for (int i = 2*n; i > 1; i --) {
    if (mp[i] != i) {
      cnt[mp[i]] += cnt[i];
      cnt[i/mp[i]] += cnt[i];
    }
  }

  ll ans = 1;
  for (auto x: prime)
    ans = ans*qpow(x, cnt[x], p) % p;
  cout << ans;
  return 0;
}
```
