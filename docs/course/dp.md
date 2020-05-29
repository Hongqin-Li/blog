+++
tags = ["algorithm", "dynamic programming"]
+++

# 动态规划笔记



## 混合背包（01/完全/多重）

例题：[洛谷P1833 樱花](https://www.luogu.com.cn/problem/P1833)

令ci是物品i的费用，wi是物品i的重量，mi是物品i的数量上限（等于1为01背包，等于无穷为完全背包），$f[i][j]$是用费用j拿完前i个物品的最大总重量。直觉上，对每个物品，我们可以考虑其所有可能状态（即拿了0~mi个）即可，于是得到状态方程如下

$f[i][j] = \max\limits_{0\le k \le m_i} f[i-1][j - k\cdot c_i] + k\cdot w_i$ 

经过优化后有（不妨画个图），至于为什么，因为f[j]中包含的之前的对之前的k取max。

01背包：

```pseudocode
for i = 1 to N:
	for j = M to 0:
		f[j] = max(f[j], f[j-c[i]] + w[i])
```



完全背包：

```pseudocode
for i = 1 to N:
	for j = 0 to M:
		f[j] = max(f[j], f[j-c[i]] + w[i])
```



多重背包：

用二进制优化，拆成$O(\log m_i)$ 个01背包即可，因为正整数n可以拆成 $0, 1, 2, 4, ..., 2^{k-1}, n-2^{k} + 1$，其中 $k=\lceil \log (n+1) \rceil - 1$

