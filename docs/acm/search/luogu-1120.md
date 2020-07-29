+++
tags = ["dfs"]
+++

# 洛谷P1120 小木棍

乔治有一些同样长的小木棍，他把这些木棍随意砍成几段，使得每段的长都不超过50。现在，他想把小木棍拼接成原来的样子，但是却忘记了自己开始时有多少根木棍和它们的长度。给出每段小木棍的长度，编程帮他找出原始木棍的最小可能长度。

## Input

共二行。

第一行为一个单独的整数N表示砍过以后的小木棍的总数，其中 $N \le 65$（管理员注：要把超过50的长度自觉过滤掉，坑了很多人了！）

第二行为 $N$ 个用空个隔开的正整数，表示 $N$ 根小木棍的长度。

## Output

一个数，表示要求的原始木棍的最小可能长度

## Sample Input

```
9
5 2 1 5 2 1 5 2 1
```

## Sample Output

```
6
```

## Solution

显然，答案最短为最长段，最长为段总和，一个小优化是，若小木棍总数大于1，则只需考虑到段总和的一半即可。于是我们可以从小到大枚举小木棍的可能值进行暴搜+剪枝。

但是如何剪枝？我们可以反过来思考，考虑某个可行解（小木棍已分好段），对于每个小木棍，我们把其中的段按长度降序排序，而在小木棍之间按最大段长度降序排序。易知，最长段必为第一根小木棍的第一段，同理可证，第i~j根小木棍中的最长段必为第i根小木棍的第一段。

于是可以这么搜，按木棍最大段的顺序进行尝试组装，木棍内按段长度顺序进行组装。需要维护两个值，head为当前木棍的第一段的长度，maxseg为当前木棍中，组装到当前段后，之后段的最大长度。

另一个很重要的优化是，若组装小木棍的最后一段时，失败了，那么也就不必考虑继续往后组装小于此段的段了，直接回溯即可，原因见代码注释。


```c++
#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;
int n, sum, maxa, mina = INF;
int d, cnt[53];

void dfs(int left, int s, int nd, int head, int maxseg) {
  // a new stick
  if (left == 0) {
    nd --;
    if (nd == 1 && s + d == sum) {
      printf("%d", d);
      exit(0);
    }
    if (nd <= 0) return;
    while (cnt[head] == 0) head --;
    cnt[head] --;
    dfs(d - head, s + head, nd, head, head);
    cnt[head] ++;
  }
  else {
    for (int i = min(left, maxseg); i >= mina; i --) {
      if (cnt[i]) {
        cnt[i] --;
        dfs(left - i, s+i, nd, head, i);
        cnt[i] ++;
        if (left == i) break;
        // Or we have some i1 + i2 + ... = left = i,
        // then we can just exchange them with i
        // and get a valid solution
      }
    }
  }
}

int main() {
  scanf("%d", &n);
  for (int i = 0, a; i < n; i ++) {
    scanf("%d", &a);
    if (a <= 50) {
      sum += a;
      cnt[a] ++;
      maxa = max(a, maxa);
      mina = min(a, mina);
    }
  }
  for (int i = maxa; i <= sum/2; i ++) {
    if (sum % i == 0) {
      d = i;
      dfs(0, 0, sum/d+1, maxa, maxa);
    }
  }
  printf("%d", sum);
  return 0;
}
```

