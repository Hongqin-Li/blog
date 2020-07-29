(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db331"],{"6f9d":function(s){s.exports=JSON.parse('{"created_at":"2020-07-29T16:27:47+08:00","excerpt":"乔治有一些同样长的小木棍，他把这些木棍随意砍成几段，使得每段的长都不超过50。现在，他想把小木棍拼接成原来的样子，但是却忘记了自己开始时有多少根木棍和它们的长度。给出每段小木棍的长度，编程帮他找出原始木棍的最小可能长度。","html":"<p>乔治有一些同样长的小木棍，他把这些木棍随意砍成几段，使得每段的长都不超过50。现在，他想把小木棍拼接成原来的样子，但是却忘记了自己开始时有多少根木棍和它们的长度。给出每段小木棍的长度，编程帮他找出原始木棍的最小可能长度。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>共二行。</p>\\n<p>第一行为一个单独的整数N表示砍过以后的小木棍的总数，其中 <script type=\\"math/tex\\">N \\\\le 65<\/script>（管理员注：要把超过50的长度自觉过滤掉，坑了很多人了！）</p>\\n<p>第二行为 <script type=\\"math/tex\\">N<\/script> 个用空个隔开的正整数，表示 <script type=\\"math/tex\\">N<\/script> 根小木棍的长度。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>一个数，表示要求的原始木棍的最小可能长度</p>\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"err\\">9</span>\\n<span class=\\"err\\">5 2 1 5 2 1 5 2 1</span>\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"err\\">6</span>\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>显然，答案最短为最长段，最长为段总和，一个小优化是，若小木棍总数大于1，则只需考虑到段总和的一半即可。于是我们可以从小到大枚举小木棍的可能值进行暴搜+剪枝。</p>\\n<p>但是如何剪枝？我们可以反过来思考，考虑某个可行解（小木棍已分好段），对于每个小木棍，我们把其中的段按长度降序排序，而在小木棍之间按最大段长度降序排序。易知，最长段必为第一根小木棍的第一段，同理可证，第i~j根小木棍中的最长段必为第i根小木棍的第一段。</p>\\n<p>于是可以这么搜，按木棍最大段的顺序进行尝试组装，木棍内按段长度顺序进行组装。需要维护两个值，head为当前木棍的第一段的长度，maxseg为当前木棍中，组装到当前段后，之后段的最大长度。</p>\\n<p>另一个很重要的优化是，若组装小木棍的最后一段时，失败了，那么也就不必考虑继续往后组装小于此段的段了，直接回溯即可，原因见代码注释。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">INF</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e9</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">sum</span><span class=\\"p\\">,</span> <span class=\\"n\\">maxa</span><span class=\\"p\\">,</span> <span class=\\"n\\">mina</span> <span class=\\"o\\">=</span> <span class=\\"n\\">INF</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"mi\\">53</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">dfs</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">left</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">nd</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">head</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">maxseg</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"c1\\">// a new stick</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">left</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">nd</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">nd</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">s</span> <span class=\\"o\\">+</span> <span class=\\"n\\">d</span> <span class=\\"o\\">==</span> <span class=\\"n\\">sum</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">exit</span><span class=\\"p\\">(</span><span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">nd</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">head</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"n\\">head</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">head</span><span class=\\"p\\">]</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">d</span> <span class=\\"o\\">-</span> <span class=\\"n\\">head</span><span class=\\"p\\">,</span> <span class=\\"n\\">s</span> <span class=\\"o\\">+</span> <span class=\\"n\\">head</span><span class=\\"p\\">,</span> <span class=\\"n\\">nd</span><span class=\\"p\\">,</span> <span class=\\"n\\">head</span><span class=\\"p\\">,</span> <span class=\\"n\\">head</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">head</span><span class=\\"p\\">]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">left</span><span class=\\"p\\">,</span> <span class=\\"n\\">maxseg</span><span class=\\"p\\">);</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">mina</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n        <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n        <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"n\\">left</span> <span class=\\"o\\">-</span> <span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">s</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">nd</span><span class=\\"p\\">,</span> <span class=\\"n\\">head</span><span class=\\"p\\">,</span> <span class=\\"n\\">i</span><span class=\\"p\\">);</span>\\n        <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">left</span> <span class=\\"o\\">==</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"k\\">break</span><span class=\\"p\\">;</span>\\n        <span class=\\"c1\\">// Or we have some i1 + i2 + ... = left = i,</span>\\n        <span class=\\"c1\\">// then we can just exchange them with i</span>\\n        <span class=\\"c1\\">// and get a valid solution</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">a</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">a</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">50</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">sum</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">a</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">a</span><span class=\\"p\\">]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">maxa</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">maxa</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">mina</span> <span class=\\"o\\">=</span> <span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">mina</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">maxa</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">sum</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">sum</span> <span class=\\"o\\">%</span> <span class=\\"n\\">i</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">dfs</span><span class=\\"p\\">(</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">sum</span><span class=\\"o\\">/</span><span class=\\"n\\">d</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">maxa</span><span class=\\"p\\">,</span> <span class=\\"n\\">maxa</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">sum</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":["dfs"],"title":"洛谷P1120 小木棍","updated_at":"2020-07-29T16:27:47+08:00","url":"/docs/acm/search/luogu-1120"}')}}]);
//# sourceMappingURL=chunk-2d0db331.79aff69d.js.map