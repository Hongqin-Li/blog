(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ae98"],{be10:function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"Once Petya read a problem about a bracket sequence. He gave it much thought but didn\'t find a solution. Today you will face it.","html":"<p>Once Petya read a problem about a bracket sequence. He gave it much thought but didn\'t find a solution. Today you will face it.</p>\\n<p>You are given string <script type=\\"math/tex\\">s<\/script>. It represents a correct bracket sequence. A correct bracket sequence is the sequence of opening (\\"(\\") and closing (\\")\\") brackets, such that it is possible to obtain a correct mathematical expression from it, inserting numbers and operators between the brackets. For example, such sequences as \\"(())()\\" and \\"()\\" are correct bracket sequences and such sequences as \\")()\\" and \\"(()\\" are not.</p>\\n<p>In a correct bracket sequence each bracket corresponds to the matching bracket (an opening bracket corresponds to the matching closing bracket and vice versa). For example, in a bracket sequence shown of the figure below, the third bracket corresponds to the matching sixth one and the fifth bracket corresponds to the fourth one.</p>\\n<p>You are allowed to color some brackets in the bracket sequence so as all three conditions are fulfilled:</p>\\n<ul>\\n<li>Each bracket is either not colored any color, or is colored red, or is colored blue.</li>\\n<li>For any pair of matching brackets exactly one of them is colored. In other words, for any bracket the following is true: either it or the matching bracket that corresponds to it is colored.</li>\\n<li>No two neighboring colored brackets have the same color.</li>\\n</ul>\\n<p>Find the number of different ways to color the bracket sequence. The ways should meet the above-given conditions. Two ways of coloring are considered different if they differ in the color of at least one bracket. As the result can be quite large, print it modulo <script type=\\"math/tex\\">1000000007(10^{9}+7)<\/script>.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line contains the single string <script type=\\"math/tex\\">s ( 2\\\\le |s|\\\\le 700)<\/script> which represents a correct bracket sequence.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>Print the only number  the number of ways to color the bracket sequence that meet the above given conditions modulo <script type=\\"math/tex\\">1000000007(10^{9}+7)<\/script>.</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>(())\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>12\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>(()())\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>40\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>()\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>4\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>dp转移只有两种情况，一是套上一个括号序列 <code>Item::up</code>，二是与前面的括号序列相接 <code>Item::merge</code>。然后维护每个子序列左右都未染色 <code>f0</code>、只有左边染色 <code>fl1</code>、只有右边染色 <code>fr1</code>、两边异色 <code>f2</code>、两边同色 <code>f3</code>即可。整个过程用栈来处理括号序列即可。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">typedef</span> <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span> <span class=\\"n\\">ll</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">M</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e9</span><span class=\\"o\\">+</span><span class=\\"mi\\">7</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1000</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">char</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">t</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">f0</span><span class=\\"p\\">,</span> <span class=\\"n\\">fl1</span><span class=\\"p\\">,</span> <span class=\\"n\\">fr1</span><span class=\\"p\\">,</span> <span class=\\"n\\">f2</span><span class=\\"p\\">,</span> <span class=\\"n\\">f3</span><span class=\\"p\\">;</span>\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">up</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">gl1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">f0</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">fr1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">fl1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">f2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">f3</span><span class=\\"p\\">,</span>\\n       <span class=\\"n\\">gr1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">f0</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">fl1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">fr1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">f2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">f3</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">f0</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">fl1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">gl1</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">fr1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">gr1</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">f2</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">f3</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">merge</span><span class=\\"p\\">(</span><span class=\\"n\\">Item</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">o</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">ll</span> <span class=\\"n\\">g0</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">f0</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fl1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f0</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">fr1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f0</span> <span class=\\"o\\">+</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fl1</span><span class=\\"p\\">)</span> <span class=\\"o\\">%</span> <span class=\\"n\\">M</span><span class=\\"p\\">),</span>\\n       <span class=\\"n\\">gl1</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">fl1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f0</span><span class=\\"o\\">+</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fl1</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">((</span><span class=\\"n\\">f2</span><span class=\\"o\\">+</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f0</span> <span class=\\"o\\">+</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fl1</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">),</span>\\n       <span class=\\"n\\">gr1</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">f0</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span> <span class=\\"o\\">+</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">fr1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">fr1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">),</span>\\n       <span class=\\"n\\">g2</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">fl1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">f2</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">f3</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">),</span>\\n       <span class=\\"n\\">g3</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">fl1</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">f2</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"p\\">(</span><span class=\\"n\\">f3</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">+</span><span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"p\\">)</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">f0</span> <span class=\\"o\\">=</span> <span class=\\"n\\">g0</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">fl1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">gl1</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">fr1</span> <span class=\\"o\\">=</span> <span class=\\"n\\">gr1</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">f2</span> <span class=\\"o\\">=</span> <span class=\\"n\\">g2</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">,</span> <span class=\\"n\\">f3</span> <span class=\\"o\\">=</span> <span class=\\"n\\">g3</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">};</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%s&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">s</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"n\\">strlen</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">stack</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">Item</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">st</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39;(&#39;</span><span class=\\"p\\">)</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">({</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">});</span>\\n    <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">t</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"k\\">auto</span> <span class=\\"n\\">t</span> <span class=\\"o\\">=</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">();</span>\\n        <span class=\\"n\\">t</span><span class=\\"p\\">.</span><span class=\\"n\\">up</span><span class=\\"p\\">();</span>\\n        <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n        <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">t</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">merge</span><span class=\\"p\\">(</span><span class=\\"n\\">t</span><span class=\\"p\\">);</span>\\n        <span class=\\"k\\">else</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">(</span><span class=\\"n\\">t</span><span class=\\"p\\">);</span>\\n      <span class=\\"p\\">}</span>\\n      <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n        <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n        <span class=\\"n\\">Item</span> <span class=\\"n\\">t</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">};</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">t</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span>\\n          <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">merge</span><span class=\\"p\\">(</span><span class=\\"n\\">t</span><span class=\\"p\\">);</span>\\n        <span class=\\"k\\">else</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">(</span><span class=\\"n\\">t</span><span class=\\"p\\">);</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">auto</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">();</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">.</span><span class=\\"n\\">f0</span> <span class=\\"o\\">+</span> <span class=\\"n\\">i</span><span class=\\"p\\">.</span><span class=\\"n\\">fl1</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">i</span><span class=\\"p\\">.</span><span class=\\"n\\">fr1</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">i</span><span class=\\"p\\">.</span><span class=\\"n\\">f2</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span> <span class=\\"o\\">+</span> <span class=\\"n\\">i</span><span class=\\"p\\">.</span><span class=\\"n\\">f3</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%lld&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ans</span><span class=\\"o\\">%</span><span class=\\"n\\">M</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"dp","url":"/tags/dp"}],"title":"CF-149D Coloring Brackets","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/acm/dp/cf-149d"}')}}]);
//# sourceMappingURL=chunk-2d21ae98.a19097d5.js.map