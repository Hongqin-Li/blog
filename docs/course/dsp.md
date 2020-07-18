+++
tags = ["math"]
+++

# 数字信号处理笔记

> 这是我在上数字信号处理课程时的笔记，内容包括卷积、各种傅里叶变换(DFS/DTFT/CFS/CTFT/DFT/FFT)、STFT、z变换、线性时移不变系统LTI、语音产生模型、滤波器、DTW、HMM等语音处理相关知识点。

考点：计算、证明

1. 卷积的计算、DTFT计算、N点DFT计算
2. DFT性质，时域卷积频域相乘
3. z变换、反z变换、零点极点，因果性、稳定性
4. LTI的输出等于输入和单位冲激响应的卷积，因果性、稳定性
5. 采样，时域采样=频域周期延拓（有个系数）
6. 滤波器：FIR设计
7. 语音产生模型：LPC/LSP的计算原理、区别、优势，为什么使用LSP
8. 模式识别原理：k-means、VQ、DTW（计算最短路）、HMM（三个问题）



## 信号与系统

### 能量和功率

能量：$\lim_{T\rightarrow\infin} \int_{-T}^{T} |f(t)|^2 dt$

功率：$\lim_{T\rightarrow\infin} \frac{1}{2T}\int_{-T}^{T} |f(t)|^2 dt$

### 信号种类

- 单位冲激函数 $\delta(t)$，单位阶跃函数 $u(t)=\begin{cases} 1, t \ge 0 \\0, t< 0 \end{cases}$
- 单位采样序列 $\delta(n)$，单位阶跃序列 $u(n)$
- 矩形序列 $R_N(n)=\begin{cases} 1, 0 \le n \le N \\ 0, \text{else} \end{cases}$

### 系统

系统可以看作一个运算$T$，$r(t)=T[e(t)]$

- 线性性，$T[k_1 e_1 + k_2 e_2] = k_1T[e_1] + k_2 T[e_2]$
- 时不变性，$r(t) = T[e(t)] \lrArr r(t+\Delta t) = T[e(t+\Delta t)]$
- 因果性，$t_0$ 时刻的响应只取决于 $t\le t_0$ 时刻的输入
- 无记忆性，$t_0$ 时刻的响应只取决于 $t = t_0$ 时刻的输入
- 稳定性，对任意有界输入，都只产生有界输出



## 傅里叶变换

相关推导和性质（卷积和相乘，注意$\frac{1}{T}$）

### CFS

对于周期为$T=\frac{2\pi}{\omega}$的周期函数$f(t)$

$f(t) = \sum\limits_{k=-\infin}^{+\infin} a_k e^{-jkwt}$

$a_k=\frac{1}{T}\int_{T} f(t) e^{-jk\omega t} dt$



### CTFT

就是周期趋于无穷大的CFS，可由CFS推出
$$
\begin{aligned}
f(t) &= \lim_{\omega \rightarrow0} \sum_{k=-\infin}^{+\infin} a_k e^{jk\omega 
t} \\
&= \lim_{\omega \rightarrow0} \sum_{k=-\infin}^{+\infin} \left(\frac{1}{T}\int_{T} f(t) e^{-jk\omega t} dt\right) e^{jk\omega t}\\
&= \frac{1}{2\pi} \lim_{\omega \rightarrow0}  \sum_{k=-\infin}^{+\infin} \omega\left(\int_{T} f(t) e^{-jk\omega t} dt\right) e^{jk\omega t}\\
&= \frac{1}{2\pi} \int_{-\infin}^{+\infin} \left(\int_{-\infin}^{+\infin} f(t) e^{-j\omega t} dt\right) e^{j\omega t} d\omega\\
&= \frac{1}{2\pi} \int_{-\infin}^{+\infin} F(\omega)e^{j\omega t} d\omega\\
\end{aligned}
$$
其中第一行是周期无穷大的CFS公式，第二行将CFS公式的$a_k$代入，第三行将$T=\frac{2\pi}{\omega}$代入，第四行为积分定义，第五行中令$F(w) = \int_{-\infin}^{+\infin} f(t) e^{-j\omega t} dt$



