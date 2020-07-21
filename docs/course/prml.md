+++
tags = ["notes", "machine-learning"]
+++

# 模式识别笔记



## 信息论

KL散度/相对熵：$KL(p||q) = - \int p(x) \ln \left\{ \frac{q(x)}{p(x)} \right\}$，其中p(x)是X的概率密度函数（未知），q(x)是对于X的近似概率密度函数

**定理**  $KL(p||q)\ge 0$，且等号成立当且仅当 $p(x) = q(x)$
证1  由$\ln a \le a-1$ ，有$-KL(p||q)\le \int p(x) \left( \frac{q(x)}{p(x)} - 1 \right) = 0$
证2  由Jessen不等式可得若f为凸函数，则$E(f(Y)) \ge f(E[Y])$，令$Y=\frac{q(x)}{p(x)}$，又$-ln(x)$是凸函数，故$KL(p||q) \ge 0$

KL散度的实际意义？TODO



## EMA

指数移动平均（Exponential Moving Average，EMA）是利用历史观测值来预测下一时刻的值的方法，即 $\hat x_{t+1} = \frac{ \sum_{i = 0}^{t} \beta^i x_{t-i} }{\sum_{i = 0}^{t} \beta^i}, \beta \in (0, 1)$。显然t+1时刻的预测值$\hat x_{t+1}$受近期观测值的影响较大。

因为当$t\rightarrow+\infin$时，$\sum\limits_{i = 0}^{t} \beta^i = \frac{1}{1-\beta}$，代入上式有
$$
\begin{aligned}
\hat x_{t+1} = (1-\beta) \left(\sum\limits_{i=0}^{+\infin} \beta^i x_{t-i}\right) \\
\end{aligned}
$$
将下标t+1换成t并在等式两边同时乘上$\beta$，可得$\beta \hat x_{t} = (1-\beta) \left(\sum\limits_{i=1}^{+\infin} \beta^i x_{t-i}\right)$。前二式做差整理后可得熟悉的EMA公式$\hat x_{t+1} = \beta \hat x_{t} + (1-\beta) x_t$



## SVM





## EM

TODO
