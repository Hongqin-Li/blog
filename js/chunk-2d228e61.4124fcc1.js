(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228e61"],{dac1:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"A string s is called an (k,l)-repeat if s is obtained by concatenating k>=1 times some seed string t with length l>=1. For example, the string","html":"<p>A string s is called an (k,l)-repeat if s is obtained by concatenating k&gt;=1 times some seed string t with length l&gt;=1. For example, the string</p>\\n<p>s = abaabaabaaba</p>\\n<p>is a (4,3)-repeat with t = aba as its seed string. That is, the seed string t is 3 characters long, and the whole string s is obtained by repeating t 4 times.</p>\\n<p>Write a program for the following task: Your program is given a long string u consisting of characters ‘a’ and/or ‘b’ as input. Your program must find some (k,l)-repeat that occurs as substring within u with k as large as possible. For example, the input string</p>\\n<p>u = babbabaabaabaabab</p>\\n<p>contains the underlined (4,3)-repeat s starting at position 5. Since u contains no other contiguous substring with more than 4 repeats, your program must output the maximum k.</p>\\n<p>给定字符串，求重复次数最多的连续重复子串</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>In the first line of the input contains H- the number of test cases (H &lt;= 20). H test cases follow. First line of each test cases is n - length of the input string (n &lt;= 50000), The next n lines contain the input string, one character (either ‘a’ or ‘b’) per line, in order.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>For each test cases, you should write exactly one interger k in a line - the repeat count that is maximized.</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input (lines of input string are compressed into single line)</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>2\\n17\\nb a b b a b a a b a a b a a b a b\\n25\\na b a a a b b b a a b a b b b a a a b b b b b a a\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>4\\n5\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>后缀数组经典例题之一，具体方法详见：罗穗骞《后缀数组——处理字符串的有力工具》</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84\\n85\\n86\\n87\\n88\\n89\\n90\\n91\\n92\\n93\\n94\\n95</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">ST</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">lg</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">f</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ST</span><span class=\\"p\\">()</span> <span class=\\"p\\">{}</span>\\n  <span class=\\"n\\">ST</span><span class=\\"p\\">(</span><span class=\\"k\\">const</span> <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&amp;</span> <span class=\\"n\\">a</span><span class=\\"p\\">)</span><span class=\\"o\\">:</span> <span class=\\"n\\">n</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()),</span> <span class=\\"n\\">lg</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">),</span> <span class=\\"n\\">f</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">lg</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">lg</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">&gt;&gt;</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">resize</span><span class=\\"p\\">(</span><span class=\\"n\\">lg</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"mi\\">0</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">].</span><span class=\\"n\\">size</span><span class=\\"p\\">();</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">],</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"p\\">(</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)))][</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">query_min</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"n\\">lg</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"o\\">-</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">return</span> <span class=\\"nf\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">l</span><span class=\\"p\\">][</span><span class=\\"n\\">k</span><span class=\\"p\\">],</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"o\\">&lt;&lt;</span><span class=\\"n\\">k</span><span class=\\"p\\">)][</span><span class=\\"n\\">k</span><span class=\\"p\\">]);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">};</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">SuffixArray</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">sa</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rr</span><span class=\\"p\\">,</span> <span class=\\"n\\">idx</span><span class=\\"p\\">,</span> <span class=\\"n\\">ht</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ST</span> <span class=\\"n\\">st</span><span class=\\"p\\">;</span>\\n\\n  <span class=\\"n\\">SuffixArray</span><span class=\\"p\\">(</span><span class=\\"n\\">string</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">s</span><span class=\\"p\\">)</span><span class=\\"o\\">:</span> <span class=\\"n\\">n</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()),</span> <span class=\\"n\\">sa</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">r</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">),</span> <span class=\\"n\\">rr</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">),</span> <span class=\\"n\\">idx</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">),</span> <span class=\\"n\\">ht</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"o\\">*</span><span class=\\"n\\">max_element</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">())</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">auto</span> <span class=\\"n\\">rsort</span> <span class=\\"o\\">=</span> <span class=\\"p\\">[</span><span class=\\"o\\">&amp;</span><span class=\\"p\\">]()</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"o\\">--</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n    <span class=\\"p\\">};</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">rsort</span><span class=\\"p\\">();</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">*=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">i</span><span class=\\"p\\">:</span> <span class=\\"n\\">sa</span><span class=\\"p\\">)</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">rsort</span><span class=\\"p\\">(),</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rr</span><span class=\\"p\\">),</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]]</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"o\\">++</span><span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">k</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n        <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">];</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n      <span class=\\"p\\">}</span>\\n      <span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">st</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ST</span><span class=\\"p\\">(</span><span class=\\"n\\">ht</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">lcp</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">j</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">==</span> <span class=\\"n\\">j</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">ri</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">rj</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ri</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">rj</span><span class=\\"p\\">)</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">ri</span><span class=\\"p\\">,</span> <span class=\\"n\\">rj</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">st</span><span class=\\"p\\">.</span><span class=\\"n\\">query_min</span><span class=\\"p\\">(</span><span class=\\"n\\">ri</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">rj</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">};</span>\\n\\n<span class=\\"kt\\">char</span> <span class=\\"nf\\">get1</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">char</span> <span class=\\"n\\">c</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">((</span><span class=\\"n\\">c</span> <span class=\\"o\\">=</span> <span class=\\"n\\">getchar</span><span class=\\"p\\">())</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span> <span class=\\"o\\">||</span> <span class=\\"n\\">c</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39; &#39;</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">c</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">nt</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">nt</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">nt</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">string</span> <span class=\\"n\\">s</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"sc\\">&#39; &#39;</span><span class=\\"p\\">),</span> <span class=\\"n\\">rs</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"sc\\">&#39; &#39;</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rs</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">get1</span><span class=\\"p\\">();</span>\\n\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">SuffixArray</span> <span class=\\"n\\">s1</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">),</span> <span class=\\"n\\">s2</span><span class=\\"p\\">(</span><span class=\\"n\\">rs</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">l</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">+</span> <span class=\\"n\\">l</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span> <span class=\\"o\\">+</span> <span class=\\"n\\">l</span><span class=\\"p\\">;</span> \\n        <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">ans</span><span class=\\"p\\">,</span> <span class=\\"p\\">(</span><span class=\\"n\\">s1</span><span class=\\"p\\">.</span><span class=\\"n\\">lcp</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">j</span><span class=\\"p\\">)</span> <span class=\\"o\\">+</span> <span class=\\"n\\">s2</span><span class=\\"p\\">.</span><span class=\\"n\\">lcp</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"n\\">j</span><span class=\\"p\\">)</span> <span class=\\"o\\">-</span> <span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"n\\">l</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ans</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"strings","url":"/tags/strings"},{"name":"data structures","url":"/tags/data-structures"}],"title":"SPOJ-687 REPEATS - Repeats","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/strings/suffix-array/spoj-687"}')}}]);
//# sourceMappingURL=chunk-2d228e61.4124fcc1.js.map