例子：$f(x) = e^{j\omega_0 t}\Leftrightarrow F(\omega) = 2\pi \delta(\omega - \omega_0)$

证明：TODO

### DFS

可由CFS的离散情况推出（周期为N点），因为$e^{jk\omega n}$在离散情况下具有周期性，其他系数归并到了某个$a_k$。

$x[n] = \sum\limits_{k=0}^{N-1} a_k e^{jk\omega n}$

$a_k = \frac{1}{T} \sum\limits_{n=0}^{N-1} x[n] e^{-jk\omega n}$



### DTFT

当N趋于正无穷时的DFS，推导过程类似CTFT（注意到积分区间略有区别，因为CFS和DFS求和区间的不同）

$x[n] = \frac{1}{2\pi} \int_{2\pi} X(\omega) e^{jwn} dw$

$X(\omega) = \sum\limits_{n=-\infin}^{+\infin} x[n] e^{-j \omega n}$



### DFT/FFT

本质上是DFS，令旋转因子$W_{N}^{kn} = e^{-jk\omega n}=e^{-j\frac{k2\pi n}{N}}$

$X_k = \sum\limits_{n=0}^{N-1} x[n] W_{N}^{kn}$

$x[n] = \frac{1}{N}\sum\limits_{k=0}^{N-1} X_k W_{N}^{-kn}$



### FFT

给定N点序列$x[n], n = 0, ..., N-1$，FFT算法会在$O(N\log N)$时间内，给出N点序列$FFT[x]_k = X_k = \sum_{k=0}^{N-1} x[n]W_N^{kn}, k = 0, ..., N-1$

令偶序列和奇序列分别为$x_e[n] = x[2n], x_o[n] = x[2n+1]$，将$X_k$拆成奇偶序列求和后易证 $FFT[x]_k = FFT[x_e]_{k'} + W_N^k FFT[x_o]_{k'}, k = 0, ..., N-1, k' = k \bmod \frac{N}{2}$，引入k'是因为$x_e,x_o$为$\frac{N}{2}$点序列，FFT后得到的是$\frac{N}{2}$点序列。显然，和如下形式等价
$$
\begin{aligned}
FFT[x]_k &= FFT[x_e]_{k} + W_N^k FFT[x_o]_{k}, k = 0, ..., \frac{N}{2}-1 \\
FFT[x]_{k + \frac{N}{2}} &= FFT[x_e]_{k} - W_N^k FFT[x_o]_{k}, k = 0, ..., \frac{N}{2}-1 
\end{aligned}
$$
易知，时间复杂度递归式为$T(N) = 2T(N/2) + O(N)$，类似归并排序，解为$T(N) = O(N\log N)$



### 性质

下面时几个常用性质，只用某种FT做例子，其他的类似可证

DFT：时域**循环卷积**=频域相乘（即通过LTI系统=滤波），画个矩阵图证明即可，同理，时域相乘=频域循环卷积（系数稍有不同 ）

DFT：若$x[n]$为实数序列，则$X_k = \overline{X_{N-k}}$

CTFT：时域相移等于频域位移，$CTFT\left[f(t)e^{j\Delta\omega t }\right] = \int_{-\infin}^{+\infin} f(t) e^{j (\omega + \Delta\omega) t} dt = F(\omega +\Delta\omega)$

DTFT：频域微分，$DTFT\left[ nx[n] \right]= \sum n x[n] e^{-j \omega n} = \sum j\frac{d(x[n] e^{-j\omega n})}{d\omega} = j \frac{dX(\omega)}{d\omega}$



## 理想采样

令原始信号（时域连续）为$x(t)$，采样周期为$T_s = \frac{2\pi}{\omega_s}$，周期性冲激串为 $p(t)=\sum\limits_{k=-\infin}^{+\infin} \delta(t - kT_s)$，显然理想采样后得 $x_p(t) =x(t) p(t) = \sum\limits_{k=-\infin}^{+\infin} x(kT_s) \delta(t-kT_s)$。对$x_p(t)$做CTFT得

