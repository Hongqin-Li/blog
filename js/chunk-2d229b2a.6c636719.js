(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229b2a"],{df0b:function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"爱与愁大神后院里种了 $n$ 棵樱花树，每棵都有美学值 $C_i$。爱与愁大神在每天上学前都会来赏花。爱与愁大神可是生物学霸，他懂得如何欣赏樱花：一种樱花树看一遍过，一种樱花树最多看 $A_i$ 遍，一种樱花树可以看无数遍。但是看每棵樱花树都有一定的时间 $T_i$。爱与愁大神离去上学的时间只剩下一小会儿了。求解看哪几棵樱花树能使美学值最高且爱与愁大神能准时（或提早）去上学。","html":"<p>爱与愁大神后院里种了 <script type=\\"math/tex\\">n<\/script> 棵樱花树，每棵都有美学值 <script type=\\"math/tex\\">C_i<\/script>。爱与愁大神在每天上学前都会来赏花。爱与愁大神可是生物学霸，他懂得如何欣赏樱花：一种樱花树看一遍过，一种樱花树最多看 <script type=\\"math/tex\\">A_i<\/script> 遍，一种樱花树可以看无数遍。但是看每棵樱花树都有一定的时间 <script type=\\"math/tex\\">T_i<\/script>。爱与愁大神离去上学的时间只剩下一小会儿了。求解看哪几棵樱花树能使美学值最高且爱与愁大神能准时（或提早）去上学。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>共 <script type=\\"math/tex\\">n+1<\/script> 行：</p>\\n<p>第 <script type=\\"math/tex\\">1<\/script> 行：现在时间 <script type=\\"math/tex\\">T_s<\/script>（几时：几分），去上学的时间 <script type=\\"math/tex\\">T_e<\/script>（几时：几分），爱与愁大神院子里有几棵樱花树 <script type=\\"math/tex\\">n<\/script>。这里的 <script type=\\"math/tex\\">T_s, T_e<\/script> 格式为：<code>hh:mm</code>，其中 <script type=\\"math/tex\\">0 \\\\leq hh \\\\leq 23, 0 \\\\leq mm \\\\leq 59<\/script>，且 <script type=\\"math/tex\\">hh,mm,n<\/script> 均为正整数。</p>\\n<p>第 <script type=\\"math/tex\\">2<\/script> 行到第 <script type=\\"math/tex\\">n+1<\/script> 行，每行三个正整数：看完第 <script type=\\"math/tex\\">i<\/script> 棵树的耗费时间 <script type=\\"math/tex\\">T_i<\/script>，第 <script type=\\"math/tex\\">i<\/script> 棵树的美学值 <script type=\\"math/tex\\">C_i<\/script>，看第 <script type=\\"math/tex\\">i<\/script> 棵树的次数 <script type=\\"math/tex\\">P_i<\/script>（<script type=\\"math/tex\\">P_i=0<\/script> 表示无数次，<script type=\\"math/tex\\">P_i<\/script> 是其他数字表示最多可看的次数 <script type=\\"math/tex\\">P_i<\/script>）。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>只有一个整数，表示最大美学值。</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>6:50 7:00 3\\n2 1 0\\n3 3 1\\n4 5 4\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>11\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>多重背包模板题，采用二进制优化（或单调队列优化）实现</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXM</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1003</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXM</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">ni</span><span class=\\"p\\">,</span> <span class=\\"n\\">h1</span><span class=\\"p\\">,</span> <span class=\\"n\\">h2</span><span class=\\"p\\">,</span> <span class=\\"n\\">m1</span><span class=\\"p\\">,</span> <span class=\\"n\\">m2</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d:%d%d:%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">h1</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m1</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">h2</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m2</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">ni</span><span class=\\"p\\">);</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">h2</span><span class=\\"o\\">-</span><span class=\\"n\\">h1</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"mi\\">60</span> <span class=\\"o\\">+</span> <span class=\\"n\\">m2</span><span class=\\"o\\">-</span><span class=\\"n\\">m1</span><span class=\\"p\\">;</span>\\n\\n  <span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"p\\">{</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"n\\">inf</span><span class=\\"p\\">;</span> <span class=\\"p\\">};</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">Item</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">item</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">item</span><span class=\\"p\\">.</span><span class=\\"n\\">reserve</span><span class=\\"p\\">(</span><span class=\\"mi\\">10</span><span class=\\"o\\">*</span><span class=\\"n\\">ni</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ni</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"p\\">(</span><span class=\\"n\\">k</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">))</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">item</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">});</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">left</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span> <span class=\\"o\\">-</span> <span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">left</span><span class=\\"p\\">)</span> <span class=\\"n\\">item</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({</span><span class=\\"n\\">left</span><span class=\\"o\\">*</span><span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"n\\">left</span><span class=\\"o\\">*</span><span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">});</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">item</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({</span><span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">});</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"n\\">item</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">();</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span><span class=\\"o\\">&amp;</span> <span class=\\"nl\\">x</span><span class=\\"p\\">:</span> <span class=\\"n\\">item</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">inf</span><span class=\\"p\\">)</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">],</span> <span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">t</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span> <span class=\\"o\\">?</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">t</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"nl\\">c</span><span class=\\"p\\">:</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">else</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">],</span> <span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">t</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span> <span class=\\"o\\">?</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"n\\">t</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">x</span><span class=\\"p\\">.</span><span class=\\"nl\\">c</span><span class=\\"p\\">:</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">m</span><span class=\\"p\\">]);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"dp","url":"/tags/dp"}],"title":"洛谷P1833 樱花","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/acm/dp/luogu-1833"}')}}]);
//# sourceMappingURL=chunk-2d229b2a.6c636719.js.map