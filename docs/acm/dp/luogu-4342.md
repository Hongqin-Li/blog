+++
tags = ["dp"]
+++

# 洛谷P4342 [IOI1998]Polygon

Polygon is a game for one player that starts on a polygon with $N$ vertices, like the one in Figure 1, where $N=4$. Each vertex is labelled with an integer and each edge is labelled with either the symbol + (addition) or the symbol * (product). The edges are numbered from $1$ to $N$.

On the first move, one of the edges is removed. Subsequent moves involve the following steps:

1. pick an edge $E$ and the two vertices $V_1$ and $V_2$ that are linked by $E$; and
2. replace them by a new vertex, labelled with the result of performing the operation indicated in $E$ on the labels of $V_1$ and $V_2$. The game ends when there are no more edges, and its score is the label of the single vertex remaining.

Consider the polygon of Figure 1. The player started by removing edge 3. After that, the player picked edge 1, then edge 4, and, finally, edge 2. The score is 0.

Write a program that, given a polygon, computes the highest possible score and lists all the edges that, if removed on the first move, can lead to a game with that score.

## Input

Your program is to read from standard input. The input describes a polygon with $N$ vertices. It contains two lines.

On the first line is the number $N(3 \le N \le 50)$.

The second line contains the labels of edges $1, \dots, N$, interleaved with the vertices' labels (first that of the vertex between edges 1 and 2, then that of the vertex between edges 2 and 3, and so on, until that of the vertex between edges N and 1), all separated by one space. An edge label is either the letter `t` (representing +) or the letter `x` (representing *).

For any sequence of moves, vertex labels are in the range $[-32768,32767]$.

## Output

Your program is to write to standard output.

On the first line your program must write the highest score one can get for the input polygon.

On the second line it must write the list of all edges that, if removed on the first move, can lead to a game with that score. Edges must be written in increasing order, separated by one space.

## Sample Input

```
4
t -7 t 4 x 2 x 5
```

## Sample Output

```
33
1 2
```

## Solution

区间dp+断环成链模板题

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 53, INF = 1e9;
int v[MAXN*2], e[MAXN*2];
int mi[MAXN*2][MAXN*2], ma[MAXN*2][MAXN*2];

int main() {
  int n;
  char t[5];
  scanf("%d\n", &n);
  for (int i = 0; i < n; i ++) {
    scanf("%s%d", t, v+i);
    e[i] = t[0] == 't' ? 1: 0;
  }
  for (int i = 0; i < n-1; i ++)
    e[n+i] = e[i],  v[n+i] = v[i];

  int nn = 2*n-1;
  for (int i = 0; i < nn; i ++)
    mi[i][i] = ma[i][i] = v[i];

  for (int len = 2; len <= n; len ++) {
    for (int i = 0; i+len-1 < nn; i ++) {
      int j = i + len - 1;
      int ti = INF, ta = -INF;
      for (int k = i+1; k <= j; k ++) {
        if (e[k]) {
          ti = min(ti, mi[i][k-1] + mi[k][j]);
          ta = max(ta, ma[i][k-1] + ma[k][j]);
        }
        else {
          int a = mi[i][k-1]*mi[k][j],
              b = mi[i][k-1]*ma[k][j],
              c = ma[i][k-1]*mi[k][j],
              d = ma[i][k-1]*ma[k][j];
          ta = max({ta, a, b, c, d});
          ti = min({ti, a, b, c, d});
        }
      }
      mi[i][j] = ti, ma[i][j] = ta;
    }
  }

  int score = -INF;
  vector<int> ans;
  ans.reserve(n);
  for (int i = 0; i < n; i ++) {
    if (ma[i][i+n-1] > score) {
      ans.resize(0);
      ans.push_back(i+1);
      score = ma[i][i+n-1];
    }
    else if (ma[i][i+n-1] == score)
      ans.push_back(i+1);
  }
  printf("%d\n", score);
  for (auto i: ans) printf("%d ", i);
    
  return 0;
}
```
