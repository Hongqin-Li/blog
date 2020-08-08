+++
tags = ["dp"]
+++

# 洛谷P1833 樱花

爱与愁大神后院里种了 $n$ 棵樱花树，每棵都有美学值 $C_i$。爱与愁大神在每天上学前都会来赏花。爱与愁大神可是生物学霸，他懂得如何欣赏樱花：一种樱花树看一遍过，一种樱花树最多看 $A_i$ 遍，一种樱花树可以看无数遍。但是看每棵樱花树都有一定的时间 $T_i$。爱与愁大神离去上学的时间只剩下一小会儿了。求解看哪几棵樱花树能使美学值最高且爱与愁大神能准时（或提早）去上学。

## Input

共 $n+1$ 行：

第 $1$ 行：现在时间 $T_s$（几时：几分），去上学的时间 $T_e$（几时：几分），爱与愁大神院子里有几棵樱花树 $n$。这里的 $T_s, T_e 格式为：`hh:mm`，其中 $0 \leq hh \leq 23, 0 \leq mm \leq 59$，且 $hh,mm,n$ 均为正整数。

第 $2$ 行到第 $n+1$ 行，每行三个正整数：看完第 $i$ 棵树的耗费时间 $T_i$，第 $i$ 棵树的美学值 $C_i$，看第 $i$ 棵树的次数 $P_i$（$P_i=0$ 表示无数次，$P_i$ 是其他数字表示最多可看的次数 $P_i$）。

## Output

只有一个整数，表示最大美学值。

## Examples

Input 1:

```
6:50 7:00 3
2 1 0
3 3 1
4 5 4
```

Output 1:

```
11
```

## Solution

多重背包模板题，采用二进制优化（或单调队列优化）实现

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXM = 1003;
int f[MAXM];

int main() {
  int ni, h1, h2, m1, m2;
  scanf("%d:%d%d:%d%d", &h1, &m1, &h2, &m2, &ni);
  int m = (h2-h1)*60 + m2-m1;

  struct Item { int t, c, inf; };
  vector<Item> item;
  item.reserve(10*ni);

  for (int i = 0; i < ni; i ++) {
    int t, c, p;
    scanf("%d%d%d", &t, &c, &p);
    if (p) {
      int k;
      for (k = 0; (1<<(k+1)) <= p; k ++)
        item.push_back({(1<<k)*t, (1<<k)*c, 0});
      int left = p - (1<<k) + 1;
      if (left) item.push_back({left*t, left*c, 0});
    }
    else item.push_back({t, c, 1});
  }

  int n = item.size();
  for (auto& x: item) {
    if (x.inf)
      for (int j = 0; j <= m; j ++)
        f[j] = max(f[j], j-x.t >= 0 ? f[j-x.t] + x.c: 0);
    else
      for (int j = m; j >= 0; j --)
        f[j] = max(f[j], j-x.t >= 0 ? f[j-x.t] + x.c: 0);
  }
  printf("%d", f[m]);
  return 0;
}
```
