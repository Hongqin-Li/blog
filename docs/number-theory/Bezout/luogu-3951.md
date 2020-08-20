+++
tags = ["number theory"]
+++

# 洛谷P3951 小凯的疑惑

小凯手中有两种面值的金币，两种面值均为正整数且彼此互素。每种金币小凯都有无数个。在不找零的情况下，仅凭这两种金币，有些物品他是无法准确支付的。现在小凯想知道在无法准确支付的物品中，最贵的价值是多少金币？注意：输入数据保证存在小凯无法准确支付的商品。

## Input

两个正整数 $a$ 和 $b$，它们之间用一个空格隔开，表示小凯中金币的面值。

## Output

一个正整数 $N$，表示不找零的情况下，小凯用手中的金币不能准确支付的最贵的物品的价值。

## Examples

Input:

```
3 7
```

Output:

```
11
```

## Solution

数论好题，严格证明的话有一定思维难度

首先，依题意得 $a, b$ 互质，于是由裴蜀定理，存在 $x_0, y_0$ 满足 $a x_0+by_0 = 1$，再由裴蜀定理可证，$ax+by=k$ 的解一定时这种形式 $kx_0 - \lambda b, ky_0 + \lambda a$。而题意要求（小凯无法准确支付时）使得这些二元组不能都大于零的最大的 $k$，贪心一下，让 $kx_0 - lambda b$ 最小且非负可得 $kx_0 \bmod b$，此时 $y=\frac{kx_0 - kx_0 \bmod b}{b}a + ky_0$ 若仍小于 $0$ 则符合题意，故有

$$
\begin{aligned}
\frac{kx_0 - kx_0 \bmod b}{b} \cdot a + k y_0 < 0 \\
\iff (kx_0 - kx_0 \bmod b) \cdot a + kby_0 < 0 \\
\iff k(ax_0 + by_0) < (kx_0\bmod b)\cdot a \\
\iff k < (k\cdot \frac{1-by_0}{a} \bmod b) \cdot a\\
\iff k < (k\cdot a^{-1} \bmod b) \cdot a
\end{aligned}
$$

故原问题等价于

$$
k^* = \max k \text{ s.t } k < (ka^{-1} \bmod b) \cdot a
$$

易知不等号右边小于等于 $(b-1)a$，故 $k^* < ab-a$。注意到不等式右边的值只能取 $0, a, ..., (b-1)a$，周期是 $b$，又由 $a, b$ 互质得 $a^{-1}, b$ 互质，可以证明 $\{ka^{-1} \mid k \in (ab-a-b, ab-a] \} = \{0, a, ..., (b-1)a=ab-a\}$，即两集合的元素恰好一一对应。而除掉最后一对 $k=ab-a\mapsto ab-a$，其他 $k$ 的取值 $(ab-a-b, ab-a)$ 时，对应 $ka^{-1}$ 的值属于 $[0, (b-2)a]$，不妨设 $a\ge b$，则可知这些 $k$ 都不符合约束不等式。于是进一步缩小了范围得到 $k^* <= ab-a-b-1$，由周期性（或者直接代入）可知，$k* = ab-a-b-1$ 确实可行，故答案即此。


```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  long long a, b;
  cin >> a >> b;
  cout << a*b-a-b;
  return 0;
}
```
