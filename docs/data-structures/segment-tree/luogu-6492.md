+++
tags = ["data structures"]
+++

# 洛谷-P6492 [COCI2010-2011#6] STEP

给定一个长度为 $n$ 的字符序列 $a$，初始时序列中全部都是字符 L。

有 $q$ 次修改，每次给定一个 $x$，若 $a_x$ 为 L，则将 $a_x$ 修改成 R，否则将 $a_x$ 修改成 L。

对于一个只含字符 L，R 的字符串 $s$，若其中不存在连续的 L 和 R，则称 $s$ 满足要求。

每次修改后，请输出当前序列 $a$ 中最长的满足要求的连续子串的长度。

## Input

第一行有两个整数，分别表示序列的长度 $n$ 和修改操作的次数 $q$。

接下来 $q$ 行，每行一个整数，表示本次修改的位置 $x$。

## Output

对于每次修改操作，输出一行一个整数表示修改 $a$ 中最长的满足要求的子串的长度。

## Sample Input

```
6 5
4
1
1
2
6
```

## Sample Output

```
3
3
3
5
6
```

## Solution

线段树的pushup操作

```c
#include <stdio.h>

#define MAXN 1000007

#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

struct Node {
  int lsign, rsign, llen, rlen, mlen;
} node[MAXN];
int qi;

int max(int a, int b) { return a > b ? a: b; }

void pushup(int l, int r, int p) {
  int m = (l+r)/2, lc = left(p), rc = right(p);
  node[p].lsign = node[lc].lsign;
  node[p].rsign = node[rc].rsign;
  node[p].llen = node[lc].llen;
  node[p].rlen = node[rc].rlen;
  node[p].mlen = max(node[lc].mlen, node[rc].mlen);
  if (node[lc].rsign != node[rc].lsign) {
    node[p].mlen = max(node[p].mlen, node[lc].rlen + node[rc].llen);
    if (node[lc].llen == m-l+1)
      node[p].llen += node[rc].llen;
    if (node[rc].rlen == r-m)
      node[p].rlen += node[lc].rlen;
  }
}

void build(int l, int r, int p) {
  if (l == r) {
    node[p].lsign = node[p].rsign = 0;
    node[p].llen = node[p].rlen = node[p].mlen = 1;
  }
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    pushup(l, r, p);
  }
}

void modify(int l, int r, int p) {
  if (l == r && l == qi) {
    node[p].lsign ^= 1;
    node[p].rsign = node[p].lsign;
  }
  else if (l <= qi && qi <= r) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    modify(l, m, lc);
    modify(m+1, r, rc);
    pushup(l, r, p);
  }
}

int main() {
  int n, q;
  scanf("%d%d", &n, &q);
  build(1, n, 1);
  while (q--) {
    scanf("%d", &qi);
    modify(1, n, 1);
    printf("%d\n", node[1].mlen);
  }
  return 0;
}
```
