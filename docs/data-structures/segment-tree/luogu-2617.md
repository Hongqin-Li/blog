+++
tags = ["data structures"]
+++

# 洛谷-P2617 Dynamic Rankings

给定一个含有 $n$ 个数的序列 $a_1,a_2 \dots a_n$，需要支持两种操作：

- `Q l r k` 表示查询下标在区间 $[l,r]$ 中的第 $k$ 小的数
- `C x y` 表示将 $a_x$ 改为 $y$

## Input

第一行两个正整数 $n,m$，表示序列长度与操作个数。
第二行 $n$ 个整数，表示 $a_1,a_2 \dots a_n$。
接下来 $m$ 行，每行表示一个操作，都为上述两种中的一个。

## Output

对于每一次询问，输出一行一个整数表示答案。

## Sample Input

```
5 9
3 2 1 4 7

Q 1 4 1
Q 2 4 3
Q 1 1 1

C 2 6
C 3 0

Q 1 3 1
Q 1 2 2
Q 1 5 3
Q 2 5 3
```

## Sample Output

```
1
4
3
0
6
4
6
```

## Solution

前置知识：树状数组、主席树

经典的带修第k大问题，采用树套树（树状数组套动态开点权值线段树）的做法。也看到有人用整体二分来写。

具体而言，同主席树的思路，只不过我们是用一个树状数组来维护 $n$ 棵动态开点的权值线段树，其中树状数组的第 $i$ 个代表一棵权值线段树 $T^{(i)}$，这棵线段树上每一个区间节点 $[L, R]$ 上记录了原数组中下标属于 $(i-lowbit(i), i]$ 且值的 rank 在 $[L, R]$ 的元素个数。

时空复杂度都是 $O(n \log^2 n)$

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e5+3;

// nvals <= MAXN*2
// modify1: 1+log2(2*nvals)
// modify: (log2(MAXN)+1)*2*modify1
// total: 2*MAXN*modify
struct Node {
  int v, lc, rc;
} node[2*MAXN*((int)log2(MAXN)+1)*2*(1+(int)log2(4*MAXN))];
int nnodes;
int root[MAXN];

int n, a[MAXN], b[MAXN], val[MAXN*2], nvals;
struct Query {
  int q, a, b, c;
} q[MAXN*2];

inline int lowbit(int i) { return i&-i; }

void modify1(int *p, int qk, int x) {
  int l = 1, r = nvals;
  while (l <= r) {
    if (!*p) *p = ++nnodes;
    node[*p].v += x;
    if (l == r) break;
    int m = (l+r)/2;
    if (qk <= m) r = m, p = &node[*p].lc; 
    else l = m+1, p = &node[*p].rc;
  }
}

void build() {
  for (int i = 1; i <= n; i ++) {
    int k = lower_bound(val, val+nvals, a[i]) - val + 1;
    for (int j = i; j <= n; j += lowbit(j))
      modify1(&root[j], k, 1);
  }
}

void modify(int i, int x) {
  int k1 = lower_bound(val, val+nvals, a[i]) - val + 1;
  int k2 = lower_bound(val, val+nvals, x) - val + 1;
  a[i] = x;
  for (; i <= n; i += lowbit(i))
    modify1(&root[i], k1, -1), modify1(&root[i], k2, 1);
}

int query(int li, int ri, int k) {
  static vector<int> pn[2];
  pn[0].resize(0), pn[1].resize(0);

  for (int i = li-1; i; i -= lowbit(i)) pn[0].push_back(root[i]);
  for (int i = ri; i; i -= lowbit(i)) pn[1].push_back(root[i]);

  int l = 1, r = nvals;
  while (l < r) {
    int cnt = 0, m = (l+r)/2;
    for (auto p: pn[1]) cnt += node[node[p].lc].v;
    for (auto p: pn[0]) cnt -= node[node[p].lc].v;
    if (cnt >= k) {
      r = m;
      for (int i = 0; i < 2; i ++)
        for (auto& p: pn[i]) p = node[p].lc;
    }
    else {
      l = m+1, k -= cnt;
      for (int i = 0; i < 2; i ++)
        for (auto& p: pn[i]) p = node[p].rc;
    }
  }
  return val[l-1];
}

int main() {
  int m;
  scanf("%d%d", &n, &m);
  for (int i = 1; i <= n; i ++) {
    scanf("%d", a+i);
    val[nvals ++] = a[i];
  }
  char op[5];
  for (int i = 0, a, b, c; i < m; i ++) {
    scanf("%s%d%d", op, &a, &b);
    if (op[0] == 'Q') scanf("%d", &c);
    else val[nvals ++] = b;
    q[i] = {op[0] == 'Q' ? 1: 0, a, b, c};
  }
  sort(val, val+nvals);
  nvals = unique(val, val+nvals) - val;
  build();

  for (int i = 0; i < m; i ++)
    if (q[i].q) printf("%d\n", query(q[i].a, q[i].b, q[i].c));
    else modify(q[i].a, q[i].b);
  return 0;
}
```
