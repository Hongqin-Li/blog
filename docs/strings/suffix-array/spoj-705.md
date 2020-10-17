+++
tags = ["strings"]
+++

# SPOJ-705 SUBST1 - New Distinct Substrings

Given a string, we need to find the total number of its distinct substrings.

给定一个字符串，求该字符串含有的本质不同的子串数量。

## Input

T- number of test cases. $T \le 20$; Each test case consists of one string, whose length is $\le 50000$

## Output

For each test case output one number saying the number of distinct substrings.

## Examples

Input

```
2
CCCCC
ABABA
```

Output

```
5
9
```

## Solution

后缀数组经典例题

> 如果把所有后缀排序后，不难发现，对于后缀 $suffix(sa[k])$，它将产生 $n-sa[k]+1$ 个新的前缀。但是其中有 $height[k]$ 个是和前面的字符串的前缀是相同的。——罗穗骞《后缀数组——处理字符串的有力工具》

于是化简一下可得答案为 $\sum n-sa[k]+1 - \sum height[k] = \frac{(1+n)n}{2} - \sum height[k]$ 

```cpp
#include <bits/stdc++.h>
using namespace std;

struct SA {
  int n, m;
  vector<int> sa, r, rr, idx, ht;
  SA(const string& s): n(s.size()), sa(n), r(2*n), rr(2*n), idx(n), ht(n) {
    m = *max_element(s.begin(), s.end()) + 1;
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
      if (r[i]) {
        if (k) k --;
        for (int j = sa[r[i]-1]; i+k < n && j+k < n && s[i+k] == s[j+k]; k ++) ;
      }
      else k = 0;
      ht[r[i]] = k;
    }
  }
};

int main() {
  int nt;
  cin >> nt;
  while (nt --) {
    string s;
    cin >> s;
    SA sa(s);
    cout << (int64_t)sa.n*(1+sa.n)/2 - accumulate(sa.ht.begin(), sa.ht.end(), 0) << '\n';
  }
  return 0;
}
```
