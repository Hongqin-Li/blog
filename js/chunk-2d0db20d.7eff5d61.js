(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db20d"],{"6f18":function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"为了提高智商，ZJY 开始学习概率论。有一天，她想到了这样一个问题：对于一棵随机生成的 $n$ 个结点的有根二叉树（所有互相不同构的形态等概率出现），它的叶子节点数的期望是多少呢？","html":"<p>为了提高智商，ZJY 开始学习概率论。有一天，她想到了这样一个问题：对于一棵随机生成的 <script type=\\"math/tex\\">n<\/script> 个结点的有根二叉树（所有互相不同构的形态等概率出现），它的叶子节点数的期望是多少呢？</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>输入一个正整数 <script type=\\"math/tex\\">n<\/script>，表示有根树的结点数。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>输出这棵树期望的叶子节点数，要求误差小于 <script type=\\"math/tex\\">10^{-9}<\/script>。</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1.000000000\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1.200000000\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>首先，令 <script type=\\"math/tex\\">f_n<\/script> 为答案，<script type=\\"math/tex\\">h_n<\/script> 为卡特兰数，递推一下有 <script type=\\"math/tex\\">f_n h_n = \\\\sum h_{i-1} h_{n-i} (f_{i-1} + f_{n-i})<\/script>．然后令 <script type=\\"math/tex\\">g_n = f_n h_n<\/script>，化简一下上式可得 <script type=\\"math/tex\\">g_n = 2\\\\sum h_{n-i} g_{i-1}<\/script>．由于这是个卷积，而卡特兰数列的生成函数已知，即 <script type=\\"math/tex\\">H(x)=\\\\sum h_n x^n = \\\\frac{1-\\\\sqrt{1-4x}}{2x}<\/script>，于是我们可以用生成函数的方法求得 <script type=\\"math/tex\\">g_n<\/script>．</p>\\n<p>首先令 <script type=\\"math/tex\\">G(x) = \\\\sum g_n x^n<\/script>，则 <script type=\\"math/tex\\">G(x)H(x)=\\\\frac{G(x)-x}{2x}<\/script>，代入 <script type=\\"math/tex\\">H(x)<\/script> 并进行分母有理化得 <script type=\\"math/tex\\">G(x)=\\\\frac{1}{4} \\\\left( (1-4x)^{-\\\\frac{1}{2}} - (1-4x)^{\\\\frac{1}{2}} \\\\right)<\/script>，将 <script type=\\"math/tex\\">(1-4x)^k<\/script> 用二项式定理展开并化简得到 <script type=\\"math/tex\\">G(x)=\\\\frac{-1}{4}\\\\sum \\\\binom{-\\\\frac{1}{2}}{k-1} (-4x)^k<\/script>，于是整理一下各项系数为 <script type=\\"math/tex\\">g_n = \\\\frac{(2n-3)!!}{(n-1)!} 2^{n-1}<\/script>．最后除掉 <script type=\\"math/tex\\">h_n=\\\\frac{\\\\binom{2n}{n}}{n+1}<\/script> 可得 <script type=\\"math/tex\\">f_n=\\\\frac{g_n}{h_n}=\\\\frac{n(n+1)}{2(2n-1)}<\/script>．</p>\\n<p>据说可以用 Lagarange 反演，<del>然而我并不会</del></p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">double</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">fixed</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">setprecision</span><span class=\\"p\\">(</span><span class=\\"mi\\">10</span><span class=\\"p\\">)</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"o\\">/</span><span class=\\"p\\">(</span><span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"combinatorics","url":"/tags/combinatorics"},{"name":"probability","url":"/tags/probability"}],"title":"TJOI-2015 概率论","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/combinatorics/catalan-numbers/luogu-3978"}')}}]);
//# sourceMappingURL=chunk-2d0db20d.7eff5d61.js.map