+++
tags = ["data structures"]
+++

# SDOI-2009 HH 的项链

HH 有一串由各种漂亮的贝壳组成的项链。HH 相信不同的贝壳会带来好运，所以每次散步完后，他都会随意取出一段贝壳，思考它们所表达的含义。HH 不断地收集新的贝壳，因此，他的项链变得越来越长。

有一天，他突然提出了一个问题：某一段贝壳中，包含了多少种不同的贝壳？这个问题很难回答…… 因为项链实在是太长了。于是，他只好求助睿智的你，来解决这个问题。

## Input

一行一个正整数 $n$，表示项链长度。

第二行 $n$ 个正整数 $a_i$，表示项链中第 $i$ 个贝壳的种类。

第三行一个整数 $m$，表示 HH 询问的个数。

接下来 $m$ 行，每行两个整数 $l,r$，表示询问的区间。

## Output

输出 $m$ 行，每行一个整数，依次表示询问对应的答案。

## Examples

Input

```
6
1 2 3 4 3 5
3
1 2
3 5
2 6
```

Output

```
2
2
4
```

## Solution

树状数组好题

对于若干个询问的区间 $[l,r]$，如果他们的 $r$ 都相等的话，那么项链中出现的同一个数字，一定是只关心出现在最右边的那一个的。

于是我们可以将所有查询按区间右端点排序，用树状数组维护每个位置上的数字是否是 $[1, r]$ 区间中的最后一个，若是则为 $1$，否则为 $0$。这样对于询问的答案即树状数组上 $[l, r]$ 的求和。右端点向右移动时，我们需要更新树状数组，如果当前元素在之前已经被记录到树状数组中了，则需要删除它。


```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1e6+3;
int n, nq, a[N], last[N], ans[N];
int bit[N];
struct Q { int l, r, i; } q[N];

int lowbit(int i) { return i&-i;}
void add(int i, int x) {
  for (; i <= n; i += lowbit(i)) bit[i] += x;
}
int sum(int i) {
  int res = 0;
  for (; i; i -= lowbit(i)) res += bit[i];
  return res;
}

int main() {
  ios::sync_with_stdio(false), cin.tie(nullptr);
  cin >> n;
  for (int i = 1; i <= n; i ++) cin >> a[i];
  cin >> nq;
  for (int i = 0; i < nq; i ++) {
    cin >> q[i].l >> q[i].r;
    q[i].i = i;
  }
  sort(q, q+nq, [](Q& a, Q& b) { return a.r < b.r; });

  for (int i = 0, j = 1; i < nq; i ++) {
    for (; j <= q[i].r; j ++) {
      if (last[a[j]]) add(last[a[j]], -1);
      add(last[a[j]] = j, 1);
    }
    ans[q[i].i] = sum(q[i].r) - sum(q[i].l-1);
  }
  for (int i = 0; i < nq; i ++)
    cout << ans[i] << '\n';
  return 0;
}
```
