+++
tags = ["combinatorics", "probability"]
+++

# TJOI-2015 概率论

为了提高智商，ZJY 开始学习概率论。有一天，她想到了这样一个问题：对于一棵随机生成的 $n$ 个结点的有根二叉树（所有互相不同构的形态等概率出现），它的叶子节点数的期望是多少呢？

## Input

输入一个正整数 $n$，表示有根树的结点数。

## Output

输出这棵树期望的叶子节点数，要求误差小于 $10^{-9}$。

## Examples

Input 1:

```
1
```

Output 1:

```
1.000000000
```

Input 2:

```
3
```

Output 2:

```
1.200000000
```

## Solution

首先，令 $f_n$ 为答案，$h_n$ 为卡特兰数，递推一下有 $f_n h_n = \sum h_{i-1} h_{n-i} (f_{i-1} + f_{n-i})$．然后令 $g_n = f_n h_n$，化简一下上式可得 $g_n = 2\sum h_{n-i} g_{i-1}$．由于这是个卷积，而卡特兰数列的生成函数已知，即 $H(x)=\sum h_n x^n = \frac{1-\sqrt{1-4x}}{2x}$，于是我们可以用生成函数的方法求得 $g_n$．

首先令 $G(x) = \sum g_n x^n$，则 $G(x)H(x)=\frac{G(x)-x}{2x}$，代入 $H(x)$ 并进行分母有理化得 $G(x)=\frac{1}{4} \left( (1-4x)^{-\frac{1}{2}} - (1-4x)^{\frac{1}{2}} \right)$，将 $(1-4x)^k$ 用二项式定理展开并化简得到 $G(x)=\frac{-1}{4}\sum \binom{-\frac{1}{2}}{k-1} (-4x)^k$，于是整理一下各项系数为 $g_n = \frac{(2n-3)!!}{(n-1)!} 2^{n-1}$．最后除掉 $h_n=\frac{\binom{2n}{n}}{n+1}$ 可得 $f_n=\frac{g_n}{h_n}=\frac{n(n+1)}{2(2n-1)}$．

据说可以用 Lagarange 反演，<del>然而我并不会</del>

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  double n;
  cin >> n;
  cout << fixed << setprecision(10) << n*(n+1)/2/(2*n-1);
}
```
