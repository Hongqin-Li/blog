+++
tags = ["greedy", "divide-and-conquer", "notes"]
+++

# 算法笔记

> 2020春算法设计与分析课程笔记，教材为算法导论（CLRS）和 Algorithm Design（K&R），此部分包括复杂度分析、贪心、分治、P/NP、NPC问题、近似算法、随机算法、局部搜索，其他部分见[图论笔记](graph)、[动态规划笔记](dp)，通过大量例子来学习算法的设计、正确性证明、复杂度分析。

题型：9题左右

1. 判断题
2. 问答题（复杂度，递归式的复杂度、master）
3. 设计算法、证明NPC



复习进度：分治、贪心、最短路、网络流（分点、超级源超级汇、Baseball Elimination）、近似算法、随机算法、局部搜索



## 复杂度分析

求解方程的三种常用方法：主定理（Master Theorem），递归树，数学归纳法

主定理（可用递归树方法证明）：$T(n)=aT(n/b)+f(n)$的解，其中$a\ge 1, b>0, f(n)\ge 0$

1. 若$\exists \epsilon>0,f(n)=O(n^{log_b a-\epsilon})$，则$T(n)=\Theta(n^{\log_b a})$
2. 若$f(n)=\Theta (n^{log_b a})$，则$T(n)=\Theta(n^{\log_b a} \log n)$
3. 若$\exists \epsilon > 0, f(n)=\Omega(n^{log_b a+\epsilon})$，且$\exists c>0,n_0> 0 ,\forall n > n_0, af(n/b)\le cf(n)$，则$T(n)=\Theta(f(n))$



## 贪心

### Interval Scheduling

给定n个区间，不相交区间数最多有几个

算法：按右端点排序后尽可能地加入即可

正确性证明：考虑算法所得区间集合和最优区间集合（排序后），不妨设算法所得前r个区间同最优解，而第r+1个区间和最优解不同，则由算法过程可知，此区间的右端点必早于最优解的第r+1个区间，于是我们可以替换掉最优解中这个区间而得到一个不差的解。

### Interval Partitioning

给定n个课的时间区间，如何安排排课所需教室最少

按左端点排序后依次加入，遍历当前所有教室，若可以排则排，否则添加一个新教室排进去。

正确性证明：

TODO

### Scheduling to Minimize Latency

给定n个工件，工件i有加工所需时间$t_i$和交工DDL时间$d_i$，若其开始时间为$s_i$，则延迟定义为$l_i=\max(s_i +t_i-d_i, 0)$，求这些工件的一个排序，使得所有工件的延迟的最大值最小

算法：DDL优先

正确性证明（相邻交换法）：考虑相邻两个工件i, j，令$s=\min(s_i, s_j)$，考虑这两个工件的延迟的最大值，令i在j前时和i在j后时分别为$l_1, l_2$，易知

$$
\begin{aligned}
l_1 &= \max(0, s + t_i - d_i, s_i + t_i + t_j - d_j)\\
l_2 &= \max(0, s + t_j - d_j, s + t_i + t_j - d_i)\\
\end{aligned}
$$

若$d_i < d_j$，显然$l_1 \le l_2$，即i在j前更优。



## 分治

归并算法、求逆序对数、和最大的连续子数组略，易证$O(n\log n)$

### 随机化快排

复杂度显然为$O(n\log n)$

证明：令$T(n)$为规模n的随机化快排时间期望

$$
\begin{aligned}
T(n) &= \begin{cases}
T(0) + T(n-1) + \Theta(n)\\
T(1) + T(n-2) + \Theta(n)\\
...\\
T(n-1) + T(0) + \Theta(n)\\
\end{cases}\\
&= \frac{1}{n}\left[\sum_{i=0}^{n-1} T(i) + T(n-1-i)\right] + \Theta(n) \\
&= \frac{2}{n}\sum_{i=0}^{n-1} T(i) + \Theta(n) \\
&= \frac{2}{n}\sum_{i=2}^{n-1} T(i) + \Theta(n) \\
\end{aligned}
$$

其中第二行用了期望的线性性，第四行将 $T(0)$ 和 $T(1)$ 归入了$\Theta(n)$。之后用代换法可以证明，其中求和$\sum i \log i$用黎曼上和不等式即可。



### 最近点对问题

问题：给定二维平面上的n个点的坐标，求点对之间欧式距离的最小值

分治算法：

