+++
tags = ["data structures"]
+++

# 洛谷-P4867 Gty 的二逼妹子序列

给出一个有 $n$ 个数的序列，对该序列有 $m$ 个询问，对于每次询问，输出区间 $[l,r]$ 内,权值在区间 $[a,b]$ 中的权值的种类数。


## Input

第一行包括两个整数 $n,m(1 \le n \le 100000,1 \le m \le 1000000)$，表示数列 $s$ 中的元素数和询问数。

第二行包括 $n$ 个整数 $s_{1} \cdots s_{n}(1 \le si \le n)$。

接下来 $m$ 行，每行包括 $4$ 个整数 $l,r,a,b(1 \le l \le r \le n,1 \le a \le b \le n)$。

保证涉及的所有数在C++的int内。保证输入合法。

## Output

对每个询问，单独输出一行，表示 $s_l \cdots s_r$ 中权值 $\in [a,b]$ 的权值的种类数。

## Examples

Input

```
10 10
4 4 5 1 4 1 5 1 2 1
5 9 1 2
3 4 7 9
4 4 2 5
2 3 4 7
5 10 4 4
3 9 1 1
1 4 5 9
8 9 3 3
2 2 1 6
8 9 1 4
```

Output

```
2
0
0
2
1
1
1
0
1
2
```

## Solution

如果没有值域 $[a, b]$ 的限制，则是莫队模板题。有了值域限制，我们还需要一种单点修改、查询区间和的数据结构，即若区间 $[l, r]$ 中存在值 $i$ 则该数据结构中其对应位为 $1$，否则为 $0$，显然答案即 $[a, b]$ 的区间和。

用树状数组的话，总复杂度比莫队多个 $\log n$。

用值域分块的话，可以做到 $O(1)$ 修改，$O(\sqrt{n})$ 查询，总复杂度同普通莫队 $O(n\sqrt{n})$。

莫队 + 树状数组的做法

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1e5+3, M = 1e6+3;
int n, m;
int a[N], cnt[N], bno[N], ans[M];
struct Q {int i, l, r, a, b; } q[M];

struct BIT {
  int bit[N];
  int lowbit(int i) { return i&-i; }
  void add(int i, int x) {
    for (; i <= n; i += lowbit(i)) bit[i] += x;
  }
  int sum(int i) {
    int res = 0;
    for (; i; i -= lowbit(i)) res += bit[i];
    return res;
  }
  int query(int l, int r) {
    return sum(r) - sum(l-1);
  }
} bit;

void add(int x) {
  if (!cnt[x] ++) bit.add(x, 1);
}

void del(int x) {
  if (!--cnt[x]) bit.add(x, -1);
}

int main() {
  cin >> n >> m;
  for (int i = 1; i <= n; i ++) cin >> a[i];
  for (int i = 0; i < m; i ++) {
    cin >> q[i].l >> q[i].r >> q[i].a >> q[i].b;
    q[i].i = i;
  }

  int bs = ceil(sqrt(n));
  for (int i = 1; i <= n; i ++) bno[i] = (i-1)/bs;
  sort(q, q+m, [](Q& a, Q& b) {
    return bno[a.l] != bno[b.l] ? bno[a.l] < bno[b.l] : a.r < b.r;
  });

  int l = 0, r = -1;
  for (int i = 0; i < m; i ++) {
    int ql = q[i].l, qr = q[i].r;
    while (l < ql) del(a[l++]);
    while (l > ql) add(a[--l]);
    while (r < qr) add(a[++r]);
    while (r > qr) del(a[r--]);
    ans[q[i].i] = bit.query(q[i].a, q[i].b);
  }
  for (int i = 0; i < m; i ++)
    cout << ans[i] << '\n';
  return 0;
}
```

莫队 + 值域分块的做法

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1e5+3, M = 1e6+3;
int n, m;
int a[N], cnt[N], bno[N], ans[M];
int bs;
struct B { int l, r, sum; } block[N];
struct Q { int i, l, r, a, b; } q[M];

int query(int l, int r) {
  int bl = (l-1)/bs, br = (r-1)/bs, res = 0;
  for (int i = bl; i <= br; i ++)
    if (l <= block[i].l && block[i].r <= r) res += block[i].sum;
    else
      for (int j = max(l, block[i].l); j <= min(r, block[i].r); j ++)
        if (cnt[j]) res += 1;
  return res;
}

void add(int x) { if (!cnt[x] ++) block[(x-1)/bs].sum += 1; }
void del(int x) { if (!--cnt[x]) block[(x-1)/bs].sum -= 1; }

int main() {
  cin >> n >> m;
  for (int i = 1; i <= n; i ++) cin >> a[i];
  for (int i = 0; i < m; i ++) {
    cin >> q[i].l >> q[i].r >> q[i].a >> q[i].b;
    q[i].i = i;
  }

  bs = ceil(sqrt(n));
  for (int i = 1; i <= n; i ++) bno[i] = (i-1)/bs;
  sort(q, q+m, [](Q& a, Q& b) {
    return bno[a.l] != bno[b.l] ? bno[a.l] < bno[b.l] : a.r < b.r;
  });

  int nb = (n+bs-1)/bs;
  for (int i = 0; i < nb; i ++)
    block[i] = {1+i*bs, min((i+1)*bs, n), 0};

  int l = 0, r = -1;
  for (int i = 0; i < m; i ++) {
    int ql = q[i].l, qr = q[i].r;
    while (l < ql) del(a[l++]);
    while (l > ql) add(a[--l]);
    while (r < qr) add(a[++r]);
    while (r > qr) del(a[r--]);
    ans[q[i].i] = query(q[i].a, q[i].b);
  }
  for (int i = 0; i < m; i ++) cout << ans[i] << '\n';
  return 0;
}
```
