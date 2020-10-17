(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b851"],{bfb9:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"Farmer John has noticed that the quality of milk given by his cows varies from day to day. On further investigation, he discovered that although he can\'t predict the quality of milk from one day to the next, there are some regular patterns in the daily milk quality.","html":"<p>Farmer John has noticed that the quality of milk given by his cows varies from day to day. On further investigation, he discovered that although he can\'t predict the quality of milk from one day to the next, there are some regular patterns in the daily milk quality.</p>\\n<p>To perform a rigorous study, he has invented a complex classification scheme by which each milk sample is recorded as an integer between 0 and 1,000,000 inclusive, and has recorded data from a single cow over N (1 ≤ N ≤ 20,000) days. He wishes to find the longest pattern of samples which repeats identically at least K (2 ≤ K ≤ N) times. This may include overlapping patterns -- 1 2 3 2 3 2 3 1 repeats 2 3 2 3 twice, for example.</p>\\n<p>Help Farmer John by finding the longest repeating subsequence in the sequence of samples. It is guaranteed that at least one subsequence is repeated at least K times.</p>\\n<p>农夫John发现他的奶牛产奶的质量一直在变动。经过细致的调查，他发现：虽然他不能预见明天产奶的质量，但连续的若干天的质量有很多重叠。我们称之为一个“模式”。 John的牛奶按质量可以被赋予一个0到1000000之间的数。并且John记录了N(1&lt;=N&lt;=20000)天的牛奶质量值。他想知道最长的出现了至少K(2&lt;=K&lt;=N)次的模式的长度。比如1 2 3 2 3 2 3 1 中 2 3 2 3出现了两次。当K=2时，这个长度为4。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>Line 1: Two space-separated integers: N and K</p>\\n<p>Lines 2..N+1: N integers, one per line, the quality of the milk on day i appears on the ith line.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>求可重叠的最长重复子串，做法类似 <a href=\\"poj-1743\\">POJ-1743</a></p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">auto</span> <span class=\\"nf\\">suffix_array</span><span class=\\"p\\">(</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&amp;</span> <span class=\\"n\\">s</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">(),</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"o\\">*</span><span class=\\"n\\">max_element</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">())</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">sa</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">r</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">),</span> <span class=\\"n\\">rr</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">),</span> <span class=\\"n\\">idx</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">ht</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">auto</span> <span class=\\"n\\">rsort</span> <span class=\\"o\\">=</span> <span class=\\"p\\">[</span><span class=\\"o\\">&amp;</span><span class=\\"p\\">]()</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"o\\">--</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n  <span class=\\"p\\">};</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">rsort</span><span class=\\"p\\">();</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">*=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">i</span><span class=\\"p\\">:</span> <span class=\\"n\\">sa</span><span class=\\"p\\">)</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">rsort</span><span class=\\"p\\">(),</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rr</span><span class=\\"p\\">),</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]]</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"o\\">++</span><span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">k</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">];</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">make_tuple</span><span class=\\"p\\">(</span><span class=\\"n\\">sa</span><span class=\\"p\\">,</span> <span class=\\"n\\">ht</span><span class=\\"p\\">);</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">sa</span><span class=\\"p\\">,</span> <span class=\\"n\\">ht</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">tie</span><span class=\\"p\\">(</span><span class=\\"n\\">sa</span><span class=\\"p\\">,</span> <span class=\\"n\\">ht</span><span class=\\"p\\">)</span> <span class=\\"o\\">=</span> <span class=\\"n\\">suffix_array</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">auto</span> <span class=\\"n\\">valid</span> <span class=\\"o\\">=</span> <span class=\\"p\\">[</span><span class=\\"o\\">&amp;</span><span class=\\"p\\">](</span><span class=\\"kt\\">int</span> <span class=\\"n\\">len</span><span class=\\"p\\">)</span> <span class=\\"o\\">-&gt;</span> <span class=\\"kt\\">bool</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">len</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">else</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">cnt</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"nb\\">true</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">return</span> <span class=\\"nb\\">false</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">};</span>\\n\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">valid</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"p\\">))</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">l</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"strings","url":"/tags/strings"},{"name":"divide-and-conquer","url":"/tags/divide-and-conquer"}],"title":"USACO06-DEC Milk Patterns G","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/strings/suffix-array/luogu-2852"}')}}]);
//# sourceMappingURL=chunk-2d21b851.0effc705.js.map