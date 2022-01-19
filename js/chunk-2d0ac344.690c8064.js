(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac344"],{1917:function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"\\"第一分钟，X说，要有数列，于是便给定了一个正整数数列。","html":"<p>\\"第一分钟，X说，要有数列，于是便给定了一个正整数数列。</p>\\n<p>第二分钟，L说，要能修改，于是便有了对一段数中每个数都开平方(下取整)的操作。</p>\\n<p>第三分钟，k说，要能查询，于是便有了求一段数的和的操作。</p>\\n<p>第四分钟，彩虹喵说，要是noip难度，于是便有了数据范围。</p>\\n<p>第五分钟，诗人说，要有韵律，于是便有了时间限制和内存限制。</p>\\n<p>第六分钟，和雪说，要省点事，于是便有了保证运算过程中及最终结果均不超过64位有符号整数类型的表示范围的限制。</p>\\n<p>第七分钟，这道题终于造完了，然而，造题的神牛们再也不想写这道题的程序了。\\"</p>\\n<p>《上帝造题的七分钟·第二部》</p>\\n<p>所以这个神圣的任务就交给你了。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>第一行一个整数 <script type=\\"math/tex\\">n<\/script>，代表数列中数的个数。</p>\\n<p>第二行 <script type=\\"math/tex\\">n<\/script> 个正整数，表示初始状态下数列中的数。</p>\\n<p>第三行一个整数 <script type=\\"math/tex\\">m<\/script>，表示有 <script type=\\"math/tex\\">m<\/script> 次操作。</p>\\n<p>接下来 <script type=\\"math/tex\\">m<\/script> 行每行三个整数 <script type=\\"math/tex\\">k,l,r<\/script>\\n</p>\\n<ul>\\n<li>\\n<script type=\\"math/tex\\">k=0<\/script> 表示给 <script type=\\"math/tex\\">[l,r]<\/script>  中的每个数开平方(下取整)</li>\\n<li>\\n<script type=\\"math/tex\\">k=1<\/script> 表示询问 <script type=\\"math/tex\\">[l,r]<\/script> 中各个数的和。</li>\\n</ul>\\n<p>数据中有可能 <script type=\\"math/tex\\">l>r<\/script>，所以遇到这种情况请交换 <script type=\\"math/tex\\">l<\/script> 和 <script type=\\"math/tex\\">r<\/script>。</p>\\n<p>\\n<script type=\\"math/tex\\">1\\\\le n,m\\\\le 100000<\/script>, <script type=\\"math/tex\\">1\\\\le l,r\\\\le n<\/script>，数列中的数大于 <script type=\\"math/tex\\">0<\/script>，且不超过 <script type=\\"math/tex\\">10^{12}<\/script>。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>对于询问操作，每行输出一个回答。</p>\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>10\\n1 2 3 4 5 6 7 8 9 10\\n5\\n0 1 10\\n1 1 10\\n1 1 5\\n0 5 8\\n1 4 8\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>19\\n7\\n6\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>注意到每个数最多被连续开方的次数小于7，之后开方总是1，于是用线段树维护区间是否全1，若是则不用修改该区间。有点类似剪枝线段树。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;stdio.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;math.h&gt;</span><span class=\\"cp\\"></span>\\n\\n<span class=\\"cp\\">#define MAXN 400007</span>\\n\\n<span class=\\"cp\\">#define left(i) (i&lt;&lt;1)</span>\\n<span class=\\"cp\\">#define right(i) ((i&lt;&lt;1)+1)</span>\\n\\n<span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Node</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">all1</span><span class=\\"p\\">;</span>\\n  <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">val</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">pushup</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">all1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">all1</span> <span class=\\"o\\">&amp;</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">all1</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">lc</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">+</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">rc</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">build</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">==</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">=</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">l</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">pushup</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">modify</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">all1</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">==</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sqrt</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">all1</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">m</span><span class=\\"p\\">)</span> <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">qr</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">pushup</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"nf\\">query</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">].</span><span class=\\"n\\">val</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">else</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">left</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">),</span> <span class=\\"n\\">rc</span> <span class=\\"o\\">=</span> <span class=\\"n\\">right</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">lc</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rc</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">op</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%lld&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">op</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">qr</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">t</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ql</span><span class=\\"p\\">;</span> <span class=\\"n\\">ql</span> <span class=\\"o\\">=</span> <span class=\\"n\\">qr</span><span class=\\"p\\">;</span> <span class=\\"n\\">qr</span> <span class=\\"o\\">=</span> <span class=\\"n\\">t</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">op</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"n\\">modify</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%lld</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">query</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">));</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"data structures","url":"/tags/data-structures"}],"title":"洛谷-P4145 上帝造题的七分钟2","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/data-structures/segment-tree/luogu-4145"}')}}]);
//# sourceMappingURL=chunk-2d0ac344.690c8064.js.map