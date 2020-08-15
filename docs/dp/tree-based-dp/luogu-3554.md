+++
tags = ["dp"]
+++

# POI-2013 LUK-Triumphal arch

The king of Byteotia, Byteasar, is returning to his country after a victorious battle. In Byteotia, there are $n$ towns connected with only $n-1$ roads. It is known that every town can be reached from every other town by a unique route, consisting of one or more (direct) roads. (In other words, the road network forms a tree).

The king has just entered the capital. Therein a triumphal arch, i.e., a gate a victorious king rides through, has been erected. Byteasar, delighted by a warm welcome by his subjects, has planned a triumphal procession to visit all the towns of Byteotia, starting with the capital he is currently in.

The other towns are not ready to greet their king just yet - the constructions of the triumphal arches in those towns did not even begin! But Byteasar's trusted advisor is seeing to the issue. He desires to hire a number of construction crews. Every crew can construct a single arch each day, in any town. Unfortunately, no one knows the order in which the king will visit the towns. The only thing that is clear is that every day the king will travel from the city he is currently in to a neighboring one. The king may visit any town an arbitrary number of times (but as he is not vain, one arch in each town will suffice).

Byteasar's advisor has to pay each crew the same flat fee, regardless of how many arches this crew builds. Thus, while he needs to ensure that every town has an arch when it is visited by the king, he wants to hire as few crews as possible. Help him out by writing a program that will determine the minimum number of crews that allow a timely delivery of the arches.

给一颗树，1号节点已经被染黑，其余是白的，两个人轮流操作，一开始B在1号节点，A选择k个点染黑，然后B走一步，如果B能走到A没染的节点则B胜，否则当A染完全部的点时，A胜。求能让A获胜的最小的k

## Input

The first line of the standard input contains a single integer $n (1\le N\le 300000)$, the number of towns in Byteotia. The towns are numbered from $1$ to $n$, where the number $1$ corresponds to the capital.

The road network is described in $n-1$ lines that then follow. Each of those lines contains two integers,$a,b(1\le a,b\le N)$, separated by a single space, indicating that towns $a$ and $b$ are directly connected with a two way road.

## Output

The first and only line of the standard output is to hold a single integer, the minimum number of crews that Byteasar's advisor needs to hire.

## Examples

Input:

```
7
1 2
1 3
2 5
2 6
7 2
4 1
```

Output:

```
3
```

## Solution

二分+树形dp好题，二分k，然后判断k是否合法。难点在于怎样 $O(n)$ 地判断是否合法。

我们发现，完成染色有两种方法：一是在国王到达父节点时染，二是在之前某些时候染色次数多余时染。显然，尽可能地用第一种方式。于是我们可以考虑每个节点子树中所缺少的染色次数（需要以法二完成染色），这是一个树形 dp。而如果最终根的这个值仍大于 0 的话，说明某个子树缺少染色点且无法被补上了，于是此 k 不合法。

```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 3e5+3;
vector<int> adj[N];
int k;

int dfs(int u, int fa) {
  int need = 0;
  for (auto v: adj[u])
    if (v != fa) need += dfs(v, u) + 1;
  return max(0, need-k);
}

int main() {
  int n;
  scanf("%d", &n);
  for (int i = 1, u, v; i < n; i ++) {
    scanf("%d%d", &u, &v);
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int l = 0, r = n;
  while (l < r) {
    k = (l+r)/2;
    if (dfs(1, 0)) l = k+1;
    else r = k;
  }
  printf("%d", l);
  return 0;
}
```
