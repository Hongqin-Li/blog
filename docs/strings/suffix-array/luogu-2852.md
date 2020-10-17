+++
tags = ["strings", "divide-and-conquer"]
+++

# USACO06-DEC Milk Patterns G

Farmer John has noticed that the quality of milk given by his cows varies from day to day. On further investigation, he discovered that although he can't predict the quality of milk from one day to the next, there are some regular patterns in the daily milk quality.

To perform a rigorous study, he has invented a complex classification scheme by which each milk sample is recorded as an integer between 0 and 1,000,000 inclusive, and has recorded data from a single cow over N (1 ≤ N ≤ 20,000) days. He wishes to find the longest pattern of samples which repeats identically at least K (2 ≤ K ≤ N) times. This may include overlapping patterns -- 1 2 3 2 3 2 3 1 repeats 2 3 2 3 twice, for example.

Help Farmer John by finding the longest repeating subsequence in the sequence of samples. It is guaranteed that at least one subsequence is repeated at least K times.

农夫John发现他的奶牛产奶的质量一直在变动。经过细致的调查，他发现：虽然他不能预见明天产奶的质量，但连续的若干天的质量有很多重叠。我们称之为一个“模式”。 John的牛奶按质量可以被赋予一个0到1000000之间的数。并且John记录了N(1<=N<=20000)天的牛奶质量值。他想知道最长的出现了至少K(2<=K<=N)次的模式的长度。比如1 2 3 2 3 2 3 1 中 2 3 2 3出现了两次。当K=2时，这个长度为4。

## Input

Line 1: Two space-separated integers: N and K

Lines 2..N+1: N integers, one per line, the quality of the milk on day i appears on the ith line.

## Output

求可重叠的最长重复子串，做法类似 [POJ-1743](poj-1743)

```cpp
#include <bits/stdc++.h>
using namespace std;

auto suffix_array(vector<int>& s) {
  int n = s.size(), m = *max_element(s.begin(), s.end()) + 1;
  vector<int> sa(n), r(n*2), rr(n*2), idx(n), ht(n);
  auto rsort = [&]() {
    vector<int> cnt(m);
    for (int i = 0; i < n; i ++) cnt[r[i]] ++;
    for (int i = 1; i < m; i ++) cnt[i] += cnt[i-1];
    for (int i = n-1; i >= 0; i --) sa[--cnt[r[idx[i]]]] = idx[i];
  };
  for (int i = 0; i < n; i ++) r[i] = s[i], idx[i] = i;
  rsort();
  for (int k = 1, p = 0; k < n && p < n; k *= 2, m = p+1) {
    p = 0;
    for (int i = n-k; i < n; i ++) idx[p++] = i;
    for (auto i: sa) if (i >= k) idx[p++] = i-k;
    rsort(), swap(r, rr), p = r[sa[0]] = 1;
    for (int i = 1; i < n; i ++)
      r[sa[i]] = rr[sa[i]] == rr[sa[i-1]] && rr[sa[i]+k] == rr[sa[i-1]+k] ? p: ++p;
  }
  for (int i = 0; i < n; i ++) r[sa[i]] = i;
  for (int i = 0, k = 0; i < n; i ++) {
    if (r[i] == 0) k = 0;
    else {
      if (k) k --;
      for (int j = sa[r[i]-1]; s[i+k] == s[j+k]; k ++) ;
    }
    ht[r[i]] = k;
  }
  return make_tuple(sa, ht);
}

int main() {
  int n, k;
  cin >> n >> k;
  vector<int> s(n), sa, ht;
  for (int i = 0; i < n; i ++) cin >> s[i], s[i] ++;
  tie(sa, ht) = suffix_array(s);

  auto valid = [&](int len) -> bool {
    int cnt = 1;
    for (int i = 1; i < n; i ++) {
      if (ht[i] >= len) cnt ++;
      else cnt = 1;
      if (cnt >= k) return true;
    }
    return false;
  };

  int l = 1, r = n;
  while (l < r) {
    int m = (l+r+1)/2;
    if (valid(m)) l = m;
    else r = m-1;
  }
  cout << l;
  return 0;
}
```