1. 先按x排序，用直线$x=x_0$平面切成点数几乎相同的左右两部分，令$\delta$为这两个部分的最近点对距离的最小值。接下来只需考虑一点在左平面，一点在右平面的点对情况。易证，只需在直线$x=x_0 \pm \delta$之间寻找即可。若将这其中的区域用$\frac{\delta}{2}$边长的正方形平铺（即每行4个，恰2个在左平面，2个在右平面），易证，每一个小正方形内至多有1个点，且相隔2行以外的点距离大于必$\delta$，不用考虑之。
2. 于是将直线$x=x_0 \pm \delta$之间的点按y排序，对于每个点，考虑其和之后11个点的距离即可（11其实可以更小）。排序可以在一开使完成，或由子调用完成。

用主定理易知得$T(n)=n\log n$

O(n)算法见随机算法一节



### 整数乘法

计算两个n位整数$x, y$的乘法，令x的高低$\frac{n}{2}$位为$x_1, x_0$，y的高低$\frac{n}{2}$位为$y_1, y_0$，可知
$$
\begin{aligned}
xy = 2^n x_1 y_1 + x_0 y_0 + 2^n\left[(x_0+y_0)(x_1 + y_1) - x_1 y_1 - x_0 y_0\right]
\end{aligned}
$$
于是只需要计算三次乘法即可，即$T(n)=3T(n/2)+O(n)$，解得$T(n)=n^{\log_2 3}$



### 矩阵乘法

Strassen’s algorithm



非2次幂的情况可以补零至2次幂



### FFT

在$O(n\log n)$的时间内计算两个n次多项式的乘积，由于多项式相乘本质上是一个卷积，故也可在$O(n\log n)$时间内计算卷积。其基本步骤如下

1. 将n-1次多项式$A(x), B(x)$补零至2n-1次多项式$A'(x), B'(x)$
2. 用DFT计算$A'(w_{2n}^{i}), B'(w_{2n}^{i}), i = 0, ..., 2n-1$
3. 计算$C(w_{2n}^i)=A'(w_{2n}^i)B'(w_{2n}^i)$
4. DFT反变换得到$C(x)=A(x)B(x)$的系数



其中DFT及其反变换可用FFT算法在$O(n\log n)$时间内完成，于是总复杂度为$O(n\log n)$



## P/NP/NPC

概念

- P：多项式求解，P=co-P
- NP：多项式验证
- NPC：任意一个NP问题都能多项式规约于一个NPC问题
- NP-hard



### NPC问题

Circuit-SAT：NPC，证略

3-SAT问题：由n个元素构成的含k个三元子句的合取范式，能否为真？从Circuit-SAT规约

#### 最大团问题

是否存在顶点数大于等于k的完全子图，从3-SAT规约

#### 独立集问题

是否能找到顶点数大于等于k的独立集（所有点互不相连），从3-SAT规约（每个子句一个三角形，互补字连边）

#### 顶点覆盖问题

能否找到顶点数大于等于k的顶点覆盖（用顶点覆盖所有边），从独立集问题规约

顶点覆盖和独立集问题的关系：V-顶点覆盖=独立集

顶点覆盖和最大团问题的关系：若G有一个点数为k的团$V'$，则$V-V'$是一个G的补图$\bar G$中的顶点覆盖

#### 集合覆盖问题

给定集合的若干个子集，能否用其中的k个子集覆盖原集合，从顶点覆盖规约



#### 子集和问题

从3-SAT规约

| -      | x    | y    | C1   | C2   |      |
| ------ | ---- | ---- | ---- | ---- | ---- |
| x      | 1    |      |      | 1    | 1001 |
| ~x     | 1    |      | 1    |      | 1010 |
| y      |      | 1    | 1    |      | 0110 |
| ~y     |      | 1    |      | 1    | 0101 |
|        |      |      | 1    |      |      |
|        |      |      |      | 1    |      |
| 目标值 | 1    | 1    | 3    | 3    |      |



哈密顿回路/路径问题：从3-SAT的规约（欧拉回路/路径属于P）

TSP问题：从哈密顿回路规约（显然）

3DM：从3-SAT规约

划分问题：从子集和问题规约

背包问题的判定形式（总价值能否大于等于某个值）：从子集和问题规约，对于每个子集，加入一个权重=价值=子集大小的背包。总权重约束=目标价值=目标子集和


顶点覆盖、独立集、集合覆盖之间的互相规约

#### 其他

Hitting Set Problem：从顶点覆盖规约

