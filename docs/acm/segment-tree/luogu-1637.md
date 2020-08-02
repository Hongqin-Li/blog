+++
tags = ["data structures"]
+++

# 洛谷-P1637 三元上升子序列

Erwin 最近对一种叫 `thair` 的东西巨感兴趣。。。

在含有 $n$ 个整数的序列 $a_1,a_2,\ldots,a_n$ 中，三个数被称作 `thair` 当且仅当 $i<j<k$ 且 $a_i<a_j<a_k$。

求一个序列中 `thair` 的个数。

## Input

开始一行一个正整数 $n$,

以后一行 $n$ 个整数 $a_1,a_2,\ldots,a_n$。

## Output

一行一个整数表示 thair 的个数。

## Sample Input

Input 1:

```
4
2 1 3 4
```

Input 2:

```
5
1 2 2 3 4
```

## Sample Output

Output 1:

```
2
```

Output 2:

```
7
```

## Solution

下标从大到小遍历，维护左端点值为i的上升对的数量和值为i的元素的数量，离散化后用两个树状数组维护即可。


```c++
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

typedef long long ll;
const int MAXN = 3e4+3;

int n;
struct BIT {
  ll bit[MAXN];
  inline int lowbit(int i) { return i&-i; }
  void add(int i, ll x) {
    for (; i <= n; i += lowbit(i)) bit[i] += x;
  }
  ll sum(int i) {
    ll ans = 0;
    for (; i; i -= lowbit(i)) ans += bit[i];
    return ans;
  }
  ll query(int l, int r) {
    return sum(r) - sum(l-1);
  }
} bp, bv;

int main() {
  scanf("%d", &n);
  vector<ll> a(n+1);
  vector<ll> val;
  val.reserve(n);
  for (int i = 1; i <= n; i++) {
    scanf("%lld", &a[i]);
    val.push_back(a[i]);
  }

  sort(val.begin(), val.end());
  val.resize(unique(val.begin(), val.end()) - val.begin());
  for (int i = 1; i <= n; i++)
    a[i] = lower_bound(val.begin(), val.end(), a[i]) - val.begin() + 1;

  ll ans = 0;
  for (int i = n; i >= 1; i --) {
    ll npairs = bp.query(a[i]+1, n+1);
    ll nlarger = bv.query(a[i]+1, n+1);
    bp.add(a[i], nlarger);
    bv.add(a[i], 1);
    ans += npairs;
  }
  printf("%lld", ans);
  return 0;
}
```
