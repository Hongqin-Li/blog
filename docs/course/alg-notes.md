+++
date = 2020-05-06
tags = ["algorithm", "notes"]
+++

# 算法笔记



## DP

TODO



## 最短路径算法

最长路径不具有最优子结构

### Single source shortest path

| 适用情况 | 算法                            | 复杂度           |
| -------- | ------------------------------- | ---------------- |
| 无边权   | BFS                             | $O(V+E)$         |
| 无负边权 | Dijkstra                        | $O(E + V\log V)$ |
| 所有情况 | Bellman-Ford                    | $O(VE)$          |
| DAG      | 拓扑排序 + 1 round Bellman-Ford | $O(V+E)$         |

#### Dijkstra

维护已计算好的最短路径的节点

#### Bellman-Ford

$\delta(s, v_i) = \delta(s, v_{i-1}) + w(v_{i-1}, v_i)$

算法为两层循环

#### Difference constraint

将差分约束方程转换成图，充要条件

- 若负环存在，则无解
- 若负环不存在，则有解（证明：加一个到所有节点的s，令$x_i=\delta(s, v_i)$即可）

于是可用Bellman-Ford来解决

### All-pairs shortest path

| 适用情况  | 算法            | 复杂度                    |
| --------- | --------------- | ------------------------- |
| 无边权    | V次BFS          | $O(VE)$                   |
| 无负边权  | V次Dijkstra     | $O(VE + V^2\log V)=O(VE)$ |
| 所有情况* | V次Bellman-Ford | $O(V^2E)$                 |

判断负环是否存在的两种方法

- 通过判断对角线上是否为负（到自己的路径为负，即负环）
- 在运行一轮算法，若边权改变了，则存在负环

*用以下三种方法来优化适用所有情况的多点源最短路算法

#### Matrix multiplication

DP方程 $d_{ij}^{(m)} = \min \{ d_{ik}^{(m-1)} + a_{kj}\}$

看作矩阵乘法 $D^{(m)} = D^{(m-1)} \otimes A = D^{(0)} \otimes A^{m}$，$D^{(0)} = \left[\begin{matrix} 0 & \infin & \infin \\ \infin & ... & \infin \\ \infin & \infin & 0   \end{matrix}\right]$

用divider-and-conquer做幂运算，复杂度为$O(V^3 \log V)$

- 但不能用Strassen

#### Floyd-Warshall

DP方程：从i到j的只用到前k个点的最短路径长度 $d_{ij}^{k} = \min \left\{ d_{ij}^{k-1}, d_{ik}^{k-1} + d_{kj}^{k-1} \right\}$

复杂度$O(V^3)$

#### Johnson's algorithm

1. 先将所有边权变成非负，即寻找h 使得 $w_h(u, v) = w(u, v) + h(u) - h(v) \ge 0$

   这是差分约束问题 $h(v)- h(u) \le w(u, v)$，可使用 Bellman-Ford 完成或找到负环

   复杂为 $O(VE)$

2. 再用V次Dijkstra算法找到$\delta_h(u, v)$

   复杂度为 $O(VE + V^2\log V)$

3. 由 $\delta_h(u, v) = \delta(u, v) + h(u) - h(v)$ 可反推出$\delta(u, v)$

   复杂度为 $O(V^2)$



故总复杂度为$O(VE + V^2\log V)=O(VE)$



## 网络流

### 概念

- 流、割（点割集）、割集（边割集）、割(A,B)的容量$c(A,B)=\sum_\text{e out of A}c_e$

- 残量网络：为了可以撤销操作

- 最大流、最小割

  

### Ford-Fulkerson

不断增广，直到没有增广路为止

$O(|E|max f) $，f是最大流大小



### 预流推进

TODO

### 题目

- 最小割唯一性，ZOJ 2587
- 平面图最大流
- 超级源和超级汇
- 分点



## P/NP/NPC

- P：多项式求解
- NP：多项式验证
- NPC：任意一个NP问题都能多项式规约于一个NPC问题



### NPC

定点覆盖问题：能否找到顶点数大于等于看的顶点覆盖（用顶点覆盖所有边）

独立集问题：是否能找到顶点数大于等于k的独立集（所有点互不相连）

集合覆盖问题：给定集合的若干个子集，能否用其中的k个子集覆盖原集合

3-SAT问题：由n个元素构成的含k个三元子句的合取范式，能否为真？

Circuit-SAT

哈密顿回路/路径问题：从3-SAT的规约（欧拉回路/路径属于P）

TSP问题：从哈密顿回路规约

3DM：从3-SAT规约

子集和问题：从3-SAT规约

划分问题：从子集和问题规约



顶点覆盖和独立集等价

$\text{Vertex Cover}\le_p\text{Set Cover}$

$\text{3-SAT}\le_p \text{Set Cover}$





## 近似算法

Load Balancing

Center Selection

集合覆盖：logn近似

顶点覆盖



