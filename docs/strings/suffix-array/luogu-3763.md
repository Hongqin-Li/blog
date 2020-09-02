+++
tags = ["strings"]
+++

# TJOI-2017 DNA

加里敦大学的生物研究所，发现了决定人喜不喜欢吃藕的基因序列 $S$,有这个序列的碱基序列就会表现出喜欢吃藕的性状，但是研究人员发现对碱基序列 $S$，任意修改其中不超过 $3$ 个碱基，依然能够表现出吃藕的性状。现在研究人员想知道这个基因在 DNA 链 $S_0$ 上的位置。所以你需要统计在一个表现出吃藕性状的人的 DNA 序列 $S_0$ 上，有多少个连续子串可能是该基因，即有多少个 $S_0$ 的连续子串修改小于等于三个字母能够变成 $S$。

## Input

第一行有一个整数 $T$，表示有几组数据。

每组数据第一行一个长度不超过 $10^5$ 的碱基序列 $S_0$。

每组数据第二行一个长度不超过 $10^5$ 的吃藕基因序列 $S$。

## Output

共 $T$ 行，第 $i$ 行表示第 $i$ 组数据中，在 $S_0$中有多少个与 $S$ 等长的连续子串可能是表现吃藕性状的碱基序列。

## Examples

Input

```
1
ATCGCCCTA
CTTCA
```

Output

```
2
```

## Solution

先把两字符串拼起来求后缀数组，然后枚举 $S_0$ 的每个位置作为可能的左端点。每次求一下 $S_0$ 中的当前位置（初始为当前枚举到的位置）和 $S$ 中的当前位置（初始为 $S$ 的左端点）的 $lcp$，然后跳过去，此时这两个位置一定是需要修改的。如果这样跳的次数不大于 $4$ 且最终 $S$ 中的位置到达了最右端，则说明成功。

```cpp
#include <bits/stdc++.h>
using namespace std;

struct ST {
  int n;
  vector<int> lg;
  vector<vector<int>> f;
  ST() {}
  ST(vector<int>& a): n(a.size()), lg(n+1), f(n) {
    for (int i = 2; i <= n; i ++) lg[i] = lg[i/2] + 1;
    for (int i = 0; i < n; i ++) {
      f[i].resize(lg[n]+1);
      f[i][0] = a[i];
    }
    for (int j = 1; j < f[0].size(); j ++)
      for (int i = 0; i < n; i ++)
        f[i][j] = min(f[i][j-1], f[min(n-1, i+(1<<(j-1)))][j-1]);
  }
  int query(int l, int r) {
    int k = lg[r-l+1];
    return min(f[l][k], f[r+1-(1<<k)][k]);
  }
};

struct SA {
  int n, m;
  vector<int> sa, r, rr, ht, idx;
  ST st;
  SA(const string& s): n(s.size()), sa(n), r(n*2), rr(n*2), ht(n), idx(n) {
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
    for (int k = 0, i = 0; i < n; i ++) {
      if (r[i]) {
        if (k) --k;
        for (int j = sa[r[i]-1]; i+k < n && j+k < n && s[i+k] == s[j+k]; k++) ;
      }
      else k = 0;
      ht[r[i]] = k;
    }
    st = ST(ht);
  }
  int lcp(int i, int j) {
    if (i == j) return n-i;
    if (r[i] > r[j]) swap(i, j);
    return st.query(r[i]+1, r[j]);
  }
};

int main() {
  int nt;
  cin >> nt;
  while (nt --) {
    string s, t;
    cin >> s >> t;
    SA sa(s + '#' + t + '$');
    int sl = s.size(), tl = t.size();
    int cnt = 0;
    for (int ii = 0; ii < sl; ii ++) {
      int i = ii, j = sl + 1;
      int lcp = sa.lcp(i, j);
      i += lcp, j += lcp;
      for (int k = 0; i < sl && j <= sl+tl && k < 3; k ++) {
        i ++, j ++;
        int nxt = sa.lcp(i, j);
        i += nxt, j += nxt;
      }
      if (j == sl+tl+1) cnt ++;
    }
    cout << cnt << '\n';
  }
  return 0;
}
```
