+++
tags = ["data structures"]
+++

# 洛谷-P5490 【模板】扫描线

求 nnn 个矩形的面积并。

## Input

第一行一个正整数 $n$。

接下来 $n$ 行每行四个非负整数 $x_1, y_1, x_2, y_2$，表示一个矩形的左下角坐标为 $(x_1, y_1)$，右上角坐标为 $(x_2, y_2)。

$1 \le n \le 10^5, 0 \le x_1 < x_2 \le 10^9, 0 \le y_1 < y_2 \le 10^9$。

## Output

一行一个正整数，表示 $n$ 个矩形的并集覆盖的总面积。

## Sample Input

```
2
100 100 200 200
150 150 250 255
```

## Sample Output

```
18000
```

## Solution

扫描线模板题，将值离散化后，用一条垂直于x轴的直线遍历过去，过程中用线段树维护这条线和面积的相交长度。

线段树维护的信息不太正常，需要自己仔细琢磨~~模拟~~一下。具体而言，维护每个区间被“完全”覆盖的次数（难以言喻，具体看代码）和其中被覆盖到的长度（这个信息在某些非根节点是不保证正确性的）。之所以可行是因为区间加减是对称的（加完矩形的一边后必会在之后减去另一边），而且只能保证根节点的信息是正确的。

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5+3;

struct Span {
  int x, qx, yl, yh;
  bool operator<(const Span& rhs) const {
    return x < rhs.x;
  }
} span[MAXN*2];
int nspans;

struct Node {
  int len, cnt, v;
} node[MAXN*16];
int ql, qr, qx;
int len[MAXN*2];

inline int left(int i) { return i<<1;}
inline int right(int i) { return (i<<1)+1; }

inline void update(int l, int r, int p, int lc, int rc) {
  if (node[p].cnt) node[p].v = node[p].len;
  else node[p].v = node[lc].v + node[rc].v;
}

void build(int l, int r, int p) {
  if (l == r) node[p].len = len[l]; 
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc), build(m+1, r, rc);
    node[p].len = node[lc].len + node[rc].len;
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr)
    node[p].cnt += qx,
    // Corner case: l == r
    update(l, r, p, left(p), right(p));
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    modify(l, m, lc), modify(m+1, r, rc);
    update(l, r, p, lc, rc);
  }
}

int main() {
  int n;
  scanf("%d", &n);

  vector<int> val;
  val.reserve(2*n);
  for (int i = 0, x1, y1, x2, y2; i < n; i ++) {
    scanf("%d%d%d%d", &x1, &y1, &x2, &y2);
    span[nspans++] = {x1, 1, y1, y2};
    span[nspans++] = {x2, -1, y1, y2};
    val.push_back(y1);
    val.push_back(y2);
  }
  sort(val.begin(), val.end());
  val.resize(unique(val.begin(), val.end())-val.begin());

  for (int i = 1; i < val.size(); i ++)
    len[i] = val[i] - val[i-1];

  int nlen = val.size()-1;
  build(1, nlen, 1);

  sort(span, span+nspans);
  int prex = span[0].x, prev = 0;
  long long ans = 0;
  for (int i = 0; i < nspans; i ++) {
    ql = lower_bound(val.begin(), val.end(), span[i].yl)-val.begin()+1;
    qr = lower_bound(val.begin(), val.end(), span[i].yh)-val.begin();
    qx = span[i].qx;
    modify(1, nlen, 1);
    ans += (long long)prev * (span[i].x - prex);
    prex = span[i].x, prev = node[1].v;
  }
  printf("%lld", ans);
  return 0;
}
```
