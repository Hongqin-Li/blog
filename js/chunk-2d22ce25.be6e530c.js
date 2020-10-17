(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22ce25"],{f4ab:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"你准备浏览一个公园，该公园由 $N$ 个岛屿组成，当地管理部门从每个岛屿 $i$ 出发向另外一个岛屿建了一座长度为 $L_i$ 的桥，不过桥是可以双向行走的。同时，每对岛屿之间都有一艘专用的往来两岛之间的渡船。相对于乘船而言，你更喜欢步行。你希望经过的桥的总长度尽可能长，但受到以下的限制：","html":"<p>你准备浏览一个公园，该公园由 <script type=\\"math/tex\\">N<\/script> 个岛屿组成，当地管理部门从每个岛屿 <script type=\\"math/tex\\">i<\/script> 出发向另外一个岛屿建了一座长度为 <script type=\\"math/tex\\">L_i<\/script> 的桥，不过桥是可以双向行走的。同时，每对岛屿之间都有一艘专用的往来两岛之间的渡船。相对于乘船而言，你更喜欢步行。你希望经过的桥的总长度尽可能长，但受到以下的限制：</p>\\n<ul>\\n<li>可以自行挑选一个岛开始游览。</li>\\n<li>任何一个岛都不能游览一次以上。</li>\\n<li>无论任何时间，你都可以由当前所在的岛 <script type=\\"math/tex\\">S<\/script> 去另一个从未到过的岛 <script type=\\"math/tex\\">D<\/script>。从 <script type=\\"math/tex\\">S<\/script> 到 <script type=\\"math/tex\\">D<\/script> 有如下方法：</li>\\n<li>步行：仅当两个岛之间有一座桥时才有可能。对于这种情况，桥的长度会累加到你步行的总距离中。</li>\\n<li>渡船：你可以选择这种方法，仅当没有任何桥和以前使用过的渡船的组合可以由 <script type=\\"math/tex\\">S<\/script> 走到 <script type=\\"math/tex\\">D<\/script> (当检查是否可到达时，你应该考虑所有的路径，包括经过你曾游览过的那些岛)。</li>\\n</ul>\\n<p>注意，你不必游览所有的岛，也可能无法走完所有的桥。</p>\\n<p>请你编写一个程序，给定 <script type=\\"math/tex\\">N<\/script> 座桥以及它们的长度，按照上述的规则，计算你可以走过的桥的长度之和的最大值。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>第一行包含 <script type=\\"math/tex\\">N(2\\\\le N\\\\le 10^6)<\/script> 个整数，即公园内岛屿的数目。</p>\\n<p>随后的 <script type=\\"math/tex\\">N<\/script> 行每一行用来表示一个岛。第 <script type=\\"math/tex\\">i<\/script> 行由两个以单空格分隔的整数，表示由岛 <script type=\\"math/tex\\">i<\/script> 筑的桥。第一个整数表示桥另一端的岛，第二个整数表示该桥的长度 <script type=\\"math/tex\\">L_i(1\\\\le L_i \\\\le 10^8)<\/script>。你可以假设对于每座桥，其端点总是位于不同的岛上。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>仅包含一个整数，即可能的最大步行距离。</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>7\\n3 8\\n7 2\\n4 2\\n1 4\\n1 9\\n3 4\\n2 3\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>24\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>10\\n8 7\\n8 2\\n8 8\\n1 6\\n1 10\\n4 1\\n10 6\\n1 6\\n10 9\\n6 5\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>36\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>5\\n2 999999\\n3 1\\n4 1\\n2 1\\n2 999999\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1999998\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>题意是求基环树的直径，首先得找到环，然后注意到直径要么在环上某个节点的“子树”内（这里的“子树”指，节点除了根之外均不在环上的子树），要么通过环上某两点加上对应“子树”内最长链。</p>\\n<p>第一种情况通过树上 dp 可求得，第二种情况暴力枚举点对的话是 <script type=\\"math/tex\\">O(n^2)<\/script>，我们得用单调队列优化至 <script type=\\"math/tex\\">O(n)<\/script>。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>  1\\n  2\\n  3\\n  4\\n  5\\n  6\\n  7\\n  8\\n  9\\n 10\\n 11\\n 12\\n 13\\n 14\\n 15\\n 16\\n 17\\n 18\\n 19\\n 20\\n 21\\n 22\\n 23\\n 24\\n 25\\n 26\\n 27\\n 28\\n 29\\n 30\\n 31\\n 32\\n 33\\n 34\\n 35\\n 36\\n 37\\n 38\\n 39\\n 40\\n 41\\n 42\\n 43\\n 44\\n 45\\n 46\\n 47\\n 48\\n 49\\n 50\\n 51\\n 52\\n 53\\n 54\\n 55\\n 56\\n 57\\n 58\\n 59\\n 60\\n 61\\n 62\\n 63\\n 64\\n 65\\n 66\\n 67\\n 68\\n 69\\n 70\\n 71\\n 72\\n 73\\n 74\\n 75\\n 76\\n 77\\n 78\\n 79\\n 80\\n 81\\n 82\\n 83\\n 84\\n 85\\n 86\\n 87\\n 88\\n 89\\n 90\\n 91\\n 92\\n 93\\n 94\\n 95\\n 96\\n 97\\n 98\\n 99\\n100\\n101\\n102\\n103\\n104</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">typedef</span> <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">ll</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">N</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e6</span><span class=\\"o\\">+</span><span class=\\"mi\\">3</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">E</span> <span class=\\"p\\">{</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">,</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">nedges</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">found</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">on_ring</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">addedge</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">w</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"o\\">++</span><span class=\\"n\\">nedges</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">],</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">};</span>\\n  <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">nedges</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">find</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">fi</span><span class=\\"p\\">,</span> <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&amp;</span> <span class=\\"n\\">ring</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">found</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">])</span> <span class=\\"k\\">return</span> <span class=\\"n\\">u</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">found</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">nxt</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">v</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">v</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">!=</span> <span class=\\"n\\">fi</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">find</span><span class=\\"p\\">(</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"p\\">((</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">^</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">ring</span><span class=\\"p\\">);</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span> <span class=\\"o\\">&gt;</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n          <span class=\\"n\\">ring</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span>\\n          <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span> <span class=\\"o\\">==</span> <span class=\\"n\\">u</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"n\\">r</span><span class=\\"p\\">;</span>\\n        <span class=\\"p\\">}</span>\\n        <span class=\\"k\\">return</span> <span class=\\"n\\">r</span><span class=\\"p\\">;</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">fa</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">max1</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">max2</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">nxt</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">v</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">v</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">on_ring</span><span class=\\"p\\">[</span><span class=\\"n\\">v</span><span class=\\"p\\">]</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">v</span> <span class=\\"o\\">!=</span> <span class=\\"n\\">fa</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">auto</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">u</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">maxl</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">ll</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span> <span class=\\"o\\">+</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">w</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">max1</span><span class=\\"p\\">)</span> <span class=\\"n\\">max2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max1</span><span class=\\"p\\">,</span> <span class=\\"n\\">max1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">l</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">else</span> <span class=\\"n\\">max2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">max2</span><span class=\\"p\\">,</span> <span class=\\"n\\">l</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"p\\">{</span><span class=\\"n\\">max1</span><span class=\\"p\\">,</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">maxl</span><span class=\\"p\\">,</span> <span class=\\"n\\">max1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">max2</span><span class=\\"p\\">)};</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"n\\">solve</span><span class=\\"p\\">(</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&amp;</span> <span class=\\"n\\">ring</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ring</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">();</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">us</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">d</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">e</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">se</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">auto</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">ring</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]];</span>\\n    <span class=\\"n\\">us</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">e</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">w</span><span class=\\"p\\">,</span> <span class=\\"n\\">on_ring</span><span class=\\"p\\">[</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">v</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">auto</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">us</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">maxl</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">d</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">d</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">d</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"n\\">n</span><span class=\\"p\\">],</span> <span class=\\"n\\">e</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">e</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"n\\">n</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">se</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">se</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">e</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">static</span> <span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">q</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">];</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">ql</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">q</span><span class=\\"p\\">[</span><span class=\\"n\\">ql</span><span class=\\"p\\">].</span><span class=\\"n\\">first</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"n\\">ql</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(;</span><span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">+</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"n\\">j</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">se</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">-</span> <span class=\\"n\\">se</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">r</span><span class=\\"p\\">};</span>\\n      <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">q</span><span class=\\"p\\">[</span><span class=\\"n\\">qr</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">second</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">)</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">q</span><span class=\\"p\\">[</span><span class=\\"n\\">qr</span> <span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">assert</span><span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">qr</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">maxl</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">q</span><span class=\\"p\\">[</span><span class=\\"n\\">ql</span><span class=\\"p\\">].</span><span class=\\"n\\">second</span> <span class=\\"o\\">-</span> <span class=\\"n\\">r</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">r</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">e</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">maxl</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">w</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">addedge</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">),</span> <span class=\\"n\\">addedge</span><span class=\\"p\\">(</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">ring</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">assert</span><span class=\\"p\\">(</span><span class=\\"n\\">find</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">ring</span><span class=\\"p\\">));</span>\\n      <span class=\\"n\\">ans</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">solve</span><span class=\\"p\\">(</span><span class=\\"n\\">ring</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%lld&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ans</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"dp","url":"/tags/dp"}],"title":"IOI-2008 Island","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/dp/tree-based-dp/luogu-4381"}')}}]);
//# sourceMappingURL=chunk-2d22ce25.be6e530c.js.map