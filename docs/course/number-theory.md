+++
tags = ["math", "notes"]
+++

# 代数笔记



## 群论

半群：运算满足结合律和封闭性

幺半群：含单位元的半群

群：每个元素均存在逆元的幺半群

等价关系：满足自反性、对称性、传递性的二元运算



### 陪集分解

**引理 1**    $G$ 是群，$A$ 是 $G$ 的子群，则对 $\forall g, h\in G$，定义关系 $g\sim h \iff gh^{-1}\in A$ 为等价关系，且 $g$ 的等价类为 $Ag$．

此时每个等价类称为 $G$ 对于子群 A 的**右陪集**，类似可定义左陪集．显然 $G$ 可由一些互不相交的右陪集组成，即 $G = \bigcup_{g\in R} Ag$，其中 $R$ 称为**右陪集代表元系**，并令 $[G:A]=|R|$，于是有 $|G|=|A|\cdot [G:A]$．易得下述定理．

**定理 1**    群$G$ 的子群的阶一定是 $|G|$ 的因子．

**定理 2**    有限群 $G$ 中任意元素的阶必是 $|G|$ 的因子．

**定理 3**    设 $g, h$ 是群 $G$ 中元素，若 $g$ 的阶为 $n$，则对每个正整数 $i$，$g^i$ 的阶是 $\frac{n}{(n, i)}$；若 $gh=hg$，$g, h$ 的阶分别为 $n, m$，且 $(n, m)=1$，则 $gh$ 的阶为 $nm$．



**定理 4**    $A, B$ 为有限群 $G$ 的子集，则

1. $|AB|=|A|\cdot |B|/|A\cap B|$；
2. 若 $A$ 是 $B$ 的子集，则 $[G:A]=[G:B][B:A]$；
3. $[G:A\cap B]\le [G:A][G:B]$，进而若 $[G:A]$ 和 $[G:B]$ 互素，则 $[G:A\cap B]=[G:A][G:B]$ 且 $AB=G$．

**证明**    TODO



定义





习题：

1. 若群 $G$ 中除单位元外每个元素的阶均为 $2$，则 $G$ 为可交换群．
2. $p$（素数）阶群均是可交换群，且均同构于整数模 $p$ 加法群 $Z_p$．
3. 非交换的群的最小阶为 $6$．
4. 加法循环群 $G = \left\{ka \bmod b \mid \forall k\right\}$ 的元素个数为 $\frac{b}{gcd(a, b)}$．
5. 素数阶群一定是循环群．



### 循环群

**定理**    在 $n$ 阶循环群 $G$ 中，对 $n$ 的每个正因子 $m$，阶为 $m$ 的元素恰好有 $\varphi(m)$ 个，由此证明等式 $\sum_{m|n} \varphi(m) = n$．

**证明**    由于 $g^i$ 的阶为 $\frac{n}{gcd(n, i)}=m$，于是 $i$ 只能是 $1\frac{n}{m}, ..., m\frac{n}{m}$ 中系数与 $m$ 互质的数，即有 $\varphi(m)$ 个．



**定理**    循环群 $G$ 的子群的阶互不相等，即每种阶数的子群至多只有一个

**证明**    阶为 $d$ 的子群必为 $\left\{\left(a^{\frac{n}{d}}\right)^i\right\}$



习题：

1. 若 $G$ 是循环群，则其任意子群均是循环群，且若 $r$ 是 $|G|$ 的因子，则 $G$ 有且仅有一个 $r$ 阶子群．



## 数论

### 符号说明

令 $(a, b)=gcd(a, b)$，$[a, b]=lcm(a, b)$



### 质因数分解

定理：任意正整数 $a$，总能唯一的分解成质因子幂次的乘积，即 $a =\prod p_i^{a_i}$

证明：TODO



易证如下结论

- $a\mid b \iff a_i\le b_i$
- $(a, b)_i = \min\{a_i, b_i\}$，推论 $(a, b)=1 \iff a_i b_i = 0$
- $[a, b]_i=\max\{a_i, b_i\}$



例 1：$x\mid a, x\mid b\iff x \mid (a, b)$

证：充分性显然，必要性由 $(a,b)_i = \min\{a_i, b_i\}$ 且 $x_i\le a_i, b_i$，故有 $x_i\le gcd_i$，即 $x\mid (a, b)$．

例 2：$(a, m)=(b, m)=1\iff (ab, m)=1$

例 3：若 $c\mid ab$ 且 $(c, a)=1$，则 $c|b$

例 4：$(x, [a, b])=[(x, a), (x, b)]$



### GCD



#### 欧几里得算法

易证 $gcd(a, b)\iff gcd(b-ka, a) \iff gcd(b\mod a, a)$



算法复杂度 $O(\log n)$

