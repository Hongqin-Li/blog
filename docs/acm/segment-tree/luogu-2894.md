+++
tags = ["data-structure"]
+++

# 洛谷-P2894 [USACO08FEB]Hotel G

The cows are journeying north to Thunder Bay in Canada to gain cultural enrichment and enjoy a vacation on the sunny shores of Lake Superior. Bessie, ever the competent travel agent, has named the Bullmoose Hotel on famed Cumberland Street as their vacation residence. This immense hotel has N (1 ≤ N ≤ 50,000) rooms all located on the same side of an extremely long hallway (all the better to see the lake, of course).

The cows and other visitors arrive in groups of size Di (1 ≤ Di ≤ N) and approach the front desk to check in. Each group i requests a set of Di contiguous rooms from Canmuu, the moose staffing the counter. He assigns them some set of consecutive room numbers r..r+Di-1 if they are available or, if no contiguous set of rooms is available, politely suggests alternate lodging. Canmuu always chooses the value of r to be the smallest possible.

Visitors also depart the hotel from groups of contiguous rooms. Checkout i has the parameters Xi and Di which specify the vacating of rooms Xi ..Xi +Di-1 (1 ≤ Xi ≤ N-Di+1). Some (or all) of those rooms might be empty before the checkout.

Your job is to assist Canmuu by processing M (1 ≤ M < 50,000) checkin/checkout requests. The hotel is initially unoccupied.

参考样例，第一行输入n，m ，n代表有n个房间，编号为1---n，开始都为空房，m表示以下有m行操作，以下 每行先输入一个数 i ，表示一种操作：

若i为1，表示查询房间，再输入一个数x，表示在1--n 房间中找到长度为x的连续空房，输出连续x个房间中左端的房间号，尽量让这个房间号最小，若找不到长度为x的连续空房，输出0，并且在这x个空房间中住上人。

若i为2，表示退房，再输入两个数 x，y 代表 房间号 x---x+y-1 退房，即让房间为空。


## Input

Line 1: Two space-separated integers: N and M

Lines 2..M+1: Line i+1 contains request expressed as one of two possible formats: (a) Two space separated integers representing a check-in request: 1 and Di (b) Three space-separated integers representing a check-out: 2, Xi, and Di

## Output

Lines 1.....: For each check-in request, output a single line with a single integer r, the first room in the contiguous sequence of rooms to be occupied. If the request cannot be satisfied, output 0.

## Sample Input

```
10 6
1 3
1 3
1 3
1 3
2 5 5
1 6
```

## Sample Output

```
1
4
7
0
5
```

## Solution

维护如下区间信息

1. 横跨左右子区间的最长空房长度的区间端点[ml, mr]
2. 区间左/右端开始最长空房长度ll/rl
3. 区间内最长空房长度maxl

```c
#include <stdio.h>

#define MAXN 200007
#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

struct Node {
  int tag, x;
  int ml, mr, rl, ll, maxl;
} node[MAXN];
int ql, qr, qx;  // Query parameters
int qal, qar;  // Query returns

int max(int a, int b) { return a > b ? a: b; }

void pushup(int l, int r, int p) {
  int m = (l+r)/2, lc = left(p), rc = right(p);
  node[p].ml = m - node[lc].rl + 1;
  node[p].mr = m + node[rc].ll;
  node[p].ll = node[lc].ll;
  node[p].rl = node[rc].rl;
  if (node[p].ll == m-l+1) node[p].ll += node[rc].ll;
  if (node[p].rl == r - m) node[p].rl += node[lc].rl;
  node[p].maxl = max(node[p].mr-node[p].ml+1, max(node[lc].maxl, node[rc].maxl));
}

void update(int l, int r, int p, int x) {
  int m = (l+r)/2;
  if (x) {
    node[p].ml = m+1, node[p].mr = m;
    node[p].rl = node[p].ll = node[p].maxl = 0;
  }
  else {
    node[p].ml = l, node[p].mr = r;
    node[p].rl = node[p].ll = node[p].maxl = r-l+1;
  }
  if (node[p].tag) node[p].x = x;
  else node[p].tag = 1, node[p].x = x;
}

void pushdown(int l, int r, int p) {
  if (node[p].tag) {
    node[p].tag = 0;
    int m = (l+r)/2, lc = left(p), rc = right(p);
    update(l, m, lc, node[p].x);
    update(m+1, r, rc, node[p].x);
  }
}

void build(int l, int r, int p) {
  if (l == r) {
    node[p].ml = node[p].mr = r;
    node[p].rl = node[p].ll = node[p].maxl = 1;
  }
  else {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
    pushup(l, r, p);
  }
}

void modify(int l, int r, int p) {
  if (ql <= l && r <= qr)
    update(l, r, p, qx);
  else if (ql <= r && qr >= l) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    pushdown(l, r, p);
    modify(l, m, lc);
    modify(m+1, r, rc);
    pushup(l, r, p);
  }
}

int query(int l, int r, int p) {
  if (node[p].maxl < qx) return 0;
  int m = (l+r)/2, lc = left(p), rc = right(p);
  if (l != r) {
    pushdown(l, r, p);
    if (query(l, m, lc)) return 1;
  }
  if (node[p].mr - node[p].ml + 1 >= qx) {
    qal = node[p].ml, qar = node[p].ml + qx - 1;
    return 1;
  }
  if (l != r) return query(m+1, r, rc);
  return 0;
}


int main() {
  int n, m, op;
  scanf("%d%d", &n, &m);
  build(1, n, 1);
  while (m--) {
    scanf("%d", &op);
    if (op == 1) {
      scanf("%d", &qx);
      if (query(1, n, 1)) {
        ql = qal, qr = qar, qx = 1;
        modify(1, n, 1);
        printf("%d\n", qal);
      }
      else printf("0\n");
    }
    else {
      scanf("%d%d", &ql, &qr);
      qr += ql-1, qx = 0;
      modify(1, n, 1);
    }
  }

  return 0;
}
```