$$
\begin{aligned}X_p(\omega) &= \int x_p(t) e^{-j \omega t} dt \\&= \int  \sum\limits_{k=-\infin}^{+\infin} x(kT_s) \delta(t-kT_s) e^{-j \omega t} dt \\&= \sum\limits_{k=-\infin}^{+\infin} \underbrace{x(kT_s)}_{x[k]} e^{-j\omega kT_s} \\\end{aligned}
$$

注意到上式和对样本点$x[k] = x(kT_s)$ 做DTFT的结果$X'(\omega) = \sum x[k] e^{-j\omega k}$ 类似，即$X'(\omega T_s) = X_p(\omega)$，于是，我们可以通过样本点和采样频率，来计算采样后信号的频谱。下面给出特性——**时域采样等于频域的周期延拓**。

**证明**  因为$p(t)$是周期函数，对其求CFS可得$p_k =\frac{1}{T_s}$，即$p(t) = \sum_{k=-\infin}^{+\infin} p_k e^{jk\omega_s t} = \frac{1}{T_s} \sum_{k=-\infin}^{+\infin} e^{jk\omega_s t}$。故有$X_p(\omega) = CTFT[x_p(t)] = CTFT[x(t)p(t)] = CTFT\left[\frac{1}{T_s} \sum\limits_{k=-\infin}^{+\infin} x(t) e^{jk\omega_s t}\right] = \frac{1}{T_s} \sum\limits_{k=-\infin}^{+\infin} X(\omega + kw_s)$，最后一个等号用到了时域相移等于频域位移。





## z变换

本质上是扩展DTFT，各种性质类似傅里叶变换

序列$x[n]$的z变换：$X(z) = \sum\limits_{n=-\infin}^{+\infin} x[n]z^{-n}$，当$z=e^{j\omega}$时为DTFT

收敛域（ROC）为z变换收敛（绝对可和）的z的集合，即 $\left|\sum\limits_{n=-\infin}^{+\infin} x[n]z^{-n}\right|< +\infin$

显然，当收敛域包含单位圆时（$|z|=1$），DTFT存在

### 例子

因果序列$x[n] = \alpha^n u[n]$的z变换：$X(z)=\frac{1}{1-\alpha z^{-1}}, |z| > |\alpha|$

反因果序列$x[n] = -\alpha^n u[-n-1]$的z变换同上，但收敛域不同，$|z| < |\alpha|$

有限长序列$\delta [n-k]$的z变换：$X(z) = z^{-k}$，注意k的正负对于收敛域的影响



### z反变换

暴力解：泰勒展开后用有限长序列的z变换分析



## LTI

线性时移不变系统（Linear, time invariant system）：满足线性性和时移不变性的系统

离散LTI：输入输出信号是离散的LTI，特点是响应只取决于其对单位冲激函数的响应$h[n]=LTI[\delta[n]]$，因为 
$$
\begin{aligned}
y = LTI[x] &= LTI\left[\sum \delta[n-i]x[i] \right] \\
& = \sum x[i] LTI[\delta[n-i]] \\
&= \sum x[i] h[n-i] \\
&= x*h
\end{aligned}
$$
对两边做z变换可得：$Y(z) = X(z)H(z)$。同理，连续LTI很类似。



### 因果性

因果系统（Causal system）：直到有输入才会开始响应

（易证）故LTI系统为因果系统的**充要条件**为 $\forall n < 0, h[n] = 0$，可以发现 $y[n] = \sum\limits_{i=-\infin}^{+\infin } x[i] h[n-i] = \sum\limits_{i=-\infin}^{ n } x[i] h[n-i]$，即输出只取决于之前的输入

推论：LTI系统为因果系统的**充要条件**是单位响应函数的z变换$H(z) $的收敛域包含$+\infin$



### 稳定性

**定理**  LTI系统的稳定性的**充要条件**为单位响应函数绝对可和，即$\sum|h[i]| < \infin$

