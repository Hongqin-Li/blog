(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ddda5"],{"82c8":function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"小 D 最近在网上发现了一款小游戏。游戏的规则如下：","html":"<p>小 D 最近在网上发现了一款小游戏。游戏的规则如下：</p>\\n<ul>\\n<li>\\n<p>游戏的目标是按照编号 <script type=\\"math/tex\\">1 \\\\rightarrow n<\/script> 顺序杀掉 <script type=\\"math/tex\\">n<\/script> 条巨龙，每条巨龙拥有一个初始的生命值 <script type=\\"math/tex\\">a_i<\/script>。同时每条巨龙拥有恢复能力，当其使用恢复能力时，它的生命值就会每次增加 <script type=\\"math/tex\\">p_i<\/script>，直至生命值非负。只有在攻击结束后且当生命值 恰好 为 <script type=\\"math/tex\\">0<\/script> 时它才会死去。</p>\\n</li>\\n<li>\\n<p>游戏开始时玩家拥有 <script type=\\"math/tex\\">m<\/script> 把攻击力已知的剑，每次面对巨龙时，玩家只能选择一把剑，当杀死巨龙后这把剑就会消失，但作为奖励，玩家会获得全新的一把剑。</p>\\n</li>\\n</ul>\\n<p>小 D 觉得这款游戏十分无聊，但最快通关的玩家可以获得 ION2018 的参赛资格，于是小 D 决定写一个笨笨的机器人帮她通关这款游戏，她写的机器人遵循以下规则：</p>\\n<ul>\\n<li>\\n<p>每次面对巨龙时，机器人会选择当前拥有的，攻击力不高于巨龙初始生命值中攻击力最大的一把剑作为武器。如果没有这样的剑，则选择 攻击力最低 的一把剑作为武器。</p>\\n</li>\\n<li>\\n<p>机器人面对每条巨龙，它都会使用上一步中选择的剑攻击巨龙固定的 <script type=\\"math/tex\\">x<\/script> 次，使巨龙的生命值减少 <script type=\\"math/tex\\">x \\\\times ATK<\/script>。</p>\\n</li>\\n<li>\\n<p>之后，巨龙会不断使用恢复能力，每次恢复 <script type=\\"math/tex\\">p_i<\/script> 生命值。若在使用恢复能力前或某一次恢复后其生命值为 <script type=\\"math/tex\\">0<\/script> ，则巨龙死亡，玩家通过本关。</p>\\n</li>\\n</ul>\\n<p>那么显然机器人的攻击次数是决定能否最快通关这款游戏的关键。小 D 现在得知了每条巨龙的所有属性，她想考考你，你知道应该将机器人的攻击次数 <script type=\\"math/tex\\">x<\/script> 设置为多少，才能用最少的攻击次数通关游戏吗？</p>\\n<p>当然如果无论设置成多少都无法通关游戏，输出 <script type=\\"math/tex\\">-1<\/script> 即可。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>第一行一个整数 <script type=\\"math/tex\\">T<\/script>，代表数据组数。</p>\\n<p>接下来 <script type=\\"math/tex\\">T<\/script> 组数据，每组数据包含 <script type=\\"math/tex\\">5<\/script> 行。</p>\\n<ul>\\n<li>每组数据的第一行包含两个整数，<script type=\\"math/tex\\">n<\/script> 和 <script type=\\"math/tex\\">m<\/script> ，代表巨龙的数量和初始剑的数量；</li>\\n<li>接下来一行包含 <script type=\\"math/tex\\">n<\/script> 个正整数，第 <script type=\\"math/tex\\">i<\/script> 个数表示第 <script type=\\"math/tex\\">i<\/script> 条巨龙的初始生命值 <script type=\\"math/tex\\">a_i<\/script>；</li>\\n<li>接下来一行包含 <script type=\\"math/tex\\">n<\/script> 个正整数，第 <script type=\\"math/tex\\">i<\/script> 个数表示第 <script type=\\"math/tex\\">i<\/script> 条巨龙的恢复能力 <script type=\\"math/tex\\">p_i<\/script>；</li>\\n<li>接下来一行包含 <script type=\\"math/tex\\">n<\/script> 个正整数，第 <script type=\\"math/tex\\">i<\/script> 个数表示杀死第 <script type=\\"math/tex\\">i<\/script> 条巨龙后奖励的剑的攻击力；</li>\\n<li>接下来一行包含 <script type=\\"math/tex\\">m<\/script> 个正整数，表示初始拥有的 <script type=\\"math/tex\\">m<\/script> 把剑的攻击力。</li>\\n</ul>\\n<h2 id=\\"output\\">Output</h2>\\n<p>一共 <script type=\\"math/tex\\">T<\/script> 行。</p>\\n<p>第 <script type=\\"math/tex\\">i<\/script> 行一个整数，表示对于第 <script type=\\"math/tex\\">i<\/script> 组数据，能够使得机器人通关游戏的最小攻击次数 <script type=\\"math/tex\\">x<\/script> ，如果答案不存在，输出 <script type=\\"math/tex\\">-1<\/script>。</p>\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>显然使用的武器序列是固定的，可用 <code>std::multiset</code> 计算。</p>\\n<p>对于每一头巨龙有 <script type=\\"math/tex\\">a_i + y p_i = x ATK_i<\/script>，显然合法解可以通过裴蜀定理求得，于是有了 <script type=\\"math/tex\\">n<\/script> 个同余方程，exCRT 求解即可。题目中的约束就是 <script type=\\"math/tex\\">x, y\\\\ge 0<\/script>，于是对于每一个上式，求得满足约束的 <script type=\\"math/tex\\">x<\/script>（其实就是 <script type=\\"math/tex\\">x<\/script> 要大于等于某个值），最后再根据这个约束微调 exCRT 的结果即可。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84\\n85\\n86\\n87\\n88\\n89\\n90\\n91\\n92\\n93\\n94\\n95\\n96\\n97\\n98</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">using</span> <span class=\\"n\\">ll</span> <span class=\\"o\\">=</span> <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">N</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e5</span><span class=\\"o\\">+</span><span class=\\"mi\\">3</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">INF</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e18</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n<span class=\\"n\\">ll</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">atk</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"nf\\">pmod</span><span class=\\"p\\">(</span><span class=\\"n\\">ll</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">m</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">return</span> <span class=\\"p\\">((</span><span class=\\"n\\">a</span><span class=\\"o\\">%</span><span class=\\"n\\">m</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"n\\">m</span><span class=\\"p\\">)</span> <span class=\\"o\\">%</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"nf\\">qmul</span><span class=\\"p\\">(</span><span class=\\"n\\">ll</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">m</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">a</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pmod</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">),</span> <span class=\\"n\\">b</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pmod</span><span class=\\"p\\">(</span><span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(;</span> <span class=\\"n\\">b</span><span class=\\"p\\">;</span> <span class=\\"n\\">b</span> <span class=\\"o\\">&gt;&gt;=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">b</span> <span class=\\"o\\">&amp;</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">res</span> <span class=\\"o\\">+</span> <span class=\\"n\\">a</span><span class=\\"p\\">)</span> <span class=\\"o\\">%</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">a</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">a</span> <span class=\\"o\\">%</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">res</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"nf\\">exgcd</span><span class=\\"p\\">(</span><span class=\\"n\\">ll</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">y</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">a</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"k\\">return</span> <span class=\\"n\\">b</span><span class=\\"p\\">;}</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">exgcd</span><span class=\\"p\\">(</span><span class=\\"n\\">b</span><span class=\\"o\\">%</span><span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">nx</span> <span class=\\"o\\">=</span> <span class=\\"n\\">y</span><span class=\\"o\\">-</span><span class=\\"n\\">b</span><span class=\\"o\\">/</span><span class=\\"n\\">a</span><span class=\\"o\\">*</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">ny</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">nx</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ny</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">excrt</span><span class=\\"p\\">(</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;&gt;&amp;</span> <span class=\\"n\\">arg</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()</span> <span class=\\"o\\">&gt;</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">auto</span> <span class=\\"n\\">p1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">back</span><span class=\\"p\\">();</span> <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">pop_back</span><span class=\\"p\\">();</span>\\n    <span class=\\"k\\">auto</span> <span class=\\"n\\">p2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">back</span><span class=\\"p\\">();</span> <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">pop_back</span><span class=\\"p\\">();</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">p2</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">p1</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">)</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">p1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p2</span><span class=\\"p\\">);</span>\\n\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">a1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p1</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">,</span> <span class=\\"n\\">a2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p2</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">,</span> <span class=\\"n\\">m1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p1</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">,</span> <span class=\\"n\\">m2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p2</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">k1</span><span class=\\"p\\">,</span> <span class=\\"n\\">k2</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">exgcd</span><span class=\\"p\\">(</span><span class=\\"n\\">m1</span><span class=\\"p\\">,</span> <span class=\\"n\\">m2</span><span class=\\"p\\">,</span> <span class=\\"n\\">k1</span><span class=\\"p\\">,</span> <span class=\\"n\\">k2</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">((</span><span class=\\"n\\">a2</span><span class=\\"o\\">-</span><span class=\\"n\\">a1</span><span class=\\"p\\">)</span> <span class=\\"o\\">%</span> <span class=\\"n\\">d</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"p\\">{</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">};</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m1</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"o\\">*</span><span class=\\"n\\">m2</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pmod</span><span class=\\"p\\">(</span><span class=\\"n\\">qmul</span><span class=\\"p\\">(</span><span class=\\"n\\">qmul</span><span class=\\"p\\">((</span><span class=\\"n\\">a2</span><span class=\\"o\\">-</span><span class=\\"n\\">a1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"n\\">k1</span><span class=\\"p\\">,</span> <span class=\\"n\\">m2</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">),</span> <span class=\\"n\\">m1</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">)</span><span class=\\"o\\">+</span><span class=\\"n\\">a1</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">});</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">back</span><span class=\\"p\\">();</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"n\\">solve</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"n\\">INF</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">arg</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">exgcd</span><span class=\\"p\\">(</span><span class=\\"n\\">atk</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">%</span> <span class=\\"n\\">d</span> <span class=\\"o\\">!=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">mx</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"n\\">my</span> <span class=\\"o\\">=</span> <span class=\\"n\\">atk</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">qmul</span><span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"n\\">mx</span><span class=\\"p\\">),</span> <span class=\\"n\\">y</span> <span class=\\"o\\">=</span> <span class=\\"n\\">qmul</span><span class=\\"p\\">(</span><span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"n\\">my</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">arg</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">mx</span><span class=\\"p\\">});</span>\\n\\n    <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">x</span> <span class=\\"o\\">*</span> <span class=\\"n\\">my</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span> <span class=\\"o\\">-</span> <span class=\\"n\\">x</span><span class=\\"o\\">*</span><span class=\\"n\\">my</span> <span class=\\"o\\">+</span> <span class=\\"n\\">mx</span><span class=\\"o\\">*</span><span class=\\"n\\">my</span> <span class=\\"o\\">-</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"p\\">(</span><span class=\\"n\\">mx</span><span class=\\"o\\">*</span><span class=\\"n\\">my</span><span class=\\"p\\">));</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">auto</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">excrt</span><span class=\\"p\\">(</span><span class=\\"n\\">arg</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span> <span class=\\"o\\">==</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">l</span> <span class=\\"o\\">?</span> <span class=\\"p\\">((</span><span class=\\"n\\">l</span><span class=\\"o\\">-</span><span class=\\"n\\">x</span><span class=\\"o\\">+</span><span class=\\"n\\">m</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"n\\">m</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"n\\">m</span> <span class=\\"o\\">+</span> <span class=\\"nl\\">x</span><span class=\\"p\\">:</span> <span class=\\"n\\">x</span><span class=\\"o\\">-</span><span class=\\"p\\">((</span><span class=\\"n\\">x</span><span class=\\"o\\">-</span><span class=\\"n\\">l</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"n\\">m</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">res</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">nt</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">nt</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">nt</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n\\n    <span class=\\"n\\">multiset</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">b</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">b</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">ll</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">insert</span><span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">auto</span> <span class=\\"n\\">it</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">upper_bound</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">it</span> <span class=\\"o\\">!=</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">())</span> <span class=\\"n\\">it</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">atk</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"o\\">*</span><span class=\\"n\\">it</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">erase</span><span class=\\"p\\">(</span><span class=\\"n\\">it</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">insert</span><span class=\\"p\\">(</span><span class=\\"n\\">b</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">solve</span><span class=\\"p\\">()</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"number theory","url":"/tags/number-theory"}],"title":"NOI-2018 屠龙勇士","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/number-theory/CRT/luogu-4774"}')}}]);
//# sourceMappingURL=chunk-2d0ddda5.c79b44db.js.map