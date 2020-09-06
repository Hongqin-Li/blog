+++
tags = ["data structures"]
+++

# 洛谷-P3709 大爷的字符串题

给你一个字符串 $a$，每次询问一段区间的贡献。

贡献定义：

每次从这个区间中拿出一个字符 $x$ ，然后把 $x$ 从这个区间中删除，直到区间为空。你要维护一个集合 $S$。

- 如果 $S$ 为空，你 rp 减 $1$。
- 如果 $S$ 中有一个元素不小于 $x$，则你 rp 减 $1$，清空 $S$。
- 之后将 $x$ 插入 $S$。

由于你是大爷，平时做过的题考试都会考到，所以每次询问你搞完这段区间的字符之后最多还有多少 rp？rp 初始为 $0$。

询问之间不互相影响~

## Input

第一行两个整数 $n$，$m$，表示字符串长度与询问次数。

之后一行 $n$ 个数，第 $i$ 个整数表示给出的字符串的第 $i$ 个字符 $x_i$。

接下来 $m$ 行，每行两个整数 $l, r$，表示一次询问的区间。

## Output

对于每次询问，输出一行一个整数表示答案。

## Examples

Input

```
10 10
88 27 94 27 34 9 9 67 13 25 
2 3
5 9
4 10
1 6
6 8
2 9
3 8
3 9
3 6
5 8
```

Output

```
-1
-2
-2
-2
-2
-2
-2
-2
-1
-2
```

## Solution

<del>不愧是大爷的题面</del>

求区间内众数的出现次数，即出现次数的最大值，显然可用回滚莫队。注意排序是左端点所在块编号作为第一关键字，右端点作为第二关键字（右端点不能用块编号）

还有普通莫队的方法，记录数的出现次数以及出现次数为 $x$ 的数有多少个。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 2e5+3;
int a[N], aa[N], bno[N], cnt[N], ans[N]; 
struct Q { int i, l, r; } q[N];

int main() {
  int n, m;
  scanf("%d%d", &n, &m);
  for (int i = 1; i <= n; i ++) scanf("%d", a+i), aa[i-1] = a[i];
  for (int i = 0; i < m; i ++) {
    scanf("%d%d", &q[i].l, &q[i].r);
    q[i].i = i;
  }

  sort(aa, aa+n);
  int an = unique(aa, aa+n) - aa;
  for (int i = 1; i <= n; i ++)
    a[i] = lower_bound(aa, aa+an, a[i]) - aa;

  int bs = ceil(sqrt(n));
  for (int i = 1; i <= n; i ++) bno[i] = (i-1)/bs;
  sort(q, q+m, [&](Q& a, Q& b) {
    return bno[a.l] != bno[b.l] ? bno[a.l] < bno[b.l] : a.r < b.r;
  });

  int pre = -1, r, c;
  for (int i = 0; i < m; i ++) {
    int ql = q[i].l, qr = q[i].r;
    int end = min(n, (bno[ql]+1)*bs);
    if (bno[ql] != pre) {
      pre = bno[ql], r = end, c = 0;
      memset(cnt, 0, sizeof(cnt));
    }
    while (r < qr) c = max(c, ++cnt[a[++r]]);

    int cc = c, ll = min(end, qr);
    for (int i = ql; i <= ll; i ++)
      cc = max(cc, ++cnt[a[i]]);
    for (int i = ql; i <= ll; i ++)
      --cnt[a[i]];

    ans[q[i].i] = cc;
  }
  for (int i = 0; i < m; i ++) printf("%d\n", -ans[i]);

  return 0;
}
```
