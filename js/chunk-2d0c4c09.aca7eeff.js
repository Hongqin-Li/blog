(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4c09"],{"3bbf":function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"Given a sequence, $\\\\{A_1, A_2, ..., A_n\\\\}$ which is guaranteed $A_1 > A_i, \\\\forall i > 1$ and $-2^31 < A_i < 2^31$, you are to cut it into three non-empty sub-sequences and reverse them separately to form a new one which is the smallest possible sequence in alphabet order.","html":"<p>Given a sequence, <script type=\\"math/tex\\">\\\\{A_1, A_2, ..., A_n\\\\}<\/script> which is guaranteed <script type=\\"math/tex\\">A_1 > A_i, \\\\forall i > 1<\/script> and <script type=\\"math/tex\\">-2^31 < A_i < 2^31<\/script>, you are to cut it into three non-empty sub-sequences and reverse them separately to form a new one which is the smallest possible sequence in alphabet order.</p>\\n<p>The alphabet order is defined as follows: for two sequence <script type=\\"math/tex\\">\\\\{A_1, A_2, ..., A_n\\\\}<\/script> and <script type=\\"math/tex\\">\\\\{B_1, B_2, ..., B_n\\\\}<\/script>, we say <script type=\\"math/tex\\">\\\\{A_1, A_2, ..., A_n\\\\}<\/script> is smaller than <script type=\\"math/tex\\">\\\\{B_1, B_2, ..., B_n\\\\}<\/script> if and only if there exists such <script type=\\"math/tex\\">i<\/script> (<script type=\\"math/tex\\">1 \\\\le i \\\\le n<\/script>) so that we have <script type=\\"math/tex\\">A_i < B_i<\/script> and <script type=\\"math/tex\\">A_j = B_j<\/script> for each <script type=\\"math/tex\\">j < i<\/script>.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line contains <script type=\\"math/tex\\">n<\/script>. (<script type=\\"math/tex\\">n \\\\le 200000<\/script>)</p>\\n<p>The following <script type=\\"math/tex\\">n<\/script> lines contain the sequence.</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>Output <script type=\\"math/tex\\">n<\/script> lines which is the smallest possible sequence obtained.</p>\\n<h2 id=\\"examples\\">Examples</h2>\\n<p>Input 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>5\\n10\\n1\\n2\\n3\\n4\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 1:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1\\n10\\n2\\n4\\n3\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>7\\n10 0 2 2 2 2 1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 2:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>0\\n10\\n2\\n1\\n2\\n2\\n2\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Input 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>7\\n2147483647 -2147483647 0 0 0 0 1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>Output 3:</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>-2147483647\\n2147483647\\n0\\n0\\n0\\n0\\n1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>后缀数组好题</p>\\n<p>由于 <script type=\\"math/tex\\">A_1<\/script> 是最大的，可以证明，第一组就是最小前缀</p>\\n<p>然后对于剩下两组，不难发现，分别反序输出后其实就是，剩下的子串重复两次后的某个前缀，求其其最小前缀即可</p>\\n<p>由于数据范围比较大，需要先离散化一下</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;iostream&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;algorithm&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;vector&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;cstring&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">N</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">4e5</span><span class=\\"o\\">+</span><span class=\\"mi\\">3</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">],</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">],</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"o\\">*</span><span class=\\"mi\\">2</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">N</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">rsort</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">(</span><span class=\\"n\\">m</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"o\\">--</span><span class=\\"n\\">cnt</span><span class=\\"p\\">[</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&amp;</span> <span class=\\"n\\">s</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">(),</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"o\\">*</span><span class=\\"n\\">max_element</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">())</span> <span class=\\"o\\">+</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">])),</span> <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">rr</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">2</span><span class=\\"o\\">*</span><span class=\\"n\\">n</span><span class=\\"o\\">*</span><span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]));</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">rsort</span><span class=\\"p\\">();</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">*=</span> <span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span> <span class=\\"o\\">=</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">k</span><span class=\\"p\\">)</span> <span class=\\"n\\">idx</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">-</span><span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">rsort</span><span class=\\"p\\">(),</span> <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">r</span><span class=\\"p\\">,</span> <span class=\\"n\\">rr</span><span class=\\"p\\">),</span> <span class=\\"n\\">p</span> <span class=\\"o\\">=</span> <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">r</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]]</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"n\\">rr</span><span class=\\"p\\">[</span><span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"o\\">++</span><span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">discretize</span><span class=\\"p\\">(</span><span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">a</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">d</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">res</span> <span class=\\"o\\">=</span> <span class=\\"n\\">a</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">sort</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">());</span>\\n  <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">resize</span><span class=\\"p\\">(</span><span class=\\"n\\">unique</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">())</span> <span class=\\"o\\">-</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">());</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">res</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">lower_bound</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">end</span><span class=\\"p\\">(),</span> <span class=\\"n\\">res</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"o\\">-</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">()</span> <span class=\\"o\\">+</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">res</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cin</span> <span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"o\\">-</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">a</span> <span class=\\"o\\">=</span> <span class=\\"n\\">discretize</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">);</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">b</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">(),</span> <span class=\\"n\\">a</span><span class=\\"p\\">.</span><span class=\\"n\\">begin</span><span class=\\"p\\">()</span><span class=\\"o\\">+</span><span class=\\"n\\">j</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">j</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">b</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n\\n  <span class=\\"n\\">build</span><span class=\\"p\\">(</span><span class=\\"n\\">b</span><span class=\\"p\\">);</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">jj</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">jj</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">j</span> <span class=\\"o\\">||</span> <span class=\\"n\\">jj</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">jj</span> <span class=\\"o\\">=</span> <span class=\\"n\\">sa</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">j</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">();</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">jj</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">j</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">jj</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">cout</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&lt;&lt;</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"strings","url":"/tags/strings"}],"title":"POJ-3581 Sequence","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/strings/suffix-array/poj-3581"}')}}]);
//# sourceMappingURL=chunk-2d0c4c09.aca7eeff.js.map