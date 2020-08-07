+++
tags = ["greedy"]
+++

# SPOJ-348 EXPEDI - Expedition

A group of cows grabbed a truck and ventured on an expedition deep into the jungle. Being rather poor drivers, the cows unfortunately managed to run over a rock and puncture the truck's fuel tank. The truck now leaks one unit of fuel every unit of distance it travels.

To repair the truck, the cows need to drive to the nearest town (no more than 1,000,000 units distant) down a long, winding road. On this road, between the town and the current location of the truck, there are N (1 <= N <= 10,000) fuel stops where the cows can stop to acquire additional fuel (1..100 units at each stop).

The jungle is a dangerous place for humans and is especially dangerous for cows. Therefore, the cows want to make the minimum possible number of stops for fuel on the way to the town. Fortunately, the capacity of the fuel tank on their truck is so large that there is effectively no limit to the amount of fuel it can hold. The truck is currently L units away from the town and has P units of fuel (1 <= P <= 1,000,000).

Determine the minimum number of stops needed to reach the town, or if the cows cannot reach the town at all.

## Input

The first line of the input contains an integer t representing the number of test cases. Then t test cases follow. Each test case has the follwing form:

- Line 1: A single integer, N
- Lines 2..N+1: Each line contains two space-separated integers describing a fuel stop: The first integer is the distance from the town to the stop; the second is the amount of fuel available at that stop.
- Line N+2: Two space-separated integers, L and P

## Output

For each test case, output a single integer giving the minimum number of fuel stops necessary to reach the town. If it is not possible to reach the town, output -1.

## Sample Input

```
2
4
4 4
5 2
11 5
15 10
25 10
2
3 1
6 2
6 4
```

## Sample Output

```
2
1
```

## Solution

贪心，先让车一直开到没油，然后再从之前已经过的加油站中选一个油最多的加入，直到车的油量大于等于0，然后继续开。复杂度 $O(n\log n)$。

```c++
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e4+3;
int n, l, p;

struct Node {
  int f, d;
  bool operator<(const Node& o) const {
    return f < o.f;
  }
} node[MAXN];

int solve() {
  node[n++] = {0, 0};
  sort(node, node+n, [](Node& lhs, Node& rhs) {
    return lhs.d > rhs.d;
  });
  int cnt = 0, pred = l;
  priority_queue<Node> pq;
  for (int i = 0; i < n; i ++) {
    p -= pred - node[i].d;
    while (p < 0 && pq.size()) {
      p += pq.top().f;
      pq.pop();
      cnt ++;
    }
    if (p < 0) return -1;
    pq.push(node[i]);
    pred = node[i].d;
  }
  return cnt;
}

int main() {
  int nt;
  scanf("%d", &nt);
  while (nt --) {
    scanf("%d", &n);
    for (int i = 0; i < n; i ++) scanf("%d%d", &node[i].d, &node[i].f);
    scanf("%d%d", &l, &p);
    printf("%d\n", solve());
  }
  return 0;
}
```