**证明**  
充分性：任意有界输入$\forall i, |x[i]| < B$，有$y[n] = \sum x[n-i]h[i] \le \sum |x[n-i]| \cdot |h[i]]| \le B \sum|h[i]| < \infin$
必要性：若非绝对可和，即$\sum |h[n]| <\infin$，则可以构造有界输入 $x[n] = \begin{cases} \frac{\overline{h[-n]}}{|h[-n]|}, &h[-n] \ne 0\\0,&h[-n] = 0 \end{cases}$，则代入可得$y[0]=\infin$，即不稳定



**推论**  LTI系统稳定的**充要条件**是$H(z)$的收敛域包含单位圆$|z| = 1$





## 滤波器

令$H(\omega)$为滤波器系统，待滤波信号为$X(\omega)$，则滤波结果为$Y(\omega) = X(\omega)H(\omega)$

- Non-Recursive Filter：输出只和输入有关，即$y[n] = \sum_{i=0}^M b_i x[n-i]$
  - $H(z) = \sum_{i=0}^{M} b_i z^{-i}$ 极点只有一个，即原点，故为稳定系统
  - $h[n] = \begin{cases}b_n,  &0\le n\le M \\ 0,& \text{else}\end{cases}$，响应有限，故也称为FIR
- Recursive Filter：输出还和之前的输出有关，即$y[n] = -\sum_{i=1}^{N} a_i y[n-i] + \sum_{i=0}^{M} b_i x[n-i]$，不妨令$a_0 = 1$，则等价于$\sum_{i=0}^{N} a_i y[n-i] = \sum_{i=0}^{M} b_i x[n-i]$
  - $H(z) = \frac{\sum_{i=0}^{M} b_i z^{-i}}{\sum_{i=0}^{N} a_i z^{-i}} = z^{N-M} \frac{\sum_{i=0}^{M} b_{M-i} z^{i}}{\sum_{i=0}^{N} a_{N-i} z^{i}} $，不一定稳定，需要使所有极点在单位圆内
  - 注意到$H(z)$的第二项为可以用有理分式分解的方法分解，最终可以得到形如 $h[n] = \sum q_i \alpha_i^n u[n]$，即无限响应，故也称为IIR



### FIR

两种FIR

TODO





## 语音产生模型

人的语音有三种：浊音（周期性periodic）、清音（噪声noise）、爆破音（脉冲型implusive）



声带开启和闭合使得气流形成一系列脉冲。开闭周期称为基音周期，其倒数为基因频率，简称基频。