证明：不妨设 $a<b$，考虑两轮过后 $gcd(a, b) = gcd(b\%a, a)=gcd(a\%(b\%a), a)$，$a$ 变成了 $a\%(b%a)$，如下暴力观察一下，可以发现这个过程中 $a$ 至少减半
$$
\begin{aligned}
a\%(b\%a) = \begin{cases}
a \% (a-1) = \min\{1, a-2\}, &\text{if }b\% a =a-1 \\
a \% (a-2) = \min\{2, a-3\}, &\text{if }b\% a =a-2 \\
... \\
a \% (a-(a-1)) = \min\{a-1, 0\}, &\text{if }b\% a =1 \\
\end{cases}
\end{aligned}
$$


#### 扩展欧几里得算法

假设我们已知 $gcd(b\bmod a, a)=(b\bmod a) x' + ay'=(b-\lfloor\frac{b}{a}\rfloor a) x' + ay'$ 中的 $x',y'$，则我们可以求出满足 $ax+by=gcd(a, b)$ 的 $x, y$

证明：由欧几里得算法知上两式相等，移相整理后可得 $x=y'-a\lfloor\frac{b}{a}\rfloor, y=x'$





#### 裴蜀定理

设$a, b\in Z$，则存在$x, y\in Z$，使得 $ax+by = gcd(a, b)$

证明：由扩展欧几里得算法直接得到



推论：对任意 $k\in Z$，均存在 $x, y\in Z$，使得 $gcd(a, b)\mid (ax+by)$，且 $|ax+by|$ 的最小非零值为 $gcd(a, b)$

证明：前半句由裴蜀定理直接得到，后半句则因为 $ax+by = \lambda_a gcd(a, b) \cdot x + \lambda_b gcd(a, b)\cdot y =(\lambda_a x + \lambda_b y)\cdot gcd(a, b)$，即总是 $gcd(a, b)$ 的倍数



### 欧拉函数与欧拉定理

#### 欧拉函数

欧拉函数：$\varphi(n)$ 代表「小于 $n$ 的正整数中和 $n$ 互质的数」的个数

**定理**    若 $(m, n)=1$，则 $\varphi(mn)=\varphi(m)\varphi(n)$

**证明**    令所有小于 $m$ 且与 $m$ 互质的正整数组成的集合为 $\Phi(m)$，也称为**最小正缩剩余系（Least Positive Reduced residue system）**，定义如下函数
$$
\begin{aligned}f:\Phi(m)\times \Phi(n) &\to \Phi(mn) \\(r, s)&\mapsto syn+rxm \bmod mn\\\end{aligned}
$$
其中$x, y$ 满足 $xm+ yn=1$（裴蜀定理）。易证此函数是双射的，而显然 $\varphi(x)=|\Phi(x)|$，于是 $\varphi(mn) =\varphi(m)\varphi(n)$



**推论**    $\varphi(n) = n \prod\limits_{p\mid n} \left(1-\frac{1}{p}\right)$，其中 $p$ 为质数

