(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6c14"],{"1f09":function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"You are given an array $a$ of length 2n 2^n 2n . You should process $q$ queries on it. Each query has one of the following $4$ types:","html":"<p>You are given an array <script type=\\"math/tex\\">a<\/script> of length 2n 2^n 2n . You should process <script type=\\"math/tex\\">q<\/script> queries on it. Each query has one of the following <script type=\\"math/tex\\">4<\/script> types:</p>\\n<ul>\\n<li>\\n<script type=\\"math/tex\\">Replace(x,k)<\/script> — change <script type=\\"math/tex\\">a_x<\/script> to <script type=\\"math/tex\\">k<\/script>;</li>\\n<li>\\n<script type=\\"math/tex\\">Reverse(k)<\/script> — reverse each subarray <script type=\\"math/tex\\">[(i-1) \\\\cdot 2^k+1, i \\\\cdot 2^k]<\/script> for all <script type=\\"math/tex\\">i<\/script> (<script type=\\"math/tex\\">i \\\\ge 1<\/script>);</li>\\n<li>\\n<script type=\\"math/tex\\">Swap(k)<\/script> — swap subarrays <script type=\\"math/tex\\">[(2i-2) \\\\cdot 2^k+1, (2i-1) \\\\cdot 2^k]<\/script> and <script type=\\"math/tex\\">[(2i-1) \\\\cdot 2^k+1, 2i \\\\cdot 2^k]<\/script> for all <script type=\\"math/tex\\">i (i \\\\ge 1)<\/script>;</li>\\n<li>\\n<script type=\\"math/tex\\">Sum(l, r)<\/script> — print the sum of the elements of subarray <script type=\\"math/tex\\">[l, r]<\/script>.</li>\\n</ul>\\n<p>Write a program that can quickly process given queries.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line contains two integers <script type=\\"math/tex\\">n<\/script> , <script type=\\"math/tex\\">q<\/script> ( <script type=\\"math/tex\\">0 \\\\le n \\\\le 18<\/script>; <script type=\\"math/tex\\">1 \\\\le q \\\\le 10^5<\/script>) — the length of array <script type=\\"math/tex\\">a<\/script> and the number of queries.</p>\\n<p>The second line contains <script type=\\"math/tex\\">2^n<\/script> integers <script type=\\"math/tex\\">a_1, a_2, \\\\ldots, a_{2^n}<\/script> (<script type=\\"math/tex\\">0 \\\\le a_i \\\\le 10^9<\/script>).</p>\\n<p>Next <script type=\\"math/tex\\">q<\/script> lines contains queries — one per line. Each query has one of <script type=\\"math/tex\\">4<\/script> types:</p>\\n<ul>\\n<li>\\"<script type=\\"math/tex\\">1<\/script>\\n<script type=\\"math/tex\\">x<\/script>\\n<script type=\\"math/tex\\">k<\/script>\\" (<script type=\\"math/tex\\">1 \\\\le x \\\\le 2^n<\/script>; <script type=\\"math/tex\\">0 \\\\le k \\\\le 10^9<\/script>) — <script type=\\"math/tex\\">Replace(x, k)<\/script>;</li>\\n<li>\\"<script type=\\"math/tex\\">2<\/script>\\n<script type=\\"math/tex\\">k<\/script>\\" (<script type=\\"math/tex\\">0 \\\\le k \\\\le n<\/script>) — <script type=\\"math/tex\\">Reverse(k)<\/script>;</li>\\n<li>\\"<script type=\\"math/tex\\">3<\/script>\\n<script type=\\"math/tex\\">k<\/script>\\" (<script type=\\"math/tex\\">0 \\\\le k < n<\/script>) — <script type=\\"math/tex\\">Swap(k)<\/script>;</li>\\n<li>\\"<script type=\\"math/tex\\">4<\/script>\\n<script type=\\"math/tex\\">l<\/script>\\n<script type=\\"math/tex\\">r<\/script>\\" (<script type=\\"math/tex\\">1 \\\\le l \\\\le r \\\\le 2^n<\/script>) — <script type=\\"math/tex\\">Sum(l, r)<\/script>.</li>\\n</ul>\\n<p>It is guaranteed that there is at least one <script type=\\"math/tex\\">Sum<\/script> query.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>Print the answer for each Sum Sum Sum query.</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>2 3\\n7 4 9 9\\n1 2 8\\n3 1\\n4 2 4\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>24\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3 8\\n7 0 8 8 7 1 5 2\\n4 3 7\\n2 1\\n3 2\\n4 1 6\\n2 3\\n1 5 16\\n4 8 8\\n3 0\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>29\\n22\\n1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>易证如下性质：</p>\\n<ul>\\n<li>\\n<script type=\\"math/tex\\">Swap(k)<\/script> 等价于 <script type=\\"math/tex\\">Reverse(k+1)<\/script> 加上 <script type=\\"math/tex\\">Reverse(k)<\/script>\\n</li>\\n<li>多个 <script type=\\"math/tex\\">Reverse(i)<\/script> 可以交换顺序</li>\\n</ul>\\n<p>对于每个线段树上的节点，懒标记用一个 <script type=\\"math/tex\\">bitset<\/script> 表示各种 <script type=\\"math/tex\\">Reverse<\/script> 操作，第 <script type=\\"math/tex\\">i<\/script> 位为 <script type=\\"math/tex\\">1<\/script> 表示存在操作 <script type=\\"math/tex\\">Reverse(i)<\/script>。下穿标记时可能需要互换左右子节点。</p>\\n<p>复杂度 <script type=\\"math/tex\\">O(qn)<\/script>\\n</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84\\n85\\n86</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">N</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">3e5</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Node</span> <span class=\\"p\\">{</span> <span class=\\"kt\\">int64_t</span> <span class=\\"n\\">sum</span><span class=\\"p\\">;</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">,</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">4</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">getb</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"k\\">return</span> <span class=\\"n\\">b</span> <span class=\\"o\\">&amp;</span> <span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span> <span class=\\"p\\">}</span>\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">toggleb</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span>\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">clearb</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"n\\">b</span> <span class=\\"o\\">&amp;=</span> <span class=\\"o\\">~</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span> <span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">getb</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">k</span><span class=\\"p\\">))</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">clearb</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">k</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">toggleb</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">k</span><span class=\\"p\\">),</span> <span class=\\"n\\">toggleb</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">k</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">pushup</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span> <span class=\\"o\\">+</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">build</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">d</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">==</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span> <span class=\\"o\\">=</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">l</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">1</span><span class=\\"o\\">|</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">),</span> <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">rc</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rc</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pushup</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">modify</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">qi</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">qx</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">==</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">l</span> <span class=\\"o\\">==</span> <span class=\\"n\\">qi</span><span class=\\"p\\">)</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span> <span class=\\"o\\">=</span> <span class=\\"n\\">qx</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">qi</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">qi</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">qi</span><span class=\\"p\\">,</span> <span class=\\"n\\">qx</span><span class=\\"p\\">),</span> <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">qi</span><span class=\\"p\\">,</span> <span class=\\"n\\">qx</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">pushup</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int64_t</span> <span class=\\"nf\\">query</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">sum</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">rc</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">nq</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">nq</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n  <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">nq</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">op</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">op</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">op</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">y</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">op</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">2</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">op</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">3</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">b</span> <span class=\\"o\\">^=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">y</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">)</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"data structures","url":"/tags/data-structures"}],"title":"CF-1401F Reverse and Swap","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/data-structures/segment-tree/cf-1401f"}')}}]);
//# sourceMappingURL=chunk-2d0b6c14.cb22d2c6.js.map