+++
tags = ["strings", "data structures"]
+++

# HAOI-2016 找相同字符

给定两个字符串，求出在两个字符串中各取出一个子串使得这两个子串相同的方案数。两个方案不同当且仅当这两个子串中有一个位置不同。

## Input

两行，两个字符串$s_1$，$s_2$，长度分别为 $n_1,n_2$。$1 \le n_1, n_2 \le 200000$，字符串中只有小写字母

## Output

输出一个整数表示答案

## Examples

Input

```
aabb
bbaa
```

Output

```
10
```

## Solution

等价于求所有后缀对的 $lcp$ 之和，用后缀数组 + 单调栈维护即可

```cpp
#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

struct SA {
  int n, m;
  vector<int> sa, r, rr, idx, ht;
  SA(const string& s): n(s.size()), sa(n), r(n*2), rr(n*2), idx(n), ht(n) {
    int m = *max_element(s.begin(), s.end())+1;
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
        if (k) k--;
        for (int j = sa[r[i]-1]; i+k < n && j+k < n && s[i+k] == s[j+k]; k ++) ;
      }
      else k = 0;
      ht[r[i]] = k;
    }
  }
};

struct {
  stack<pair<int64_t, int>> stk;
  int64_t sum;
  void update(int h) {
    int cnt = 0;
    while (stk.size() && stk.top().first >= h) {
      auto t = stk.top();
      sum -= t.second * t.first; 
      cnt += t.second;
      stk.pop();
    }
    if (cnt) {
      stk.push({h, cnt});
      sum += cnt * h;
    }
  }
  void push() {
    stk.push({INF, 1});
    sum += INF;
  }
} stk1, stk2;

int main() {
  string s, t;
  cin >> s >> t;
  SA sa(s+'$'+t);
  int sl = s.size(), tl = t.size();
  int64_t ans = 0;
  for (int i = 0; i < sa.n; i ++) {
    stk1.update(sa.ht[i]), stk2.update(sa.ht[i]);
    if (sa.sa[i] < sl)
      ans += stk2.sum, stk1.push();
    else if (sa.sa[i] > sl)
      ans += stk1.sum, stk2.push();
  }
  cout << ans;
  return 0;
}
```
