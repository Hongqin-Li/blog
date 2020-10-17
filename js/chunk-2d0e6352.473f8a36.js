(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e6352"],{9885:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"在 $N\\\\times N$ 的棋盘里面放 $K$ 个国王，使他们互不攻击，共有多少种摆放方案。国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 $8$ 个格子。","html":"<p>在 <script type=\\"math/tex\\">N\\\\times N<\/script> 的棋盘里面放 <script type=\\"math/tex\\">K<\/script> 个国王，使他们互不攻击，共有多少种摆放方案。国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 <script type=\\"math/tex\\">8<\/script> 个格子。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>只有一行，包含两个数<script type=\\"math/tex\\">N, K(1 \\\\le N \\\\le 9, 0 \\\\le K \\\\le N^2)<\/script>\\n</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>所得的方案数</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3 1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>9\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3 2\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>16\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>9 10\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>17143061738\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>状压dp经典题，<script type=\\"math/tex\\">f[i][j][k] = \\\\sum f[i-1][r][k-ks[j]]<\/script> 为在前 <script type=\\"math/tex\\">i<\/script> 行种放了 <script type=\\"math/tex\\">k<\/script> 个国王且第 <script type=\\"math/tex\\">i<\/script> 行的状态为 <script type=\\"math/tex\\">j<\/script>，其中 <script type=\\"math/tex\\">ks[j]<\/script> 为行状态 j 中的国王数量，可以通过 dfs 预处理出来。状态转移时需要判断上一行状态 <script type=\\"math/tex\\">r<\/script> 和当前状态 <script type=\\"math/tex\\">j<\/script> 是否有国王冲突。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;cstdio&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">13</span><span class=\\"p\\">,</span> <span class=\\"n\\">MAXS</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">100</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">kk</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXS</span><span class=\\"p\\">],</span> <span class=\\"n\\">ks</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXS</span><span class=\\"p\\">],</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">][</span><span class=\\"n\\">MAXS</span><span class=\\"p\\">][</span><span class=\\"n\\">MAXN</span><span class=\\"o\\">*</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">dfs</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">st</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">ks</span><span class=\\"p\\">[</span><span class=\\"n\\">ns</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span><span class=\\"p\\">,</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">ns</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">st</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">else</span>\\n    <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">st</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span><span class=\\"p\\">),</span> <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">st</span><span class=\\"o\\">|</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">i</span><span class=\\"p\\">),</span> <span class=\\"n\\">k</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">kk</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">][</span><span class=\\"n\\">ks</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">kk</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"kt\\">int</span> <span class=\\"n\\">pk</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span> <span class=\\"o\\">-</span> <span class=\\"n\\">ks</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">];</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">pk</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n          <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span> <span class=\\"n\\">r</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n            <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">]</span><span class=\\"o\\">&amp;</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">])</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"o\\">!</span><span class=\\"p\\">((</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">]</span><span class=\\"o\\">&gt;&gt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">&amp;</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">])</span>\\n                <span class=\\"o\\">&amp;&amp;</span> <span class=\\"o\\">!</span><span class=\\"p\\">((</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">]</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">&amp;</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]))</span>\\n            <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">][</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">][</span><span class=\\"n\\">r</span><span class=\\"p\\">][</span><span class=\\"n\\">pk</span><span class=\\"p\\">];</span>\\n        <span class=\\"p\\">}</span>\\n      <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">ans</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">][</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">kk</span><span class=\\"p\\">];</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%lld&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ans</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"dp","url":"/tags/dp"}],"title":"P1896 [SCOI2005]互不侵犯","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/dp/bitmask-dp/luogu-1896"}')}}]);
//# sourceMappingURL=chunk-2d0e6352.473f8a36.js.map