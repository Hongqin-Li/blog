(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2080cc"],{a2af:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"我们称一个长度为 $2n$ 的数列是有趣的，当且仅当该数列满足以下三个条件：","html":"<p>我们称一个长度为 <script type=\\"math/tex\\">2n<\/script> 的数列是有趣的，当且仅当该数列满足以下三个条件：</p>\\n<ul>\\n<li>\\n<p>它是从 <script type=\\"math/tex\\">1 \\\\sim 2n<\/script> 共 <script type=\\"math/tex\\">2n<\/script> 个整数的一个排列 <script type=\\"math/tex\\">\\\\{a_n\\\\}_{n=1}^{2n}<\/script>；</p>\\n</li>\\n<li>\\n<p>所有的奇数项满足 <script type=\\"math/tex\\">a_1 < a_3 < \\\\dots < a_{2n-1}<\/script>，所有的偶数项满足 <script type=\\"math/tex\\">a_2 < a_4 < \\\\dots < a_{2n}<\/script>；</p>\\n</li>\\n<li>\\n<p>任意相邻的两项 <script type=\\"math/tex\\">a_{2i-1}<\/script> 与 <script type=\\"math/tex\\">a_{2i}<\/script> 满足：<script type=\\"math/tex\\">a_{2i-1} < a_{2i}<\/script>。</p>\\n</li>\\n</ul>\\n<p>对于给定的 <script type=\\"math/tex\\">n<\/script>，请求出有多少个不同的长度为 <script type=\\"math/tex\\">2n<\/script> 的有趣的数列。</p>\\n<p>因为最后的答案可能很大，所以只要求输出答案对 <script type=\\"math/tex\\">p<\/script> 取模。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>一行两个正整数 <script type=\\"math/tex\\">n,p<\/script>\\n</p>\\n<p>\\n<script type=\\"math/tex\\">1\\\\le n \\\\le 10^6<\/script>，<script type=\\"math/tex\\">1\\\\le p \\\\le 10^9<\/script>\\n</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>输出一行一个整数表示答案。</p>\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>若 <script type=\\"math/tex\\">i<\/script> 出现在奇数列中，则表示为 <code>push</code>，否则表示 <code>pop</code>，可以证明，符合题意的数列和 <script type=\\"math/tex\\">n<\/script> 个不同元素依次进栈的出栈序列一一对应，于是答案为卡特兰数。</p>\\n<p>处理组合数时，需要一点约分小技巧。先线性筛出所有质数（同时也得到了所有数的最小质因子），然后统计每个因子的次数，如果因子为合数，则可以下传到它除以最小质因子的那个数上，具体可见代码。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">using</span> <span class=\\"n\\">ll</span> <span class=\\"o\\">=</span> <span class=\\"kt\\">long</span> <span class=\\"kt\\">long</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"n\\">ll</span> <span class=\\"nf\\">qpow</span><span class=\\"p\\">(</span><span class=\\"n\\">ll</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">ll</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">a</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(;</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;&gt;=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">&amp;</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"n\\">res</span><span class=\\"o\\">*</span><span class=\\"n\\">a</span> <span class=\\"o\\">%</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">a</span> <span class=\\"o\\">=</span> <span class=\\"n\\">a</span><span class=\\"o\\">*</span><span class=\\"n\\">a</span> <span class=\\"o\\">%</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">res</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">prime</span><span class=\\"p\\">,</span> <span class=\\"n\\">mp</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"n\\">prime</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">),</span> <span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"n\\">prime</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"o\\">*</span><span class=\\"n\\">p</span> <span class=\\"o\\">&gt;</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"k\\">break</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">*</span><span class=\\"n\\">p</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">%</span> <span class=\\"n\\">p</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"k\\">break</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">!=</span> <span class=\\"n\\">i</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n      <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">/</span><span class=\\"n\\">mp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"n\\">ll</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">x</span><span class=\\"p\\">:</span> <span class=\\"n\\">prime</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ans</span><span class=\\"o\\">*</span><span class=\\"n\\">qpow</span><span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">x</span><span class=\\"p\\">],</span> <span class=\\"n\\">p</span><span class=\\"p\\">)</span> <span class=\\"o\\">%</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">ans</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"combinatorics","url":"/tags/combinatorics"},{"name":"number theory","url":"/tags/number-theory"}],"title":"HNOI-2009 有趣的数列","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/combinatorics/catalan-numbers/luogu-3200"}')}}]);
//# sourceMappingURL=chunk-2d2080cc.6268d39a.js.map