线性产生模型：语音是由气流激励声道，最后从嘴唇或鼻孔、或同时从嘴唇和鼻孔辐射出来形成的，故系统函数为$H(z) = U(z) V(z) R(z)$，由激励模型U、声道模型V、辐射模型R构成。（LTI系统输出的频率响应为输入和系统函数直接相乘，见[LTI](#LTI)一节）

非线性产生模型：调频调幅（AM-FM）模型

### 激励模型

气流激励的表示：单位阶跃脉冲（窄方波）可以表示为$E(z)=\frac{A_v}{1-z^{-1}}$

浊音的基音周期的波形为

$g(n) = \begin{cases}\frac{1}{2}\left[1-\cos (n\pi/N_1)\right], &0\le n< N_1\\ \cos\left(\frac{\pi}{2}\frac{n-N_1}{N_2}\right), &N_1 \le n < N_2 \\ 0,& else \end{cases}$

转换到频率域后，可以发现 $G(z)$ 是个低通滤波器，故通常将其表示成全极点模型 $G(z)=\frac{1}{(1-g_1 z^{-1})(1-g_2 z^{-1})}$，其中$g_1, g_2$接近1。于是气流激励通过浊音激励模型后为$U(z)=E(z)G(z)$，而清音则可以用白噪声序列来表示。

### 声道模型

发元音的声道（全极点模型/级联型共振峰模型）为 $V(z) = \frac{G}{1-\sum a_k z^{-k}}$

非元音和辅音的声道（零极点/并联型共振峰模型）为$V(z) = \frac{\sum b_k z^{-k}}{1-\sum a_k z^{-k}}$

### 辐射模型

辐射效应是指声道输出的速度波，经口唇变成声压。经研究表明，可以表示为一个高通滤波器，$R(z)=1-r_0 z^{-1}$，其中$r_0$接近1



### 调频-调幅模型

一个载波频率fc，频率调制信号为q(t)，由a(t)控制幅值的调制信号为：$r(t) = a(t)\cos [2\pi(f_c\cdot t+\int_0^t q(\tau) d\tau +\theta)]$，易知其瞬时频率为$f_c + q(t)$

这样的$r(t)$可以看作是语音信号中单个共振峰的输出，而语音信号则是若干个共振峰的叠加：$s(t) = \sum r_k(t)$



## 线性预测

问题：如何获得语音产生模型的各种系数？



语音产生模型可以统一简化为$H(z)=\frac{G(1-\sum b_i z^{-i})}{1-\sum a_i z^{-i}}$，既有零点又有极点，按照有理分式的不同，可以分为如下三种信号模型

1. 自回归AR模型：全极点模型，$H(z) = \frac{G}{1-\sum a_i z^{-i}}, s[n] = \sum a_i s[n-i] + G e[n]$，其中$e[n]$是激励输入，$s[n]$是语音输出
2. 滑动平均MA模型：全零点模型
3. ARMA模型



由AR模型启发，线性预测就是用前几个信号的线性叠加来预测下一刻信号，即$\hat s[n] = \sum_{i=0}^{p} \alpha_i s[n-i]$。相应的误差函数为$d[n] = s[n] - \sum_{i=0}^{p} \alpha_i s[n-i], D(z) = 1-\sum_{i=0}^{p} \alpha_i z^{-i}$。注意到误差函数和语音激励输入的相似性（若$\alpha_i = a_i$，则只差个系数$G$），且激励输入在通常情况下也很小（是周期性的单位阶跃脉冲，大部分地方为零），直觉上，在短时区间内最小化误差平方 $D_n = \sum_n d[n]^2$ （n的上下限未定，将导致不同的解法）得到的$\alpha_i$可以逼近$a_i$，于是获得了语音产生模型的系数！上述$\alpha_i$也称为线性预测系数LPC（Linear Prediction Coefficients），具体计算过程如下

求导
$$
\begin{aligned}
\frac{\partial D_n}{\partial \alpha_k} &= -\sum_n 2d[n] s[n-k]\\
&= -2 \sum_n (s[n] - \sum_{i=0}^{p} \alpha_i s[n-i]) s[n-k] \\
&= -2 \left[\sum_n s[n]s[n-k]  - \sum_n \sum_{i=0}^{p} \alpha_i s[n-i] s[n-k]  \right]
\end{aligned}
$$
令其为零可得$\sum_n s[n]s[n-k] = \sum_n \sum_{i=0}^{p} \alpha_i s[n-i] s[n-k]$，令$\phi_{i, j}=\sum_n s[n-i]s[n-j] $，代入有$\phi_{0, k} = \sum_{i=0}^{p} \alpha_i \phi_{i, k}$。显然这是个矩阵方程，可解。



### 线谱对

LSP/LSF（Line Spectral Pairs/Frequencies）线谱对是LPC的另外一种**等价**的表示方式

详细的证明，见[How to prove Line Spectral Pair coefficient properties?](https://dsp.stackexchange.com/questions/49630/how-to-prove-line-spectral-pair-coefficient-properties)和[Line spectrum pair (LSP) and speech data compression](https://pdfs.semanticscholar.org/0617/eafac11593bea2e98a04a2fd091322ff88eb.pdf?_ga=2.14649781.302893674.1591754566-64324825.1591754566)

TODO



## 语音识别

k-means：聚类算法

k-NN：分类算法，选择k个邻居中占多数的那一类作为分类输出

矢量量化（Vector Quantization）算法：TODO



### DTW

DTW（Dynamic Time Wraping）用于解决长短不一的语音信号的匹配度的衡量

问题（不是标准的DTW，有所简化）：给定两个语音信号的特征$\vec X = (x_1, .., x_N)$和$\vec Y = (y_1, ..., y_M)$，以及某个距离度量函数$d(x_i, y_j)$，我们可以计算一个n×m的距离矩阵$A_{ij} = d(x_i, y_j)$，求矩阵中的一条经过的$d(i, j)$之和最短的、从$(1, 1)\rightarrow(N, M)$的路径（位移满足$\Delta i, \Delta j\in \{0, 1\} \text{ and } \Delta i +\Delta j\ge 1$）。

显然可用DP解决，复杂度为$O(NM)$。

这种方法可以用于孤立词识别，给定一个带预测的语音信号的特征，将其和各个词的特征计算DTW，选择路径最短的那个词作为预测结果。



### HMM

本质上是个概率版的有限状态机

令所有输出可能的集合为$V = \{v_1, ..., v_{|V|}\}$，所有状态可能的集合为$S=\{s_1, ..., s_{|S|}\}$，系统在 $t$ 时刻的状态记为$z_t$，输出记为$x_t$。令状态转移矩阵$A_{ij} = P\{s_j|s_i\}$为当前状态为$s_i$时下一状态为$s_j$的概率，令状态输出矩阵$B_{i, x_t} = P\{ x_t = v_k | z_t = s_i\}$为当前状态为$s_i$的情况下输出为$v_k$的概率。$A,B$ 构成了一个HMM模型，有如下三个基本问题：

1.  评估观察序列概率（前向算法）：给定$A,B$，求输出序列$\vec x = x_1, ..., x_T$发生的概率
2. 最佳路径问题（Viterbi算法）：给定$A, B$和输出序列$\vec x$，求最可能的状态序列
3. 模型训练问题（EM算法）：若观测到某个输出序列$\vec x$，求模型参数$A, B$

#### 前向算法

令$\alpha_i = P\{ x_1, ..., x_t, z_t = s_i\}$，显然有$P(x_1, ..., x_t) = \sum_i \alpha_i(t)$，有
$$
\begin{aligned}
\alpha_i(t) &= P\{ x_1, ..., x_t, z_t = s_i\} \\
&= P\{x_t | x_1, ..., x_{t-1}, z_t = s_i\} P\{x_1, ..., x_{t-1}, z_t=s_i\} \\
&= P\{x_t|z_t = s_i\} \sum_j P\{x_1, ..., x_{t-1}, z_{t-1} = s_j, z_t = s_i\} \\
&= B_{i, x_t} \sum_j  P\{z_t = s_i|x_1, ..., x_{t-1}, z_{t-1} = s_j\} P\{x_1, ..., x_{t-1}, z_{t-1} = s_j\} \\
&= B_{i, x_t} \sum_j  A_{ji}\alpha_j(t-1)
\end{aligned}
$$
于是我们可以通过$\alpha_i(t-1)$得到下一时刻的$\alpha_i(t)$（注意初始化$\alpha_i$）最终可以得到$P(x_1, ..., x_T) = \sum_i \alpha_i(T)$

#### Viterbi

令$\beta_i(t) = \max_{z_1, ..., z_{t-1}} P\{x_1, ..., x_t, z_1, ..., z_{t-1}, z_t=s_i\}$，注意max下标只到$z_{t-1}$，可以证明$\beta_i(t) = B_{i, x_t} \max_j \{ A_{ji} \beta_j(t) \}$，于是在每t时刻的最可能的状态为 $\text{argmax}_i \beta_i(t)$



#### Baum-Welch algorithm

也称为 forward-backward algorithm，是EM算法的一种特殊情况

 TODO



## 语音编码

TODO



## Reference

[EECE 301 Signals & Systems  - Flipped](http://www.ws.binghamton.edu/fowler/Fowler%20Personal%20Page/EECE301%20-%20Flipped.htm)

语音信号处理（清华大学出版社）

