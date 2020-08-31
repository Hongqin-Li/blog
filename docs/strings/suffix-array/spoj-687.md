+++
tags = ["strings", "data structures"]
+++

# SPOJ-687 REPEATS - Repeats

A string s is called an (k,l)-repeat if s is obtained by concatenating k>=1 times some seed string t with length l>=1. For example, the string

s = abaabaabaaba

is a (4,3)-repeat with t = aba as its seed string. That is, the seed string t is 3 characters long, and the whole string s is obtained by repeating t 4 times.

Write a program for the following task: Your program is given a long string u consisting of characters ‘a’ and/or ‘b’ as input. Your program must find some (k,l)-repeat that occurs as substring within u with k as large as possible. For example, the input string

u = babbabaabaabaabab

contains the underlined (4,3)-repeat s starting at position 5. Since u contains no other contiguous substring with more than 4 repeats, your program must output the maximum k.

给定字符串，求重复次数最多的连续重复子串

## Input

In the first line of the input contains H- the number of test cases (H <= 20). H test cases follow. First line of each test cases is n - length of the input string (n <= 50000), The next n lines contain the input string, one character (either ‘a’ or ‘b’) per line, in order.

## Output

For each test cases, you should write exactly one interger k in a line - the repeat count that is maximized.

## Examples

Input (lines of input string are compressed into single line)

```
2
17
b a b b a b a a b a a b a a b a b
25
a b a a a b b b a a b a b b b a a a b b b b b a a
```

Output

```
4
5
```

## Solution

后缀数组经典例题之一，具体方法详见：罗穗骞《后缀数组——处理字符串的有力工具》

```cpp
#include <bits/stdc++.h>
using namespace std;

struct ST {
  int n;
  vector<int> lg;
  vector<vector<int>> f;
  ST() {}
  ST(const vector<int>& a): n(a.size()), lg(n+1), f(n) {
    for (int i = 2; i <= n; i ++) lg[i] = lg[i>>1] + 1;
    for (int i = 0; i < n; i ++) {
      f[i].resize(lg[n]+1);
      f[i][0] = a[i];
    }
    for (int j = 1; j < f[0].size(); j ++)
      for (int i = 0; i < n; i ++)
        f[i][j] = min(f[i][j-1], f[min(n-1, i+(1<<(j-1)))][j-1]);
  }
  int query_min(int l, int r) {
    int k = lg[r-l+1];
    return min(f[l][k], f[r+1-(1<<k)][k]);
  }
};

struct SuffixArray {
  int n, m;
  vector<int> sa, r, rr, idx, ht;
  ST st;

  SuffixArray(string& s): n(s.size()), sa(n), r(n*2), rr(n*2), idx(n), ht(n) {
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
      if (r[i] == 0) k = 0;
      else {
        if (k) k --;
        for (int j = sa[r[i]-1]; i+k < n && j+k < n && s[i+k] == s[j+k]; k ++) ;
      }
      ht[r[i]] = k;
    }
    st = ST(ht);
  }
  int lcp(int i, int j) {
    if (i == j) return n-i;
    int ri = r[i], rj = r[j];
    if (ri > rj) swap(ri, rj);
    return st.query_min(ri+1, rj);
  }
};

char get1() {
  char c;
  while ((c = getchar()) == '\n' || c == ' ') ;
  return c;
}

int main() {
  int nt;
  scanf("%d", &nt);
  while (nt --) {
    int n;
    scanf("%d", &n);
    string s(n, ' '), rs(n, ' ');
    for (int i = 0; i < n; i ++)
      s[i] = rs[n-1-i] = get1();

    int ans = 0;
    SuffixArray s1(s), s2(rs);
    for (int l = 1; l <= n/2; l ++) {
      for (int i = 0; i + l < n; i += l) {
        int j = i + l; 
        ans = max(ans, (s1.lcp(i, j) + s2.lcp(n-1-i, n-1-j) - 1)/l + 1);
      }
    }
    printf("%d\n", ans);
  }
  return 0;
}
```
