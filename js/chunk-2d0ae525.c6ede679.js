(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae525"],{"0a20":function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"A group of cows grabbed a truck and ventured on an expedition deep into the jungle. Being rather poor drivers, the cows unfortunately managed to run over a rock and puncture the truck\'s fuel tank. The truck now leaks one unit of fuel every unit of distance it travels.","html":"<p>A group of cows grabbed a truck and ventured on an expedition deep into the jungle. Being rather poor drivers, the cows unfortunately managed to run over a rock and puncture the truck\'s fuel tank. The truck now leaks one unit of fuel every unit of distance it travels.</p>\\n<p>To repair the truck, the cows need to drive to the nearest town (no more than 1,000,000 units distant) down a long, winding road. On this road, between the town and the current location of the truck, there are N (1 &lt;= N &lt;= 10,000) fuel stops where the cows can stop to acquire additional fuel (1..100 units at each stop).</p>\\n<p>The jungle is a dangerous place for humans and is especially dangerous for cows. Therefore, the cows want to make the minimum possible number of stops for fuel on the way to the town. Fortunately, the capacity of the fuel tank on their truck is so large that there is effectively no limit to the amount of fuel it can hold. The truck is currently L units away from the town and has P units of fuel (1 &lt;= P &lt;= 1,000,000).</p>\\n<p>Determine the minimum number of stops needed to reach the town, or if the cows cannot reach the town at all.</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line of the input contains an integer t representing the number of test cases. Then t test cases follow. Each test case has the follwing form:</p>\\n<ul>\\n<li>Line 1: A single integer, N</li>\\n<li>Lines 2..N+1: Each line contains two space-separated integers describing a fuel stop: The first integer is the distance from the town to the stop; the second is the amount of fuel available at that stop.</li>\\n<li>Line N+2: Two space-separated integers, L and P</li>\\n</ul>\\n<h2 id=\\"output\\">Output</h2>\\n<p>For each test case, output a single integer giving the minimum number of fuel stops necessary to reach the town. If it is not possible to reach the town, output -1.</p>\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>2\\n4\\n4 4\\n5 2\\n11 5\\n15 10\\n25 10\\n2\\n3 1\\n6 2\\n6 4\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>2\\n1\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>贪心，先让车一直开到没油，然后再从之前已经过的加油站中选一个油最多的加入，直到车的油量大于等于0，然后继续开。复杂度 <script type=\\"math/tex\\">O(n\\\\log n)<\/script>。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e4</span><span class=\\"o\\">+</span><span class=\\"mi\\">3</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Node</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">f</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n  <span class=\\"kt\\">bool</span> <span class=\\"k\\">operator</span><span class=\\"o\\">&lt;</span><span class=\\"p\\">(</span><span class=\\"k\\">const</span> <span class=\\"n\\">Node</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">o</span><span class=\\"p\\">)</span> <span class=\\"k\\">const</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">f</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">o</span><span class=\\"p\\">.</span><span class=\\"n\\">f</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">solve</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">};</span>\\n  <span class=\\"n\\">sort</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">,</span> <span class=\\"n\\">node</span><span class=\\"o\\">+</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"p\\">[](</span><span class=\\"n\\">Node</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">lhs</span><span class=\\"p\\">,</span> <span class=\\"n\\">Node</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">return</span> <span class=\\"n\\">lhs</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">});</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">cnt</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">pred</span> <span class=\\"o\\">=</span> <span class=\\"n\\">l</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">priority_queue</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">Node</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">pq</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">p</span> <span class=\\"o\\">-=</span> <span class=\\"n\\">pred</span> <span class=\\"o\\">-</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">0</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">())</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">p</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">().</span><span class=\\"n\\">f</span><span class=\\"p\\">;</span>\\n      <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n      <span class=\\"n\\">cnt</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">p</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">(</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n    <span class=\\"n\\">pred</span> <span class=\\"o\\">=</span> <span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">cnt</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">nt</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">nt</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">nt</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">d</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">node</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">f</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">l</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">p</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">solve</span><span class=\\"p\\">());</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"greedy","url":"/tags/greedy"}],"title":"SPOJ-348 EXPEDI - Expedition","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/acm/greedy/spoj-348"}')}}]);
//# sourceMappingURL=chunk-2d0ae525.c6ede679.js.map