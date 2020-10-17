+++
tags = ["number theory"]
+++

# NOI-2018 屠龙勇士

小 D 最近在网上发现了一款小游戏。游戏的规则如下：

- 游戏的目标是按照编号 $1 \rightarrow n$ 顺序杀掉 $n$ 条巨龙，每条巨龙拥有一个初始的生命值 $a_i$。同时每条巨龙拥有恢复能力，当其使用恢复能力时，它的生命值就会每次增加 $p_i$，直至生命值非负。只有在攻击结束后且当生命值 恰好 为 $0$ 时它才会死去。

- 游戏开始时玩家拥有 $m$ 把攻击力已知的剑，每次面对巨龙时，玩家只能选择一把剑，当杀死巨龙后这把剑就会消失，但作为奖励，玩家会获得全新的一把剑。

小 D 觉得这款游戏十分无聊，但最快通关的玩家可以获得 ION2018 的参赛资格，于是小 D 决定写一个笨笨的机器人帮她通关这款游戏，她写的机器人遵循以下规则：

- 每次面对巨龙时，机器人会选择当前拥有的，攻击力不高于巨龙初始生命值中攻击力最大的一把剑作为武器。如果没有这样的剑，则选择 攻击力最低 的一把剑作为武器。

- 机器人面对每条巨龙，它都会使用上一步中选择的剑攻击巨龙固定的 $x$ 次，使巨龙的生命值减少 $x \times ATK$。

- 之后，巨龙会不断使用恢复能力，每次恢复 $p_i$ 生命值。若在使用恢复能力前或某一次恢复后其生命值为 $0$ ，则巨龙死亡，玩家通过本关。

那么显然机器人的攻击次数是决定能否最快通关这款游戏的关键。小 D 现在得知了每条巨龙的所有属性，她想考考你，你知道应该将机器人的攻击次数 $x$ 设置为多少，才能用最少的攻击次数通关游戏吗？

当然如果无论设置成多少都无法通关游戏，输出 $-1$ 即可。

## Input

第一行一个整数 $T$，代表数据组数。

接下来 $T$ 组数据，每组数据包含 $5$ 行。

- 每组数据的第一行包含两个整数，$n$ 和 $m$ ，代表巨龙的数量和初始剑的数量；
- 接下来一行包含 $n$ 个正整数，第 $i$ 个数表示第 $i$ 条巨龙的初始生命值 $a_i$；
- 接下来一行包含 $n$ 个正整数，第 $i$ 个数表示第 $i$ 条巨龙的恢复能力 $p_i$；
- 接下来一行包含 $n$ 个正整数，第 $i$ 个数表示杀死第 $i$ 条巨龙后奖励的剑的攻击力；
- 接下来一行包含 $m$ 个正整数，表示初始拥有的 $m$ 把剑的攻击力。

## Output

一共 $T$ 行。

第 $i$ 行一个整数，表示对于第 $i$ 组数据，能够使得机器人通关游戏的最小攻击次数 $x$ ，如果答案不存在，输出 $-1$。

## Solution

显然使用的武器序列是固定的，可用 `std::multiset` 计算。

对于每一头巨龙有 $a_i + y p_i = x ATK_i$，显然合法解可以通过裴蜀定理求得，于是有了 $n$ 个同余方程，exCRT 求解即可。题目中的约束就是 $x, y\ge 0$，于是对于每一个上式，求得满足约束的 $x$（其实就是 $x$ 要大于等于某个值），最后再根据这个约束微调 exCRT 的结果即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const int N = 1e5+3;
const ll INF = 1e18;
int n, m;
ll a[N], p[N], atk[N];

ll pmod(ll a, ll m) {
  return ((a%m) + m) % m;
}

ll qmul(ll a, ll b, ll m) {
  a = pmod(a, m), b = pmod(b, m);
  ll res = 0;
  for (; b; b >>= 1) {
    if (b & 1) res = (res + a) % m;
    a = 2*a % m;
  }
  return res;
}

ll exgcd(ll a, ll b, ll& x, ll& y) {
  if (a == 0) { x = 0, y = 1; return b;}
  ll d = exgcd(b%a, a, x, y);
  ll nx = y-b/a*x, ny = x;
  x = nx, y = ny;
  return d;
}

pair<ll, ll> excrt(vector<pair<ll, ll>>& arg) {
  while (arg.size() > 1) {
    auto p1 = arg.back(); arg.pop_back();
    auto p2 = arg.back(); arg.pop_back();
    if (p2.first < p1.first) swap(p1, p2);

    ll a1 = p1.first, a2 = p2.first, m1 = p1.second, m2 = p2.second;
    ll k1, k2;
    ll d = exgcd(m1, m2, k1, k2);
    if ((a2-a1) % d) return {-1, 0};
    ll m = m1/d*m2;
    ll x = pmod(qmul(qmul((a2-a1)/d, k1, m2/d), m1, m)+a1, m);
    arg.push_back({x, m});
  }
  return arg.back();
}

ll solve() {
  ll l = -INF;
  vector<pair<ll, ll>> arg;
  for (int i = 0; i < n; i ++) {
    ll x, y;
    ll d = exgcd(atk[i], p[i], x, y);
    if (a[i] % d != 0) return -1;
    ll mx = p[i]/d, my = atk[i]/d;
    x = qmul(x, a[i]/d, mx), y = qmul(y, a[i]/d, my);
    arg.push_back({x, mx});

    l = max(l, x);
    if (x * my < a[i]/d)
      l = max(l, x + (a[i]/d - x*my + mx*my - 1)/(mx*my));
  }
  auto p = excrt(arg);
  if (p.first == -1) return -1;
  ll x = p.first, m = p.second;
  ll res = x <= l ? ((l-x+m-1)/m)*m + x: x-((x-l)/m)*m;
  return res;
}

int main() {
  int nt;
  cin >> nt;
  for (int i = 0; i < nt; i ++) {
    cin >> n >> m;
    for (int i = 0; i < n; i ++) cin >> a[i];
    for (int i = 0; i < n; i ++) cin >> p[i];

    multiset<ll> s;
    vector<int> b(n);
    for (int i = 0; i < n; i ++) cin >> b[i];
    for (int i = 0; i < m; i ++) {
      ll x;
      cin >> x;
      s.insert(x);
    }

    for (int i = 0; i < n; i ++) {
      auto it = s.upper_bound(a[i]);
      if (it != s.begin()) it --;
      atk[i] = *it;
      s.erase(it);
      s.insert(b[i]);
    }
    cout << solve() << '\n';
  }
  return 0;
}
```
