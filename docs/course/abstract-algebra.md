+++
tags = ["math"]
+++


# 進世代數筆記



## 羣

### 基本概念

- 運算：映射$Q: S^n\rightarrow S$定義在集合$S$上的n元**運算**
  - 注意到$Q$的定義域是$S^n$
  - 而值域只能是$S$的一個子集，即運算封閉性

- 代數系統

  - 非空集合$S$和k個定義在$S$上的運算$Q_1, Q_2, ..., Q_k$構成代數系統$[S;Q_1,Q_2, ..., Q_k]$

- 半羣：滿足結合率的代數系統

- 擬羣：含幺半羣

- 羣：每個元素均可逆的擬羣

  - 完整定義：羣是運算封閉、結合率、含幺、元素均可逆的代數系統

  > 若$\exists a'\in G:a'a=1$，稱$a$**左可逆**，$a'$爲$a$的**左逆**，同理可定義**右可逆**和**右逆**
  >
  > 若$x$有左逆$y$和右逆$y'$，則$y'=1\cdot y'=(yx)y'=y(xy')=y\cdot 1=y$，即
  >
  > - 左右逆同時存在，則一定相等
  > - 逆元存在必唯一
- 子羣：羣G的子集且滿足羣的性質的集合稱爲羣G的子羣

  - 證子羣的方法：若$[G;\circ]$爲羣，$H\sube G$，則$H$是$G$的子羣$\Leftrightarrow$運算$\circ$關於H封閉且$\forall h\in H, h^{-1}\in H$

### 元素的階

定義：元素$g$的階$o(g)=\min\limits_{g^i=1} i $

- 證明若$g$是n階元素，則對於任意正整數m，$g^m$的階是$\frac{n}{gcd(m, n)}$



### 陪集分解

$A$爲羣$G$的子羣，定義關系$\sim$，$\forall g, h \in G, g\sim h \Leftrightarrow gh^{-1}\in A$

- 證明$\sim$爲**等價關系**（自反、對稱、傳遞）

- 證明任一元素$g \in G$的等價類是$Ag=\{ag |a\in A\}$，每一個等價類稱爲羣$G$對於子羣$A$的**右陪集**
- 由等價關系的性質知，$\forall g_1,g_2\in G,\ g_1 \ne g_2$，有$Ag_1 \cap Ag_2=\phi$

- $\exists R \subseteq G$，使$\bigcup\limits_{g_i\in R} Ag_i=G $且對$\forall g_i, g_j \in R,  g_i \ne g_j$，有$Ag_i \cap Ag_j=\phi$
  - $\bigcup\limits_{g_i\in R} Ag_i=G $（兩兩不交之並），稱爲$G$對子羣$A$的**右陪集分解**

- 證明$|Ag_i|=|Ag_j|$（消去率）
- 證明拉格郎日定理$|G|=|A|\cdot[G:A]$，其中$[G:A]=|R|$，稱爲子羣$A$對於羣$G$的**指數**
- 任意元素的階均是$|G|$的因子
  - 若羣$G$中每個元素的階均是2，則$G$是Abel羣（交換羣）
  - 素數階的羣$G$均是Abel羣，並且同構於整數模$p$加法羣$Z_p$
  - 非Abel羣的最小階數是6

### 正規子羣

定義：設$H$是$G$的子羣，若$\forall g \in G:gH=Hg$，則稱$H$是$G$的**正規子羣**

等價定義：設$H$是$G$的子羣，若$ \forall g \in G:g^{-1}Hg=H$，則稱$H$是$G$的**正規子羣**

證明：設$H$是$G$的子羣，若$ \forall g \in G, h\in H:g^{-1}hg\in H$，則稱$H$是$G$的**正規子羣**

- 利用消去率證明$|H|=|g^{-1}Hh|$即可

### 商羣

對$G$的某一正規子羣$H$，令$\bar G = \{gH|g \in G\}$，並在$\bar G$上定義$\otimes:aH \otimes bH = (a b) H$

- 證明運算定義的合法性，即若$a'H=aH$，$b'H=bH$，則$a'H\otimes b'H=aH\otimes bH$
  - 先證$aH \otimes bH = (ab) H=abHH \overset{H正規}{=} aHbH$
  - 故若$a'H=aH$，$b'H=bH$，則$a'H\otimes b'H=(a'b')H=a'Hb'H = aH bH=abH=aH\otimes bH$
- 易證$[\bar G;\otimes]$是羣

### 羣同態基本定理

設$\varphi:G\rightarrow G'$是羣的同態，$\mathrm {Im}\varphi=\varphi(G)$稱爲同態$\varphi$的*像*，$\mathrm{Ker}\varphi=\varphi^{-1}(1) = \{g\in G|\varphi(g)=1\}$稱爲同態$\varphi$的*核*，則

- $\mathrm{Im}\varphi=\varphi(G)$是$G$的子羣
- $\mathrm {Ker}\varphi$是$G$的正規子羣
- 且有羣**同構**$\bar\varphi:G/\mathrm{Ker}\varphi \cong \mathrm{Im}\varphi$



證明$G/H\cong G'$的方法

1. 構造**滿同態**$\varphi: G\rightarrow G'$
2. 證明$\mathrm{Ker}\varphi=H$

## 環

> 環中的修飾語一般是對於第二運算而言，如含幺、可逆、交換

- 環
  1. 關於第一個運算$+$爲交換羣（Abel羣）
  2. 關於第二個運算爲半羣（滿足封閉性和結合率）
  3. 滿足左右分配率，即$\forall a, b,c \in R$，有$a(b+c)=ab+ac$和$(b+c)a=ba+ca$

- 整環（*Integral domain*）：無零因子含幺交換環

  > 若$\exists a, b\in R, a, b\ne0:ab=0$，則稱$a$爲環$R$的**左零因子**，$b$爲環$R$的**左零因子**
  >
  > 若$a$既是左零因子，又是右零因子，則稱$a$爲環$R$的**零因子**
  >
  > 若$R$爲交換環，則左零因子、右零因子、零因子這三者是一回事

- 除環（*Division ring*）或體（*Skew field*）：非零元素均可逆的含幺環

  > 若$\exists a'\in R:a'a=1$，稱$a$**左可逆**，$a'$爲$a$的**左逆**，同理可定義**右可逆**和**右逆*
  >
  > 若$a$同時左可逆和右可逆，則$a$的左右逆元相等且唯一，稱$a$爲$R$上的可逆元素，也稱爲**單位**（*unit*）
  >
  > 若$R$爲含幺交換環，則左可逆、右可逆、可逆這三者是一回事

- 域（*Field*）：是體又是交換環

- 環$R$的子集$S$稱爲環$R$的**理想**（*Ideal*）是指滿足如下兩個條件：

  1. $\forall a, b \in S:a\pm b\in S$
  2. $\forall r\in R, a\in S:ar, ra\in S$

- 由集合$X$生成的理想：環$R$中包含$X$的最小理想，記爲$（X）$

  > $$
  > \begin{align}
  > ZX \doteq & \Big \{\sum m_i x_i \mid m_i\in Z^+, x_i \in X\Big\}\\
  > RX \doteq & \Big \{\sum r_i x_i \mid r_i\in R, x_i \in X\Big\}\\
  > XR \doteq & \Big \{\sum x_i r_i \mid r_i\in R, x_i \in X\Big\}\\
  > RXR \doteq & \Big \{\sum r_i x_i r_j \mid r_i,r_j \in R, x_i \in X\Big\}\\
  > X_1 + X_2 +\dots+X_n \doteq & \Big\{ x_1+x_2+\dots+x_n\mid x_i\in X_i, 1\leq i\leq n  \Big\}
  > \end{align}
  > $$
  >
  > 由理想的條件1知$ZX\sube(X)$，由條件2知$RX,XR,RXR\sube(X)$，故$ZX+RX+XR+RXR\sube (X)$。可以驗證$ZX+RX+XR+RXR$是理想，於是有
  > $$
  > (X)=ZX+RX+XR+RXR
  > $$

  - 若$R$是交換環，則$(X)=ZX+RX$
  - 若$R$是含幺交換環，則$(X)=RX$
  - 由整環$R$中任一單位$b$生成的理想$(b)=Rb=\{r_i b = r'_i b^{-1}b=r'_i\mid r_i , r'_i\in R \}=R$

- 主理想：僅由一個元素$x\in R$生成的理想稱爲$R$的**主理想**

- 理想$P$稱爲**素理想**（*Prime ideal*），是指其滿足如下條件：

  - $P$是真理想，即$P\sub R$，且$P\ne R$
  - 若$\forall a, b \in R,ab\in P $，則$a$和$b$至少有一個屬於$P$

- 主理想整環：若$R$是整環，且其每一個理想都是主理想，則稱$R$爲**主理想整環**，簡稱**PID**（*Principal Ideal Domain*）

  - PID中的素理想一定是極大理想
  - 

- 商環

## 域

### 有限域

基本性質

- $F_q=F_{p^n}=F_p(u)=Z_p/(f)$

  - 第一個等號說明了有限域的元素個數的性質，其中$p=\mathrm {char\ } F_{p^n}$，$n$是$u$的擴張次數

  - 第二個等號表示$f\in Z_p(x)$是$n$次首一不可約多項式，$u$是其一根
  - 用兩種方式（乘法循環羣、商環）表示$q$元有限域

- $F_p$是$F_{p^n}$的**素子域**（最小子域）

- $F_q$中的元素均是$x^q-x=0$的根，$F_q^*$中的元素均是$x^{q-1}-1=0$的根

- $x^q-x=\prod\limits_{i=1}^{q}{(x-\beta_i)}=\prod_i{g_i(x)}$

- （求所有本原元）若$\alpha$爲$F_{p^n}$上的一個本原元，則其所有本原元的集合爲$\{\alpha^s|\gcd(s, p^n-1)=1\}$

- $F_{p^n}$上本原元的在$F_p$上的極小多項式是$F_p$上的本原多項式

- $F_p$上$u$的極小多項式爲$f(x)=\prod\limits_{i=0}^{n}(x-u^{p^i})$

- （求所有本原多項式）若$f(x)$是$F_p$上的一個$n$次本原多項式，則$F_p$上所有的$n$次本原多項式的集合爲$\{f(x)=\prod\limits_{i=0}^{n}(x-(\alpha^s)^{p^i})|\gcd(s,p^n-1)=1\}$，其中$\alpha$是$F_{p^n}$的本原元（生成元）

  

#### 有限域的表示形式

我們從任意元的有限域$[F_q;+,\cdot]$開始討論

1. 特征数必为素数，即$\mathrm{char}F_q=p$

   > 否则$p1_F=(p_1p_2) 1_F=p_1 1_F\cdot p_2 1_F=0$，有零因子$p_11_F$和$p_2 1_F$

2. $F_p=\{n\cdot1\mid n=0,1,...,p-1\}$是$F_q$的子域，且是素子域（最小子域）

3. $F_q$必是$F_p$上的向量空間，令其维度爲$n$，則$|F_q|=p^n$，即有限域的元素個數必定是素數的冪次

   > 證明$F_q$必是$F_p$上的向量空間，即**存在**線性無關的一組基$x_i\in F_q, i=1,...,n$，使對$\forall x\in F_q$，存在**唯一**$p_1, p_2, ..., p_n\in F_p$，使得$x=\sum\limits_{i=1}^{n}{p_ix_i}$
   >
   > 1. 存在性：否則對任意一組線性無關的基，存在$x_0 \in F_q$，使對於$\forall p1, p2, ..., pn\in F_p$，有$x_0\ne \sum\limits_{i=1}^{n}{p_ix_i}$，即$x_0$不能被此基表出，於是把$x_0$加入此基當中，基仍線性無關，如是增基，可得線性空間。
   > 2. 唯一性用反證法易證

4. $F_q^*=F_q -\{0\}$關於乘法形成循環羣，即$F_q^*=F_q -\{0\}=\{0, 1, \alpha, ...\alpha^{q-2}\}$，且$|F_q^*|= q - 1$
   > 引理
   >
   > 1. 元素的階整除羣階
   >
   > 2. $n=\sum\limits_{d|n} \varphi(d)$
   >
   >    - $\varphi(d)$的定義是$d$階循環羣的中階恰爲$d$的元素的個數
   >
   >    - 令$G=\{a^1, ..., a^n=1\}$爲$n$階循環羣，則對每個滿足$d|n$的$d$，都存在$d$階循環子羣$S_d=\{a^{\frac{n}{d}}, a^{\frac{2n}{d}}, ...,a^{\frac{dn}{d}}=1\}$，且$G$中的所有$d$階元都在$S_d$中，於是$|G|=n=\sum\limits_{d|n}{\varphi(d)}$
   >
   > 3. $F_q^*$中的$d$階循環子羣唯一，恰爲$x^d-1=0$的$d$個根
   >
   > 
   >
   > 因$F_q^*$中的所有$d$階元均在唯一的$d$階循環子羣中，且個數爲$\varphi(d)$，故$|F_q^*|=\sum\limits_{\mathrm{some\ }d:d|q-1}{\varphi(d)}$
   >
   > 又因$|F_q^*|=q-1$，由*2*，$q-1=\sum\limits_{d|q-1} \varphi(d)$，於是知，$\mathrm{some\ }d$確實能取遍所有整除$q-1$的$d$
   >
   > 於是d能取到$q-1$，而此$q-1$階循環羣即$F_q^*$本身



於是有

> 對於任意域F，階爲n的循環羣$\{1, \alpha, ...\alpha^{n-1}\}$唯一，且滿足
> $$
> x^n-1=\prod\limits_{i=0}^{n-1}(x-\alpha^i)
> $$

循環羣$|F_q^*|$的生成元$\alpha$也稱爲$F_q$的**本原元**（*primitive element*）

>$F_q=\{0, \alpha ^0=1, \alpha^1,..., \alpha^{q-2}\}$中本原元$ \alpha $有如下性質
>
>- 本原元個數爲$\phi(q-1)$，即$Z_{q-1}$中和$q-1$互質的元素的個數
>
>- 所有本原元集合爲$\{\alpha^s|\gcd(s, q-1)=1\}$

又因元素的階是羣階的因子，我們有


$$
a^{|F_q^*|}= a^{\lambda\cdot o(a)}=(a^{o(a)})^{\lambda}=1^{\lambda}=1
$$

因此，$F_q$中的$q$個元素均是$x^q-x=0$的根。而由*代數基本定理*（*Fundamental theorem of algebra*）知，$q$次多項式$x^q-x=0$最多有$q$個根，恰爲$F_q$中的所有元素，於是得到

$$
x^q-x=\prod\limits_{i=1}^{q}{(x-\alpha_i)}
$$
其中的$\alpha_i$滿足
$$
\{\alpha_i|i=1, ..., q\} = F_q
$$


即$\alpha_i$既是根，又是$F_q$中的元素，互異，無重根。我们還可以在$F_q$的素子域$F_p$上分解
$$
x^q-x=\prod\limits_{i}{g_i (x)}
$$
其中
$$
g_i(x)=\prod\limits_{j=1}^{deg(g_i)}{(x-\beta_{ij})}, \beta_{ij}\in F_q
$$
由*唯一因子分解定理*（*unique factorization*），每一個$\alpha_i$只會出現在一個$g_i(x)$中，即對$\forall \alpha_i\in F_q$，能唯一確定$g_i (x)\in F_p[x]$，$g_i(x)$在$F_p$上不可約，且在$F_q$上的因子全然不同。我們把$g_i(x)$稱作$\alpha_i$在$F_p$上的**極小多項式**（*minimal polynomial*）

> $\alpha\in F_{p^n}$在$F_p$上的極小多項式$g(x)\in F_p $有如下性質
>
> - $g(x)$存在且唯一
>
> - $g(x)$是$F_p[x]$中滿足$g(\alpha)=0$的、次數最小的首一多項式
>
>   - 令$g'(x)$是$F_p[x]$中滿足$g(\alpha)=0$的、次數最小的首一多項式
>
>     則由*Euclidean division*知，$\exists k(x), r(x) \in F_p: g(x)=k(x)g'(x)+r(x)$，其中$\mathrm {deg}(r) < \mathrm{deg}(g')$或者$r(x)=0$
>
>     代入$\alpha$得，$r(\alpha)=0$
>
>     $\because g'(x)$次數最小 $\therefore r(x)=0$
>
>     $\because g(x)$不可約且首一 $\therefore g(x)=g'(x)$
>
> - 若$f(x)\in F_p[x]$，且$f(x)$和$g(x)$有公共零點$\beta$，則$g(x) \mid f(x)$
>
>   - 由*Euclidean division*知，$\exists k(x), r(x) \in F_p: f(x)=k(x)g(x)+r(x)$，其中$\mathrm {deg}(r) < \mathrm{deg}(g)$或者$r(x)=0$
>
>     代入$\beta$得，$r(\beta)=0$
>
>     由上述分解過程得知，$g(x)$也是$\beta$的極小多項式，次數最小，於是$r(x)=0$
>
>     即$g(x) \mid f(x)$



### 本原多項式（primitive polynomial）

等價定義

1. 設$g(x)\in F_p[x]$是$n$次不可約多項式，當$k=p^m-1$時，$g(x)\mid(x^k-1)$，當$k < p^n-1$時，$g(x)\nmid(x^k-1)$，稱$g(x)$是$F_p$上的$n$次本原多項式

2. 設$g(x)\in F_p[x]$是$n$次首一不可約多項式，若$g(x)$某一根$u$是域$F_q(u)$的乘法循環羣的生成元時，稱$g(x)$爲$F_p$上的$n$次本原多項式

3. 若$g(x)$是$F_{p^n}=F_q$中某一生成元在$F_p$上的$n$次極小多項式，則稱$g(x)$爲$F_p$上的$n$次本原多項式








#### 求極小多項式

求$\sqrt{3}+ \sqrt5$在Q上的極小多項式

- 通過不斷平方即可

#### 求根域和擴張次數

求$Q$上多項式$x^6-6$的擴張次數

- 因式分解：$x^6-6=(x^3-\sqrt6)(x^3+\sqrt6)=...$
- 或是直接用歐拉公式求得6個根
- 得知須擴張$\sqrt[3]{6}$，次數爲3，再擴張$i$，次數爲2，總共次數爲6

#### 構造有限域

$GF(p^n)=Z_p/(f)=\{(f)+\sum\limits_{i=0}^{n-1}a_i x^i|a_i \in Z_p\}=Z_p(\alpha)$，其中$f$是p次不可約多項式，$\alpha$是$f$的根

- 如何找到不可約n次多項式$f$？先驗證是否有根，再驗證是否能被分解成若幹個不可約多項式。
  - 如驗證$f=x^2+x+1$是否爲$Z_2$上的不可約多項式？
    1. $f(0)=f(1)=1\ne 0$ 故在$Z_2$上無根
    2. 假設可約，則只能分解成兩個一次不可約多項式（僅有$x+1$），而$(x+1)(x+1)=x^2+1\ne f(x)$，故$f(x)$不可約

#### 求所有本原元

暴力即可

#### 有限域中非零元的冪表示

求$GF(9)$中非零元冪表示並化簡

- 構造有限域：$GF(p^n)=Z_p/(f)=\{(f)+\sum\limits_{i=0}^{n-1}a_i x^i|a_i \in Z_p\}=Z_p(\alpha)$，其中$f$是p次不可約多項式，$\alpha$是$f$的根
- 找出一個本原元
- 表出其他元素，並構造運算表

#### 求所有本原多項式





http://www.seanerikoconnor.freeservers.com/Mathematics/AbstractAlgebra/PrimitivePolynomials/theory.html
