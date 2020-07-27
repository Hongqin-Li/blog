+++
tags = ["data-structure", "tricks"]
+++


# 洛谷P4588 [TJOI2018]数学计算 

小豆现在有一个数x，初始值为$1$。小豆有$Q$次操作，操作有两种类型:

$1\ m$：$x=x\times m$ 输出 $x\% mod$

$2\ pos$：$x= x/$第$pos$次操作所乘的数（保证第$pos$次操作一定为类型1,对于每一个类型1的操作至多会被除一次）输出 $x\%mod $

## Input


一共有$t$组输入($t\leq5$)

对于每一组输入,第一行是两个数字$Q,mod$($Q\leq100000,mod\leq100000000$)

接下来$Q$行，每一行为操作类型$op$,操作编号或所乘的数字$m$（保证所有的输入都是合法的）

## Output

对于每一个操作，输出一行，包含操作执行后的$x\%mod$的值

## Sample Input

```
1
10 1000000000
1 2
2 1
1 2
1 10
2 3
2 4
1 6
1 7
1 12
2 7
```

## Sample Output

```
2
1
2
20
10
1
6
42
504
84
```

## Solution

把乘法除法都当成单点修改，每次查询就是求区间乘积，可以用线段树来完成。


```c
#include <stdio.h>

#define MAXN (400007)

#define left(i) (i<<1)
#define right(i) ((i<<1)+1)

long long mod;
struct Node {
  long long val;
} node[MAXN];
int qi, qx;

void build(int l, int r, int p) {
  node[p].val = 1;
  if (l < r) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    build(l, m, lc);
    build(m+1, r, rc);
  }
}

void modify(int l, int r, int p) {
  if (l == r && l == qi) node[p].val = qx % mod;
  else if (l <= qi && qi <= r) {
    int m = (l+r)/2, lc = left(p), rc = right(p);
    modify(l, m, lc);
    modify(m+1, r, rc);
    node[p].val = (node[lc].val * node[rc].val) % mod;
  }
}

int main() {
  int nt, nq;
  scanf("%d", &nt);
  while (nt--) {
    scanf("%d%lld", &nq, &mod);
    build(1, nq, 1);
    for (int i = 1; i <= nq; i ++) {
      int op, x;
      scanf("%d%d", &op, &x);
      if (op == 1)
        qi = i, qx = x;
      else
        qi = x, qx = 1;
      modify(1, nq, 1);
      printf("%lld\n", node[1].val);
    }
  }
  return 0;
}
```
