(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cebfe"],{"617d":function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"Take all existing trademarks and find the longest common sequence of letters that is contained in all of them.","html":"<p>Take all existing trademarks and find the longest common sequence of letters that is contained in all of them.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The input contains several tasks. Each task begins with a line containing a positive integer <script type=\\"math/tex\\">N<\/script>, the number of trademarks (<script type=\\"math/tex\\">2 \\\\le N \\\\le 4000<\/script>). The number is followed by <script type=\\"math/tex\\">N<\/script> lines, each containing one trademark. Trademarks will be composed only from lowercase letters, the length of each trademark will be at least <script type=\\"math/tex\\">1<\/script> and at most <script type=\\"math/tex\\">200<\/script> characters.</p>\\n<p>After the last trademark, the next task begins. The last task is followed by a line containing zero.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>For each task, output a single line containing the longest string contained as a substring in all trademarks. If there are several strings of the same length, print the one that is lexicographically smallest. If there is no such non-empty string, output the words “IDENTITY LOST” instead.</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>3\\naabbaabb\\nabbababb\\nbbbbbabb\\n2\\nxyz\\nabc\\n3\\nbabab\\ncabababc\\nabcababab\\n1\\nabcdabc\\n3\\na\\nb\\nc\\n0\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>abb\\nIDENTITY LOST\\nbabab\\nabcdabc\\nIDENTITY LOST\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>类似 <a href=\\"poj-3294\\">POJ-3294</a>，后缀数组 + 二分即可。后缀数组一直 TLE 的原因可能是 swap 了那两个全局数组，而不是指针。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84\\n85\\n86\\n87\\n88\\n89\\n90\\n91</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;cstdio&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;cstring&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;algorithm&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">G</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">4003</span><span class=\\"p\\">,</span> <span class=\\"n\\">N</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">8e5</span><span class=\\"o\\">+</span><span class=\\"n\\">G</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">ng</span><span class=\\"p\\">,</span> <span class=\\"n\\">group</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">rnk</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">],</span> <span class=\\"n\\">rrnk</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">rsort</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">r</span><span class=\\"p\\">[])</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">static</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n  <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">cnt</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"o\\">*</span><span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]));</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"o\\">--</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">build</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"o\\">*</span><span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rnk</span><span class=\\"p\\">,</span> <span class=\\"o\\">*</span><span class=\\"n\\">rr</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rrnk</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">])),</span> <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">rr</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]));</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">rsort</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">*=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">-</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">rsort</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">),</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rr</span><span class=\\"p\\">),</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]]</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"o\\">++</span><span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">k</span> <span class=\\"o\\">--</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">];</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">valid</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">static</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">G</span><span class=\\"p\\">],</span> <span class=\\"n\\">t</span><span class=\\"p\\">;</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">ht</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">cnt</span> <span class=\\"o\\">==</span> <span class=\\"n\\">ng</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n      <span class=\\"n\\">cnt</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">t</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">g</span> <span class=\\"o\\">=</span> <span class=\\"n\\">group</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]];</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">g</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">g</span><span class=\\"p\\">]</span> <span class=\\"o\\">!=</span> <span class=\\"n\\">t</span><span class=\\"p\\">)</span> <span class=\\"n\\">vis</span><span class=\\"p\\">[</span><span class=\\"n\\">g</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">t</span><span class=\\"p\\">,</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">char</span> <span class=\\"n\\">ss</span><span class=\\"p\\">[</span><span class=\\"mi\\">300</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"o\\">~</span><span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">ng</span><span class=\\"p\\">)</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">ng</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">minl</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">200</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">128</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">ng</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%s&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ss</span><span class=\\"p\\">);</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">ns</span> <span class=\\"o\\">=</span> <span class=\\"n\\">strlen</span><span class=\\"p\\">(</span><span class=\\"n\\">ss</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">minl</span> <span class=\\"o\\">=</span> <span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">minl</span><span class=\\"p\\">,</span> <span class=\\"n\\">ns</span><span class=\\"p\\">);</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">ns</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"n\\">group</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n        <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ss</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">];</span>\\n      <span class=\\"p\\">}</span>\\n      <span class=\\"n\\">group</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"n\\">build</span><span class=\\"p\\">();</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">minl</span><span class=\\"p\\">,</span> <span class=\\"n\\">si</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">r</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"o\\">+</span><span class=\\"n\\">r</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span><span class=\\"o\\">/</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"n\\">valid</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">res</span> <span class=\\"o\\">!=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">l</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">si</span> <span class=\\"o\\">=</span> <span class=\\"n\\">res</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">else</span> <span class=\\"n\\">r</span> <span class=\\"o\\">=</span> <span class=\\"n\\">m</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">l</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">l</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">putchar</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">si</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n      <span class=\\"n\\">putchar</span><span class=\\"p\\">(</span><span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">else</span> <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;IDENTITY LOST</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"strings","url":"/tags/strings"},{"name":"divide-and-conquer","url":"/tags/divide-and-conquer"}],"title":"POJ-3450 Corporate Identity","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/strings/suffix-array/poj-3450"}')}}]);
//# sourceMappingURL=chunk-2d0cebfe.a9f0f77d.js.map