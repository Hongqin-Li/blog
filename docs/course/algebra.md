+++
tags = ["math", "notes"]
+++

# 代数笔记



## 群论

证明：加法循环群 $G = \{ka \bmod b | \forall k\}$的元素个数为$\frac{b}{gcd(a, b)}$



## 多项式

秦九韶算法（Horner法则）
$$
\begin{aligned}
A(x) &= \sum_{i=0}^{n-1} a_i x^i \\
&= a_0 + x(\sum_{i=0}^{n-2} a_{i+1} x^i) \\
&= a_0 + \left(a_1 + ...\left(a_{n-2} + a_{n-1}x\right)...\right)x
\end{aligned}
$$




定理（代数基本定理）非零n次多项式恰有n个根（含重根）

证明



定理（多项式插值的唯一性）  任意n个x坐标不同的点$(x_i, y_i), i=1, ..., n$，可唯一确定一个n-1次多项式

证明  假设存在两个包含这n个点的n-1次多项式p(x)和q(x)，则他们的差$r(x)=p(x)-q(x)$为至多n-1次多项式。因为$r(x_i) = y_i-y_i = 0$，故n-1次多项式$r(x)$有n个不同根，故$r(x)=0$。

