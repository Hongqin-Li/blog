+++
tags = ["number theory"]
+++

# SDOI-2010 古代猪文

iPig 在大肥猪学校图书馆中查阅资料，得知远古时期猪文文字总个数为 $n$。iPig 打算研究古时某个朝代的猪文文字。根据相关文献记载，那个朝代流传的猪文文字恰好为远古时期的 $1/k$，其中 $k$ 是 $n$ 的一个正约数（可以是 $1$ 或 $n$）。不过具体是哪 $1/k$，以及 $k$ 是多少，由于历史过于久远，已经无从考证了。

iPig 觉得只要符合文献，每一种 $k|n$ 都是有可能的。他打算考虑到所有可能的 $k$。显然当 $k$ 等于某个定值时，该朝的猪文文字个数为 $n/k$。然而从 $n$ 个文字中保留下 $n/k$ 个的情况也是相当多的。iPig 预计，如果所有可能的 $k$ 的所有情况数加起来为 $p$ 的话，那么他研究古代文字的代价将会是 $g^p$。

现在他想知道猪王国研究古代文字的代价是多少。由于 iPig 觉得这个数字可能是天文数字，所以你只需要告诉他答案除以 $999911659$ 的余数就可以了。

## Input

一行两个正整数 $n,g(1\le n, g \le 10^9)$。

## Output

输出一行一个整数表示答案。

## Examples

Input 1:

```
4 2
```

Output 1:

```
2048
```

Input 2:

```
5 999911659
```

Output 2:

```
0
```


## Solution

数论好题<del>全家桶</del>

由欧拉定理，原问题等价于 $g^{\sum_{k|n} \binom{n}{k}} \bmod 999911659 = g^{\sum_{k|n} \binom{n}{k} \bmod 999911658} \bmod 999911659$。再将指数项的大模数用 CRT 拆开得

$$
\begin{cases}
x &\equiv a_1 \bmod 2 \\
x &\equiv a_2 \bmod 3 \\
x &\equiv a_3 \bmod 4679 \\
x &\equiv a_4 \bmod 35617 \\
\end{cases}
$$

然后用 Lucas 定理求即可，注意 $g | 999911659$ 的时候要返回 $0$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll M = 999911659;

ll pmod(ll a, ll m) {
  return ((a % m) + m) % m;
}

ll qmul(ll a, ll b, ll m) {
  assert(a >= 0 && b >= 0 && m > 0);
  ll res = 0;
  for (; b; b >>= 1) {
    if (b & 1) res = (res+a) % m;
    a = 2*a % m;
  }
  return res;
}

ll qpow(ll a, ll i, ll m) {
  if (i == 0) return a % m ? 1: 0;
  if (i == 1) return a % m;
  ll b = qpow(a, i>>1, m);
  b = b*b % m;
  if (i & 1) b = b*a % m;
  return b;
}

ll exgcd(ll a, ll b, ll& x, ll& y) {
  if (a == 0) { x = 0, y = 1; return b; }
  ll d = exgcd(b%a, a, x, y);
  ll nx = y-b/a*x, ny = x;
  x = nx, y = ny;
  return d;
}

ll comb(ll n, ll k, ll p) {
  ll res = 1, d = 1;
  for (int i = 0; i < k; i ++) {
    d = d*(i+1) % p;
    res = res*(n-i) % p;
  }
  return res * qpow(d, p-2, p) % p;
}

ll lucas(ll n, ll k, ll p) {
  if (k == 0) return 1;
  return comb(n-k+(k%p), k%p, p) * lucas(n/p, k/p, p) % p;
}

ll crt(vector<pair<ll, ll>>& arg) {
  ll m = 1;
  for (auto p: arg) m *= p.second;
  ll res = 0;
  for (auto p: arg) {
    ll mi = m / p.second;
    ll x, y;
    exgcd(mi, p.second, y, x);
    res = (res + qmul(p.first, qmul(mi, pmod(y, p.second), m), m)) % m;
  }
  return res;
}

vector<int> factor(int n) {
  vector<int> f;
  for (int i = 1; i*i <= n; i ++) {
    if (n % i == 0) {
      f.push_back(i);
      if (i != n/i) f.push_back(n/i);
    }
  }
  return f;
}

int main() {
  ll n, g;
  cin >> n >> g;
  vector<int> ps = {2, 3, 4679, 35617};
  vector<pair<ll, ll>> arg;

  auto fs = factor(n);
  for (auto p: ps) {
    ll sum = 0;
    for (auto k: fs) sum = (sum + lucas(n, k, p)) % p;
    arg.push_back({sum, p});
  }
  cout << qpow(g, crt(arg) % (M-1), M);
  return 0;
}
```
