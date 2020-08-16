+++
tags = ["dp"]
+++

# SCOI-2009 windy 数

不含前导零且相邻两个数字之差至少为 $2$ 的正整数被称为 windy 数。windy 想知道，在 $a$ 和 $b$ 之间，包括 $a$ 和 $b$ ，总共有多少个 windy 数？

## Input

输入只有一行两个整数，分别表示 $a$ 和 $b$。

## Output

输出一行一个整数表示答案。

## Examples

Input 1:

```
1 10
```

Output 1:

```
9
```

Input 2:

```
25 50
```

Output 2:

```
20
```

Input 3:

```
20 1000
```

Output 3:

```
520
```

## Solution

数位 dp 模板题，细节比较多

$f[i]$ 为第 $i$ 位为 $j$ 的**可有前导零** 的数量，$g[i]$ 为 $[0, 10^i)$ 中的数量。

枚举 i，然后加上 $[\bar{b_{n-1}...b_{i-1}00...0}, \bar{b_{n-1}...b_{i-1}b_i0...0})$ 中的数量即可。


```c++
#include <bits/stdc++.h>
using namespace std;

const int K = 12;
int f[K][10], g[K];

void init() {
  for (int i = 0; i < 10; i ++) f[0][i] = 1;
  for (int i = 1; i < K; i ++)
    for (int j = 0; j < 10; j ++)
      for (int pj = 0; pj < 10; pj ++)
        if (abs(j - pj) >= 2)
          f[i][j] += f[i-1][pj];

  for (int i = 1; i < K; i ++)
    g[i] = g[i-1] + accumulate(f[i-1]+1, f[i-1]+10, 0);
}

int solve(int a) {
  vector<int> b;
  for (int x = a; x; x /= 10) b.push_back(x % 10);

  int nb = b.size(), pb = b.back();
  int ans = g[nb-1] + accumulate(f[nb-1]+1, f[nb-1]+pb, 0);
  for (int i = nb-2; i >= 0; i --) {
    for (int j = 0; j < b[i]; j ++)
      if (abs(j - pb) >= 2) ans += f[i][j];
    if (abs(b[i] - pb) < 2) break;
    pb = b[i];
  }
  return ans;
}

int main() {
  init();
  int a, b;
  cin >> a >> b;
  cout << solve(b+1) - solve(a);
  return 0;
}
```
