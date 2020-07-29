(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c6a7"],{f2af:function(s){s.exports=JSON.parse('{"created_at":"2020-07-29T16:27:47+08:00","excerpt":"贝西终于尝到了懒惰的后果，决定每周从谷仓到池塘慢跑几次来健身。当然，她不想跑得太累，所以她只打算从谷仓慢跑下山到池塘，然后悠闲地散步回谷仓。","html":"<p>贝西终于尝到了懒惰的后果，决定每周从谷仓到池塘慢跑几次来健身。当然，她不想跑得太累，所以她只打算从谷仓慢跑下山到池塘，然后悠闲地散步回谷仓。</p>\\n<p>同时，贝西不想跑得太远，所以她只想沿着通向池塘的最短路径跑步。一共有 M 条道路，其中每一条都连接了两个牧场。这些牧场从 1 到 N 编号，如果 X &gt; Y，则说明牧场 X 的地势高于牧场 Y，即下坡的道路是从 X 通向 Y 的，N 为贝西所在的牛棚（最高点），1 为池塘（最低点）。</p>\\n<p>然而，一周之后，贝西开始对单调的路线感到厌烦，她希望可以跑不同的路线。比如说，她希望能有 K 种不同的路线。同时，为了避免跑得太累，她希望这 K 条路线是从牛棚到池塘的路线中最短的 K 条。如果两条路线包含的道路组成的序列不同，则这两条路线被认为是不同的。</p>\\n<p>请帮助贝西算算她的训练强度，即将牧场网络里最短的 KKK 条路径的长度分别算出来。你将会被提供一份牧场间路线的列表，每条道路用 <script type=\\"math/tex\\">(X_i, Y_i, D_i)<\/script> 表示，意为从 <script type=\\"math/tex\\">X_i<\/script> 到 <script type=\\"math/tex\\">Y_i<\/script> 有一条长度为 <script type=\\"math/tex\\">D_i<\/script> 的下坡道路。</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>第一行三个用空格分开的整数 N, M, K。第二行到第 M+1 行每行有三个用空格分开的整数 <script type=\\"math/tex\\">X_i,Y_i,D_i<\/script>，描述一条下坡的道路。</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>共 KKK 行，在第 iii 行输出第 iii 短的路线长度，如果不存在则输出 −1-1−1。如果出现多种有相同长度的路线，务必将其全部输出。</p>\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7\\n8\\n9</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"err\\">5 8 7 </span>\\n<span class=\\"err\\">5 4 1 </span>\\n<span class=\\"err\\">5 3 1 </span>\\n<span class=\\"err\\">5 2 1 </span>\\n<span class=\\"err\\">5 1 1 </span>\\n<span class=\\"err\\">4 3 4 </span>\\n<span class=\\"err\\">3 1 1 </span>\\n<span class=\\"err\\">3 2 1 </span>\\n<span class=\\"err\\">2 1 1 </span>\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5\\n6\\n7</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"err\\">1 </span>\\n<span class=\\"err\\">2 </span>\\n<span class=\\"err\\">2 </span>\\n<span class=\\"err\\">3 </span>\\n<span class=\\"err\\">6 </span>\\n<span class=\\"err\\">7 </span>\\n<span class=\\"err\\">-1 </span>\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>用A*算法解k短路。更具体地说，维护节点集合S，其中的每个节点u都表示了一条从s到u的不同的路径，每次从S中取出一个<strong>u代表的从s到u的路径的距离+u-t最短路长度</strong>最近的节点，并加入其相邻节点。显然，这种遍历方式可以遍历到所有s-t路，而且是按长度从小到大遍历到的，于是第k次搜到t即第k短路。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42\\n43\\n44\\n45\\n46\\n47\\n48\\n49\\n50\\n51\\n52\\n53\\n54\\n55\\n56\\n57\\n58\\n59\\n60\\n61\\n62\\n63\\n64\\n65\\n66\\n67\\n68\\n69\\n70\\n71\\n72\\n73\\n74\\n75\\n76\\n77\\n78\\n79\\n80\\n81\\n82\\n83\\n84</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1007</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXM</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">10007</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">INF</span> <span class=\\"o\\">=</span> <span class=\\"mf\\">1e9</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">q</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Graph</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">struct</span> <span class=\\"n\\">Edge</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">to</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">,</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXM</span><span class=\\"p\\">];</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">nedges</span><span class=\\"p\\">;</span>\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">addedge</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">w</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"o\\">++</span><span class=\\"n\\">nedges</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span><span class=\\"p\\">,</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]};</span>\\n    <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">nedges</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">fin</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n  <span class=\\"kt\\">void</span> <span class=\\"nf\\">dijkstra</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">s</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n      <span class=\\"kt\\">bool</span> <span class=\\"k\\">operator</span><span class=\\"o\\">&lt;</span><span class=\\"p\\">(</span><span class=\\"k\\">const</span> <span class=\\"n\\">Item</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">)</span> <span class=\\"k\\">const</span> <span class=\\"p\\">{</span>\\n        <span class=\\"k\\">return</span> <span class=\\"n\\">d</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">};</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">MAXN</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">INF</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">priority_queue</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">Item</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">pq</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">({</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">});</span>\\n    <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">s</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">empty</span><span class=\\"p\\">())</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">Item</span> <span class=\\"n\\">itm</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">();</span>\\n      <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">u</span> <span class=\\"o\\">=</span> <span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">fin</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n        <span class=\\"n\\">fin</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n        <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">nxt</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n          <span class=\\"kt\\">int</span> <span class=\\"n\\">v</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">to</span><span class=\\"p\\">,</span> <span class=\\"n\\">w</span> <span class=\\"o\\">=</span> <span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">w</span><span class=\\"p\\">;</span>\\n          <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">w</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">v</span><span class=\\"p\\">])</span>\\n            <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">({</span><span class=\\"n\\">v</span><span class=\\"p\\">,</span> <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">v</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">w</span><span class=\\"p\\">});</span>\\n        <span class=\\"p\\">}</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">g</span><span class=\\"p\\">,</span> <span class=\\"n\\">gi</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">astar</span><span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">t</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n    <span class=\\"kt\\">bool</span> <span class=\\"k\\">operator</span><span class=\\"o\\">&lt;</span><span class=\\"p\\">(</span><span class=\\"k\\">const</span> <span class=\\"n\\">Item</span><span class=\\"o\\">&amp;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">)</span> <span class=\\"k\\">const</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">return</span> <span class=\\"n\\">d</span> <span class=\\"o\\">+</span> <span class=\\"n\\">gi</span><span class=\\"p\\">.</span><span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">rhs</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span> <span class=\\"o\\">+</span> <span class=\\"n\\">gi</span><span class=\\"p\\">.</span><span class=\\"n\\">dist</span><span class=\\"p\\">[</span><span class=\\"n\\">rhs</span><span class=\\"p\\">.</span><span class=\\"n\\">u</span><span class=\\"p\\">];</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">};</span>\\n  <span class=\\"n\\">priority_queue</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">Item</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">pq</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">({</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">});</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">kshort</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">empty</span><span class=\\"p\\">())</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">Item</span> <span class=\\"n\\">itm</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">top</span><span class=\\"p\\">();</span>\\n    <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">pop</span><span class=\\"p\\">();</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">u</span> <span class=\\"o\\">=</span> <span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span> <span class=\\"o\\">=</span> <span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">d</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">u</span> <span class=\\"o\\">==</span> <span class=\\"n\\">t</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"n\\">kshort</span><span class=\\"p\\">.</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">kshort</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">()</span> <span class=\\"o\\">==</span> <span class=\\"n\\">q</span><span class=\\"p\\">)</span> <span class=\\"k\\">return</span> <span class=\\"n\\">kshort</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">g</span><span class=\\"p\\">.</span><span class=\\"n\\">head</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">g</span><span class=\\"p\\">.</span><span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">nxt</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">pq</span><span class=\\"p\\">.</span><span class=\\"n\\">push</span><span class=\\"p\\">({</span><span class=\\"n\\">g</span><span class=\\"p\\">.</span><span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">to</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"o\\">+</span><span class=\\"n\\">g</span><span class=\\"p\\">.</span><span class=\\"n\\">edge</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">].</span><span class=\\"n\\">w</span><span class=\\"p\\">});</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">kshort</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">q</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">g</span><span class=\\"p\\">.</span><span class=\\"n\\">addedge</span><span class=\\"p\\">(</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">gi</span><span class=\\"p\\">.</span><span class=\\"n\\">addedge</span><span class=\\"p\\">(</span><span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">gi</span><span class=\\"p\\">.</span><span class=\\"n\\">dijkstra</span><span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"n\\">astar</span><span class=\\"p\\">(</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">d</span><span class=\\"p\\">:</span> <span class=\\"n\\">ans</span><span class=\\"p\\">)</span> <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">d</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">ans</span><span class=\\"p\\">.</span><span class=\\"n\\">size</span><span class=\\"p\\">();</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">q</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;-1</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>在洛谷题解中看到的一个比较有意思的dp做法：<script type=\\"math/tex\\">f[i][j]<\/script>为以第i点为终点第j短路的长度。复杂度<script type=\\"math/tex\\">O(mk)<\/script>\\n</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1003</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXK</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">203</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">q</span><span class=\\"p\\">;</span>\\n<span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"n\\">pair</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"p\\">,</span> <span class=\\"kt\\">int</span><span class=\\"o\\">&gt;&gt;</span> <span class=\\"n\\">pre</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">][</span><span class=\\"n\\">MAXK</span><span class=\\"p\\">],</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">g</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXK</span><span class=\\"p\\">],</span> <span class=\\"n\\">tmp</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXK</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">q</span><span class=\\"p\\">);</span>\\n  <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"n\\">z</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">y</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">z</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">pre</span><span class=\\"p\\">[</span><span class=\\"n\\">y</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">({</span><span class=\\"n\\">x</span><span class=\\"p\\">,</span> <span class=\\"n\\">z</span><span class=\\"p\\">});</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span><span class=\\"o\\">&amp;</span> <span class=\\"nl\\">p</span><span class=\\"p\\">:</span> <span class=\\"n\\">pre</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">];</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">g</span><span class=\\"p\\">[</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">][</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">second</span><span class=\\"p\\">;</span>\\n\\n      <span class=\\"n\\">merge</span><span class=\\"p\\">(</span><span class=\\"n\\">g</span><span class=\\"p\\">,</span> <span class=\\"n\\">g</span><span class=\\"o\\">+</span><span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">],</span> <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span><span class=\\"o\\">+</span><span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">tmp</span><span class=\\"p\\">);</span>\\n      <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">min</span><span class=\\"p\\">(</span><span class=\\"n\\">q</span><span class=\\"p\\">,</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">p</span><span class=\\"p\\">.</span><span class=\\"n\\">first</span><span class=\\"p\\">]);</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">tmp</span><span class=\\"p\\">[</span><span class=\\"n\\">k</span><span class=\\"p\\">];</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">k</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">q</span><span class=\\"p\\">;</span> <span class=\\"n\\">k</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">sz</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"n\\">dp</span><span class=\\"p\\">[</span><span class=\\"mi\\">1</span><span class=\\"p\\">][</span><span class=\\"n\\">k</span><span class=\\"p\\">]</span><span class=\\"o\\">:</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":["bfs","dp"],"title":"洛谷P2901 Cow Jogging G","updated_at":"2020-07-29T16:27:47+08:00","url":"/docs/acm/search/luogu-2901"}')}}]);
//# sourceMappingURL=chunk-2d22c6a7.db1436de.js.map