[Dominating Set Problem](https://en.wikipedia.org/wiki/Dominating_set)：用顶点覆盖所有顶点，从集合覆盖规约



## 近似算法

概念：

PTAS is an algorithm which takes an instance of an optimization problem and a parameter ε > 0 and, in polynomial time, produces a solution that is within a factor 1 + ε of being optimal (or 1 − ε for maximization problems)

FPTAS (fully polynomial-time approximation scheme), which requires the algorithm to be polynomial in both the problem size n and 1/ε



### Load Balancing

问题：有m台机器$M_1, ..., M_m$，n个任务所需时间分别为$t_1, ..., t_n$，我们需要将每个任务都分配到其中一台机器上， 使得$T = \max\limits_{\text{machine }M_i} \sum\limits_{\text{jobs assigned to Mi}} t_j$最小

2近似算法：每次将一个任务加入当前负载最小的机器上

证明2近似：令$T_i$为算法最终得到的机器$M_i$上的负载，$T^*$为最优解。不妨设最终$M_1$负载最大，最后一个加入的任务为$t_1$。显然$T^* \ge \frac{\sum t_i}{m}$且$T^* \ge t_i, \forall t_i$。又$T_1 - t_1 \le T_i$（最后一个任务加入到当前最小负载的机器$M_1$），将m个等式相加后得$m (T_1 - t_1) \le \sum t_i$，即$T_1 \le \frac{\sum t_i}{m} + t_1 \le 2T^*$



### Center Selection

TODO



### 最小加权集合覆盖

U为元素全集，$S_i$为U的权值$w_i$的子集

贪婪，每次加入一个增益$\frac{w_i}{|S_i \cap R|}$最小的集合

证明logn近似：令在算法选择集合$S_i$后，我们让所有新增的元素$s$的代价为$c_{s} = \frac{w_i}{|S_i \cap R|}$，

若算法过程中选择了集合$S_i$，则

显然有

$w^* =\sum\limits_{S_i \in C^*} w_i\ge \sum\limits_{S_i \in C^*} \frac{1}{H(d^*)} \sum\limits_{s\in S_i} c_s\ge \frac{1}{H(d^*)} \sum\limits_{s\in U}c_s = \frac{1}{H(d^*)}\sum\limits_{S_i\in C} w_i$

TODO



### 子集和问题

TODO CLRS



### 最小顶点覆盖

2近似算法：每次选择一条边，加入边上两端点，并排除这两端点覆盖的其他边

证明2近似：

令$A$为该算法所选边集，$C^*$为最优顶点覆盖，$C$为该算法所得顶点覆盖。显然$|C| = 2|A|$，又对于每个顶点覆盖，A中每一条边至少被一个顶点覆盖，故$|C^*| \ge |A| =\frac{|C'|}{2}$。



### 背包问题

这里指背包问题的判定形式

由于背包问题的复杂度为$O(VW)$和输入规模有关，考虑通过缩放来减少输入规模

近似算法：令缩放参数$\theta=\epsilon v_{max} / n$，$\overline{v_i} = \lceil \frac{v_i}{\theta}\rceil \theta$，$v'_i = \lceil \frac{v_i}{\theta}\rceil$，显然用$\overline {v_i}$求得的解和$v’_i$相同，直觉上，用其来求解背包可近似最优解。显然算法复杂度为$O(\frac{n^3}{\epsilon})$。

证明FPTAS：令$S^*$为任意解，$S$为算法所得解，可以证明$\sum\limits_{i\in S^*} v_i \le \sum\limits_{i\in S^*} \overline v_i \le \sum\limits_{i\in S} \overline v_i \le \sum\limits_{i\in S}( v_i + \theta) \le \sum\limits_{i\in S} v_i + n\theta \le (1+\epsilon) \sum\limits_{i\in S} v_i$



### TSP

TSP问题：在一个带**非负**边权的**完全图**上寻找最短哈密顿回路（可以通过加上边权为无穷大的边来得到完全图）



边权是否满足三角不等式$c(u, v) + c(v, w) \le c(u, w)$？若不满足，则不存在常数近似算法，除非P=NP

证明：对于一个TSP问题的多项式时间的$\rho$ 近似算法，将任意哈密顿回路问题规约为TSP问题，只需令$c(u, v)  =\begin{cases} 1,& (u, v)\in E\\ \rho |V|, &\text{else} \end{cases}$。



近似算法（满足三角不等式的情况下）：任意选一点为根，跑MST算法得到一棵MST，其前序遍历走过+回溯的节点访问顺序去掉之前出现过的，即为输出

证明2近似：令$c(X) = \sum_{(u, v)\in X} c(u, v)$，最小生成树为$T$，其前序遍历时走过+回溯的边为$W$，算法所得解为$H$，最优解为$H^*$。显然有$c(T)\le c(H^*)$和$c(W) = 2c(T)$，易证$c(H)\le c(W)$（根据三角不等式）。故为2近似

2近似可以再优化？TODO



### 最小加权顶点覆盖

近似算法思路：用线性规划（LP）近似

先转化为01整数规划（0-1 integer program），令$x(v)=0\text{ or }1$表示是否选则点v，如下

$$
\begin{aligned}
\min & \sum_{v\in V} w(v)x(v)\\
\text{subject to}\\
&x(u) + x(v) \ge 1,  &\text{for each }(u, v)\in E\\
& x(v) \in \{0, 1\}, &\text{for each } v\in V 
\end{aligned}
$$

再将$x(v)\in \{0, 1\}$的整形变成$0\le x(v)\le 1$的连续值，求解此线性规划问题，得到解$\bar x(v),v\in V$。若$\bar x(v) >= \frac{1}{2}$，则选择这个点加入$C$。输出最终得到的$C$。

证明$C$是顶点覆盖：

因为对于任意$(u, v)\in E$，$\bar x(u)+\bar x(v)\ge 1$，可知uv中至少有一个$\ge \frac{1}{2}$，即至少有一个被选上，故为顶点覆盖

证明2近似：

令$z^*=\sum w(v) \bar x(v)$是线性规划得到的解，令$C^*$为最优顶点覆盖，令$w(C) = \sum_{v \in C} w(v)$，易证$2z^* \ge w(C)$（将$z^*$拆成两个求和，选入的和未选入的，再对比一下），又$w(C^*) \ge z^*$（最顶点覆盖的01整数规划解也是线性规划的可行解）。

### 其他

Weighted Hitting Set Problem：是$b=\max_i |B_i|$近似，类似加权顶点覆盖



## 局部搜索

模拟退火（Simulated Annealing，SA）：梯度下降时加入随机因素，期以跳出局部最优点

禁忌算法（Tabu Search，TS）：标记已得到得局部最优解，在之后的迭代中避之。



顶点覆盖局部搜索算法：邻居是加入或删除一个顶点的顶点覆盖，算法可以任意差

### 最大割

单移动算法：从任意割开始，每次（从A到B或从B到A）移动一个可以得到更优解的点

证明2近似：令算法得到割$(A, B)$，最大割为$(A^*, B^*)$，令$w(A, B) = \sum\limits_{a\in A, b\in B} w(a, b)$

由局部最优可知，把A中任意一点$a_0$移动到B中不会增大割，即移动后增加量小于减少量，即

$$
\sum_{a\in A} w(a, a_0) \le \sum_{b\in B} w(a_0, b)
$$

对所有$a_0$相加后得
$$
\sum_{a_i, a_j \in A} w(a_i, a_j) \le \sum_{a\in A, b\in B} w(a, b)=w(A, B)
$$

同理，对B有$\sum_{b_i, b_j \in B} w(b_i, b_j) \le w(A, B)$。

又因为最大割必然小于等于所有边权和，故有
$$
w(A^*, B^*)\le \sum w(u, v) = \sum w(a_i, a_j) + \sum w(b_i, b_j) + w(A, B) = 2w(A, B)
$$



### Nash平衡

组播传输问题：给定一个带边权（边e的费用记为$c_e$）的图$G = (V, E)$、一个源s和若干个汇$t_1, ..., t_k$，代理j必须构建一条从s到$t_j$的路径。费用均摊，即若有x个代理都用了边e，则每人在此边上付费$\frac{c_e}{x}$。如何使总费用最小？

如果每个代理都无法通过他**单方**的改变，而减少费用，此局部搜索算法的解称为Nash平衡，而最优解称为*社会最优*。显然这个Naive的局部搜索的方法，但不保证有限步终止。

为了刻画Nash平衡和最优解的距离，定义*稳定代价*（Price of stability）为最优Nash平衡和最优解的比值



### Maximum Leaf Spanning Tree

TODO

https://www.cs.cmu.edu/afs/cs/academic/class/15854-f05/www/scribe/lec05.pdf



### 其他

N-皇后问题（N×N棋盘中放置N个皇后，其中两两都不在同一行/列/斜线上）局部搜索算法：注意到解为一个排列$\pi_i \in \{1, 2, ..., N\}$表示第i行的皇后在第$\pi_i$列，这样就只需考虑斜线的冲突了。于是可以每次随机产生一个排列，并遍历每一对i, j，若交换$\pi_i, \pi_j$冲突更少，则交换，若遍历完后仍存在冲突，则重新产生一个排列。

3-SAT局部搜索算法：TODO



## 随机化算法

令最优化问题的最优解为$C^*$，随机化算法得到的解为$C$，若对任意规模为n的输入都有 $\max (\frac{C^*}{C}, \frac{C}{C^*})\le \rho(n)$，则称其为随机化$\rho(n)$算法（Randomized $\rho(n)$-approximation algorithm）



### MAX-3-SAT

3-SAT问题的基础上，找到能使最多子句为真的赋值。随机化算法为对每个字进行随机赋值，一半概率为真，一半概率为假，易知每个子句为真的概率为$X_i \ge 1 - \left(\frac{1}{2}\right)^3 = \frac{7}{8}, \forall i$，不等是因为子句中可能有互补的字。故真子句个数的期望 $E\left[\sum_{i=1}^{n} X_i\right]\ge\frac{7n}{8}$。所以是随机化$\frac{8}{7}$近似

 

### Contention Resolution

争端解决问题为给定n个进程$P_1, ..., P_n$，若在一时刻内有两个或以上进程请求调用数据库，则在那个时刻的所有进程都被锁定，如何调度？限制是进程间不能通信。

算法：每个进程在每个时刻都以$\frac{1}{n}$的概率请求数据库

首先分析可得$(1-\frac{1}{n})^{n-1}$在$(2,+\infin)$单调递减，端点值分别为$\frac{1}{2}, \frac{1}{e}$。而$(1-\frac{1}{n})^n$在$(2, +\infin)$单调递增，端点值为$\frac{1}{4}$和$\frac{1}{e}$。

令$S[i, t]$为进程i在时刻t成功调用数据库，易知$P\{S[i, t]\} = \frac{1}{n}\left(1-\frac{1}{n}\right)^{n-1}$，求导分析后可知$(1-\frac{1}{n})^{n-1}$在$[2, +\infin)$之间单调递减，于是有$\frac{1}{en}\le P\{S[i, t]\} \le \frac{1}{2n}$。

令$F[i, \tau]$为进程i在$[1, \tau]$时刻中都没有成功调用数据库，于是$F[i, \tau] = (1-S[i, t])^\tau \le (1-\frac{1}{en})^{\tau}$。

令$\tau=en$，有$F[i, en] \le (1 - \frac{1}{en})^{en} \le \frac{1}{e}$，令$\tau = en c \log n$，有$F[i， enc\log n]\le (1-\frac{1}{en})^{enc\log n} = \left[(1-\frac{1}{en})^{en}\right]^{c\log n} \le e^{-c\log n} = n^{-c}$

故令$\tau_0 = 2en\log n$可知，在$[1, \tau_0]$时刻内至少有一个进程失败的概率为$\cup_i P[F[i, \tau_0]] \le \sum_i P[F[i, \tau_0]] \le n n^{-2} = \frac{1}{n}$



### Global Minimum Cut

给定无向图，求其全局最小割（全局是指源和汇可以任意）

算法：基于并查集，每次随机选取一条边$(u, v)$，合并包含uv的两个连通块，并去除其自环边，直到连通度为2

**定理**  该算法能求得最小割的概率至少为$\frac{2}{n(n-1)}$

**证明**  令n为原图顶点数，F是全局最小割边集，$|F|=k$，$X_i$为第i轮循环中选择的边不在F中的事件，令$V_i, E_i$分别是第i轮循环中的连通块个数和边数。在第i轮循环中，因为每次循环连通度减一，故有$|V_i|=n-i$，又每个连通块的度数至少为k（否则与全局最小割为k矛盾），故$|E_i|\ge \frac{k|V_i|}{2}$，所以$P\{X_i\} = 1-\frac{k}{|E_i|} \ge 1-\frac{2}{n-i}$。故能求得全局最小割的概率为

$$
\begin{aligned}
P\{success\} &= \prod_i P\{X_i\} \\
& \ge \prod_{i=1}^{n-3} P\{X_i\} =\frac{n-3}{n-1}\frac{n-4}{n-2}...\frac{1}{3} = \frac{2}{n(n-1)}
\end{aligned}
$$


**推论**  全局最小割数量不超过$\frac{n(n-1)}{2}$

**证明**  令r为全局最小割数量，令$A_i$为算法返回第i个最小割的事件，同上类似可证 $A_i\ge \frac{2}{n(n-1)}$。因为$A_i$之间相互独立，则算法返回任意一个全局最小割的概率为$P\{\cup_{i=1}^{r} A_i\} = \sum A_i\ge r\frac{2}{n(n-1)}$，而概率小于1，故$r\le \frac{n(n-1)}{2}$



### Load Balancing



### 最近点对问题

TODO



### Universal Hashing

考虑到输入有可能被设计成使得hash表处于最坏情况，我们可以**随机选择hash函数**，来保证对于任意输入，都能得到常数的平均时间

key的全集称为$U$，hash函数族$\mathcal H$



### Perfect Hashing

TODO



