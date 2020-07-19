+++
tags = ["notes", "math", "probability"]
+++

# 概率论笔记



## 基础

$P(AB|C) = P(A|BC)P(B|C) = P(B|AC)P(A|C)$

证明：只证第一个等号，第二个同理
$$
\begin{aligned}
P(AB|C) &= \frac{P(ABC)}{P(C)} \\
&= \frac{P(A|BC)\cdot P(BC)}{P(C)} \\
&= P(A|BC)\cdot P(B|C)
\end{aligned}
$$




## 不等式

**定理（Markov不等式）**  对任意非负随意变量X和常数$a>0$，有$P\{X \ge a\} \le \frac{E[X]}{a}$
**证**  令$I = \begin{cases} 1, x \ge a\\ 0, else\end{cases}$，显然$I \le \frac{X}{a}$，故有$P\{X\ge a\} = E[I] \le E[\frac{X}{a}] = \frac{E[X]}{a}$

**推论（Chebyshev不等式）** $P\{|X - E[X]| \ge a\} \le \frac{Var[X]}{a^2}$

**定理（Jessen不等式）** 若$f(x)$为凸函数，即$\forall 0\le \lambda \le 1: f(\lambda a + (1-\lambda )b) \le \lambda f(a) + (1-\lambda) f(b)$，有$\forall \lambda_i \ge 0 \text{ and } \sum \lambda_i= 1 :f\left(\sum \lambda_i x_i\right)\le \sum \lambda_i f(x_i)$
**证**  用数学归纳法易证

**推论**  若$f(x)$为凸函数，有$f(E[X]) \le E[f(x)]$



TODO

[chernoff-bound](http://math.mit.edu/~goemans/18310S15/chernoff-notes.pdf)

## 大数定律



## 中心极限定理

