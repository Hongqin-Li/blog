(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cbe27"],{"4c24":function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"小凯手中有两种面值的金币，两种面值均为正整数且彼此互素。每种金币小凯都有无数个。在不找零的情况下，仅凭这两种金币，有些物品他是无法准确支付的。现在小凯想知道在无法准确支付的物品中，最贵的价值是多少金币？注意：输入数据保证存在小凯无法准确支付的商品。","html":"<p>小凯手中有两种面值的金币，两种面值均为正整数且彼此互素。每种金币小凯都有无数个。在不找零的情况下，仅凭这两种金币，有些物品他是无法准确支付的。现在小凯想知道在无法准确支付的物品中，最贵的价值是多少金币？注意：输入数据保证存在小凯无法准确支付的商品。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>两个正整数 <script type=\\"math/tex\\">a<\/script> 和 <script type=\\"math/tex\\">b<\/script>，它们之间用一个空格隔开，表示小凯中金币的面值。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>一个正整数 <script type=\\"math/tex\\">N<\/script>，表示不找零的情况下，小凯用手中的金币不能准确支付的最贵的物品的价值。</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3 7\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>11\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>数论好题，严格证明的话有一定思维难度</p>\\n<p>首先，依题意得 <script type=\\"math/tex\\">a, b<\/script> 互质，于是由裴蜀定理，存在 <script type=\\"math/tex\\">x_0, y_0<\/script> 满足 <script type=\\"math/tex\\">a x_0+by_0 = 1<\/script>，再由裴蜀定理可证，<script type=\\"math/tex\\">ax+by=k<\/script> 的解一定时这种形式 <script type=\\"math/tex\\">kx_0 - \\\\lambda b, ky_0 + \\\\lambda a<\/script>。而题意要求（小凯无法准确支付时）使得这些二元组不能都大于零的最大的 <script type=\\"math/tex\\">k<\/script>，贪心一下，让 <script type=\\"math/tex\\">kx_0 - lambda b<\/script> 最小且非负可得 <script type=\\"math/tex\\">kx_0 \\\\bmod b<\/script>，此时 <script type=\\"math/tex\\">y=\\\\frac{kx_0 - kx_0 \\\\bmod b}{b}a + ky_0<\/script> 若仍小于 <script type=\\"math/tex\\">0<\/script> 则符合题意，故有</p>\\n<p>\\n<script type=\\"math/tex; mode=display\\">\\n\\\\begin{aligned}\\n\\\\frac{kx_0 - kx_0 \\\\bmod b}{b} \\\\cdot a + k y_0 &< 0 \\\\\\\\\\n(kx_0 - kx_0 \\\\bmod b) \\\\cdot a + kby_0 &< 0 \\\\\\\\\\nk(ax_0 + by_0) &< (kx_0\\\\bmod b)\\\\cdot a \\\\\\\\\\nk &< (k\\\\cdot \\\\frac{1-by_0}{a} \\\\bmod b) \\\\cdot a\\\\\\\\\\nk &< (k\\\\cdot a^{-1} \\\\bmod b) \\\\cdot a\\n\\\\end{aligned}\\n<\/script>\\n</p>\\n<p>故原问题等价于</p>\\n<p>\\n<script type=\\"math/tex; mode=display\\">\\nk^* = \\\\max k \\\\text{ s.t } k < (ka^{-1} \\\\bmod b) \\\\cdot a\\n<\/script>\\n</p>\\n<p>易知不等号右边小于等于 <script type=\\"math/tex\\">(b-1)a<\/script>，故 <script type=\\"math/tex\\">k^* < ab-a<\/script>。注意到不等式右边的值只能取 <script type=\\"math/tex\\">0, a, ..., (b-1)a<\/script>，周期是 <script type=\\"math/tex\\">b<\/script>，又由 <script type=\\"math/tex\\">a, b<\/script> 互质得 <script type=\\"math/tex\\">a^{-1}, b<\/script> 互质，可以证明 <script type=\\"math/tex\\">\\\\{ka^{-1} \\\\mid k \\\\in (ab-a-b, ab-a] \\\\} = \\\\{0, a, ..., (b-1)a=ab-a\\\\}<\/script>，即两集合的元素恰好一一对应。而除掉最后一对 <script type=\\"math/tex\\">k=ab-a\\\\mapsto ab-a<\/script>，其他 <script type=\\"math/tex\\">k<\/script> 的取值 <script type=\\"math/tex\\">(ab-a-b, ab-a)<\/script> 时，对应 <script type=\\"math/tex\\">ka^{-1}<\/script> 的值属于 <script type=\\"math/tex\\">[0, (b-2)a]<\/script>，不妨设 <script type=\\"math/tex\\">a\\\\ge b<\/script>，则可知这些 <script type=\\"math/tex\\">k<\/script> 都不符合约束不等式。于是进一步缩小了范围得到 <script type=\\"math/tex\\">k^* <= ab-a-b-1<\/script>，由周期性（或者直接代入）可知，<script type=\\"math/tex\\">k^* = ab-a-b-1<\/script> 确实可行，故答案即此。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8\\n9</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">b</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">a</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">b</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">a</span><span class=\\"o\\">*</span><span class=\\"n\\">b</span><span class=\\"o\\">-</span><span class=\\"n\\">a</span><span class=\\"o\\">-</span><span class=\\"n\\">b</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"number theory","url":"/tags/number-theory"}],"title":"洛谷P3951 小凯的疑惑","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/number-theory/Bezout/luogu-3951"}')}}]);
//# sourceMappingURL=chunk-2d0cbe27.9fe13161.js.map