**证明**    易知若 $p$ 为质数，则 $\varphi(p^k)=p^k-p^{k-1}$，再结合上述定理质因子分解一下即可。也可以由[循环群的性质](#循环群)直接证明。



#### 欧拉定理

引理：若 $ac \equiv bc \bmod m$，则 $a \equiv b \bmod \frac{m}{gcd(m, c)}$

证明：由第一式得 $ac-bc=km$，两边同除 $gcd(m, c)$ 得 $a\lambda_c - b \lambda_c = k \lambda_m$，其中 $\lambda_c, \lambda_m$ 互质，于是 $k$ 中必含有 $\lambda_c$，再两边同除 $\lambda_c$ 即可证明



定理：若 $a,m$ 互质，则 $a^{\varphi(m)} \equiv 1\bmod m$

证明：令 $x_1, ..., x_{\varphi(m)}$ 为与 $m$ 互质的数，易证 $\{x_i | i = 1, ..., \varphi(m)\}= \{a\cdot x_i\bmod m \mid i = 1, ..., \varphi(m)\}$，连乘起来可得 $\prod x_i \equiv a^{\varphi(m)}\prod x_i \bmod m$，由引理知 $a^{\varphi(m)}\equiv 1 \bmod m$



例：求正整数 $3^{83}$ 的最后两位数，显然模 $100$ 即可



#### 费马小定理

若 $p$ 为素数，则对任意整数 $a$ 有 $a^{p-1} \equiv 1 \bmod p$

证明：欧拉定理中令 $m$ 为素数可得



#### 扩展欧拉定理

$$
a^b = \begin{cases}

\end{cases}
$$





### 线性同余方程

如何求线性同余方程 $ax\equiv c \bmod b$ 的解？

显然，这等价于求解 $ax + by = c$，而由裴蜀定理一节，解存在当且仅当 $c \mid gcd(a, b)$。若有解，可用扩展欧几里得算法得到一组解 $x_0, y_0$，至于如何求出其他所有解，假设存在另外一组解 $x_1, y_1$，则有
$$
\begin{aligned}
\because a(x_0 - x_1) +b(y_0-y_1) = c \\
\therefore a \Delta x + b \Delta y = 0\\
\therefore \Delta y = -\frac{a}{b} \Delta x = \frac{\lambda_a}{\lambda_b}\Delta x
\end{aligned}
$$
两边同除 $gcd(a, b)$ 可得最后一个等号，又因为 $\Delta x,\Delta y\in Z$，于是有 $\Delta x = k\lambda_b, \Delta y = -k\lambda_a, \forall k\in Z$，即得到了通解的表达式。



### 中国剩余定理

定理：同余方程组 $x\equiv a_i\bmod m_i(i=1, ..., n)$ 有解的充要条件是
$$
a_i \equiv a_j \bmod (m_i, m_j), i = 1, ..., n
$$
证明：对 $n$ 用数学归纳法。

当 $n=2$ 时，$x=a_1+k_1 m_1=a_2+k_2 m_2$，再由裴蜀定理可证。

假设当 $n\le k$ 时结论成立，考虑当 $n=k+1$。必要性可由 $n=2$ 的情况直接得到，下证充分性。

先考虑最后两个方程，由归纳假设知存在解 $b$ 使得 $b\equiv a_k\bmod m_k$ 且 $b\equiv a_{k+1}\bmod m_{k+1}$，于是有 $x\equiv b \bmod [m_k, m_{k+1}]$。易证，可将这两个方程合并成一个 $x\equiv b \bmod [m_k, m_{k+1}]$，于是只需证如下
$$
\begin{aligned}
&a_i \equiv b \bmod (m_i, [m_k, m_{k+1}]), i = 1, ..., k-1\\
\iff &a_i \equiv b \bmod [(m_i, m_k), (m_i, m_{k+1})] \\
\impliedby &a_i \equiv b \bmod (m_i, m_k) \,\text{ and }\, a_i \equiv b \bmod (m_i, m_{k+1}) 
\end{aligned}
$$
又因为 $b\equiv a_k \bmod m_k$ 且 $a_i \equiv a_k \bmod (a_i, a_k)$（充分条件），故有最后一行中的第一项 $a_i\equiv b \bmod (m_i, m_k)$，同理可得第二项，于是假设成立，证毕．（上述推导过程中用到的一些关于 gcd/lcm 的小定理可以自行证明一下）

注意到证明过程同时给出了求解过程，即每次取出两个方程求解（扩展欧几里得算法）、合并成一个，然后递归求解．



众所周知的**中国剩余定理（Chinese Remainder Theorem）**就是上述定理中模数互质的特例。不过我们可以直接写出表达式，令 $M_i = \frac{\prod m_k}{m_i}$，$y_i = M_i^{-1}\bmod m_i$（注意到 $(M_i, m_i)=1$，故逆元必存在），此时通解为 $x=\sum a_i M_i y_i + k[m_1, ..., m_n],\forall k\in Z$



例：证明 $\sum_{i=1}^{2016} i^{2016} \equiv 48 \bmod 2016$



### Lucas 定理

TODO



### 原根

由裴蜀定理，$\exists d\in N, a^d\equiv 1\bmod m\iff (a, m)=1$，称 $d$ 为 $a$ 模 $m$ 的阶

考虑模 $m$ 的既约剩余系 $G=\{x\mid(x, m)=1, x\in [0, m)\}$，即所有小于 $m$ 且与 $m$ 互质的正整数，显然 $|G|=\varphi(m)$。其生成元称为 $m$ 的原根（原根有可能不存在）

上述以 $a$ 为生成元的 $d$ 阶循环群是其子群，由定理「元素的阶必是群阶因子」知， $d\mid \varphi(m)$。



定理：若 $m$ 存在原根，则 $m$ 一定是下列形式 $2, 4, p^k, 2p^k$，其中 $p$ 为奇素数

TODO



### 二次剩余

**定义**    





### 数论函数与积性函数

**定义**    定义域为正整数（值域通常为复数）的函数 $f: N \to C$ 称为**数论函数（Number Theoretic Function）**．

**定义**    若数论函数 $f$ 满足，对任意互质的 $m,n$ 有 $f(mn)=f(m)f(n)$，则称为**积性函数（Multiplicative  Function）**．

**定理**    若$f$ 是积性函数，则 $F(n)=\sum_{d|n} f(d)$ 也是积性函数．



### 莫比乌斯反演

**定义**    $\mu(n)$

**定理**    $F(n), f(n)$ 是定义在非负整数集合上的函数，且满足 $F(n)=\sum_{d|n} f(d)$，则 $f(n)=\sum_{d|n} \mu(d) F(\frac{n}{d})$

**证明**

Pocklington 定理





### 代码实现

```c
int gcd(int a, int b) {
    return a ? gcd(b%a, a): b;
}
```





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

