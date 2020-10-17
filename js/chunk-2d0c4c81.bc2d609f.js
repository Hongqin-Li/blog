(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4c81"],{"3bfb":function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"You are given n segments $[l_1,r_1],[l_2,r_2], \\\\dots,[l_n,r_n]$. Each segment has one of two colors: the i-th segment\'s color is $t_i$.","html":"<p>You are given n segments <script type=\\"math/tex\\">[l_1,r_1],[l_2,r_2], \\\\dots,[l_n,r_n]<\/script>. Each segment has one of two colors: the i-th segment\'s color is <script type=\\"math/tex\\">t_i<\/script>.</p>\\n<p>Let\'s call a pair of segments i and j <em>bad</em> if the following two conditions are met:</p>\\n<ul>\\n<li>ti≠tj;</li>\\n<li>the segments <script type=\\"math/tex\\">[l_i,r_i]<\/script> and <script type=\\"math/tex\\">[l_j,r_j]<\/script> intersect, embed or touch, i. e. there exists an integer x such that <script type=\\"math/tex\\">x\\\\in [l_i,r_i]<\/script> and <script type=\\"math/tex\\">x\\\\in [l_j,r_j]<\/script>.</li>\\n</ul>\\n<p>Calculate the maximum number of segments that can be selected from the given ones, so that there is no bad pair among the selected ones.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line contains a single integer <script type=\\"math/tex\\">n (1≤n≤2\\\\cdot 10^5)<\/script> number of segments.</p>\\n<p>The next n lines contains three integers <script type=\\"math/tex\\">li,ri,ti (1\\\\le l_i\\\\le r_i\\\\le 10^9;t_i\\\\in\\\\{1,2\\\\})<\/script> — description of the i-th segment.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>Print the maximum number of segments that can be selected, so that there is no bad pair among the selected segments.</p>\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>7\\n19 20 1\\n13 15 2\\n6 11 2\\n4 10 1\\n14 17 1\\n13 13 2\\n5 9 1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>5\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>先分别对两种色块按右端点排序</p>\\n<p>分别用线段树维护一个区间，其中每一项代表一个异色块，第i项是上个异色块为第i个异色块的合法色块序列的最大长度，这里的“第i个”所指的顺序是按右端点排序。</p>\\n<p>当遍历到某个色块时，</p>\\n<ol>\\n<li>区间中所有的异色块右端小于当前色块左端的项都要加一，并找到这些修改后的值的最大值，用于第二步。由于我们加入的顺序是遍历的顺序，即右端点排序，故可以二分找到需要加一的范围。</li>\\n<li>用第一步得到的值更新另一个线段树维护的区间（因为当前色块是相对于它为异色块）</li>\\n</ol>\\n<p>最终两颗线段树所有区间的最大值即为所求</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84\\n85\\n86\\n87\\n88\\n89\\n90\\n91\\n92\\n93\\n94\\n95</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;cstdio&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;vector&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;algorithm&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">200007</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Span</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">t</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">SegmentTree</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">struct</span> <span class=\\"n\\">Node</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">tag</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">val</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">2</span><span class=\\"p\\">];</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span><span class=\\"p\\">,</span> <span class=\\"n\\">qx</span><span class=\\"p\\">;</span>\\n  <span class=\\"kr\\">inline</span> <span class=\\"kt\\">int</span> <span class=\\"nf\\">left</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"k\\">return</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">;}</span>\\n  <span class=\\"kr\\">inline</span> <span class=\\"kt\\">int</span> <span class=\\"nf\\">right</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"k\\">return</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kr\\">inline</span> <span class=\\"kt\\">void</span> <span class=\\"nf\\">update</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">x</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">tag</span><span class=\\"p\\">)</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">x</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">tag</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kr\\">inline</span> <span class=\\"kt\\">void</span> <span class=\\"nf\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">rc</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">tag</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">tag</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">update</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">x</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">update</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">x</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">modify</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"n\\">update</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"n\\">qx</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">),</span> <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">int</span> <span class=\\"nf\\">query</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">return</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">pushdown</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">ret</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">),</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">));</span>\\n      <span class=\\"k\\">return</span> <span class=\\"n\\">ret</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">add</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">x</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">ql</span> <span class=\\"o\\">=</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">qx</span> <span class=\\"o\\">=</span> <span class=\\"n\\">x</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"nf\\">query_max</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">ql</span> <span class=\\"o\\">=</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">;</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">ret</span> <span class=\\"o\\">=</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">ret</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"mi\\">2</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">t</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">t</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">sort</span><span class=\\"p\\">(</span><span class=\\"n\\">span</span><span class=\\"p\\">,</span> <span class=\\"n\\">span</span><span class=\\"o\\">+</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"p\\">[](</span><span class=\\"n\\">Span</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">lhs</span><span class=\\"p\\">,</span> <span class=\\"n\\">Span</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">lhs</span><span class=\\"p\\">.</span><span class=\\"n\\">r</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">.</span><span class=\\"n\\">r</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">});</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"mi\\">2</span><span class=\\"p\\">];</span>\\n  <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">li</span> <span class=\\"o\\">=</span> <span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">ri</span> <span class=\\"o\\">=</span> <span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">ti</span> <span class=\\"o\\">=</span> <span class=\\"n\\">span</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">t</span><span class=\\"p\\">;</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">nti</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"n\\">ti</span><span class=\\"p\\">;</span>\\n\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">idx</span> <span class=\\"o\\">=</span> <span class=\\"n\\">lower_bound</span><span class=\\"p\\">(</span><span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">ti</span><span class=\\"p\\">].</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">ti</span><span class=\\"p\\">].</span><span class=\\"n\\">end</span><span class=\\"p\\">(),</span> <span class=\\"n\\">li</span><span class=\\"p\\">)</span> <span class=\\"o\\">-</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">ti</span><span class=\\"p\\">].</span><span class=\\"n\\">begin</span><span class=\\"p\\">();</span>\\n    <span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"n\\">ti</span><span class=\\"p\\">].</span><span class=\\"n\\">add</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">idx</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">maxl</span> <span class=\\"o\\">=</span> <span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"n\\">ti</span><span class=\\"p\\">].</span><span class=\\"n\\">query_max</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">idx</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">nti</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">ri</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"n\\">nti</span><span class=\\"p\\">].</span><span class=\\"n\\">add</span><span class=\\"p\\">(</span><span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">nti</span><span class=\\"p\\">].</span><span class=\\"n\\">size</span><span class=\\"p\\">(),</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"n\\">nti</span><span class=\\"p\\">].</span><span class=\\"n\\">size</span><span class=\\"p\\">(),</span> <span class=\\"n\\">maxl</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">].</span><span class=\\"n\\">query_max</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">].</span><span class=\\"n\\">size</span><span class=\\"p\\">()),</span>\\n                   <span class=\\"n\\">tree</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">query_max</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">vec</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">].</span><span class=\\"n\\">size</span><span class=\\"p\\">())));</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"data structures","url":"/tags/data-structures"},{"name":"dp","url":"/tags/dp"}],"title":"CF-1389F Bicolored Segments","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/data-structures/segment-tree/cf-1389f"}')}}]);
//# sourceMappingURL=chunk-2d0c4c81.bc2d609f.js.map