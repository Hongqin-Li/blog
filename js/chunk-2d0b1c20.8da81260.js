(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b1c20"],{"20e1":function(s){s.exports=JSON.parse('{"created_at":"2022-01-19T23:40:55+08:00","excerpt":"You play a strategic video game (yeah, we ran out of good problem legends). In this game you control a large army, and your goal is to conquer $n$ castles of your opponent.","html":"<p>You play a strategic video game (yeah, we ran out of good problem legends). In this game you control a large army, and your goal is to conquer <script type=\\"math/tex\\">n<\/script> castles of your opponent.</p>\\n<p>Let\'s describe the game process in detail. Initially you control an army of <script type=\\"math/tex\\">k<\/script> warriors. Your enemy controls <script type=\\"math/tex\\">n<\/script> castles; to conquer the <script type=\\"math/tex\\">i<\/script>-th castle, you need at least <script type=\\"math/tex\\">a_i<\/script> warriors (you are so good at this game that you don\'t lose any warriors while taking over a castle, so your army stays the same after the fight). After you take control over a castle, you recruit new warriors into your army — formally, after you capture the <script type=\\"math/tex\\">i<\/script>-th castle, <script type=\\"math/tex\\">b_i<\/script> warriors join your army. Furthermore, after capturing a castle (or later) you can defend it: if you leave at least one warrior in a castle, this castle is considered defended. Each castle has an importance parameter <script type=\\"math/tex\\">c_i<\/script>, and your total score is the sum of importance values over all defended castles. There are two ways to defend a castle:</p>\\n<ul>\\n<li>if you are currently in the castle <script type=\\"math/tex\\">i<\/script>, you may leave one warrior to defend castle <script type=\\"math/tex\\">i<\/script>;</li>\\n<li>there are <script type=\\"math/tex\\">m<\/script> one-way portals connecting the castles. Each portal is characterised by two numbers of castles <script type=\\"math/tex\\">u<\/script> and <script type=\\"math/tex\\">v<\/script> (for each portal holds <script type=\\"math/tex\\">u > v<\/script> ). A portal can be used as follows: if you are currently in the castle <script type=\\"math/tex\\">u<\/script>, you may send one warrior to defend castle <script type=\\"math/tex\\">v<\/script>.</li>\\n</ul>\\n<p>Obviously, when you order your warrior to defend some castle, he leaves your army.</p>\\n<p>You capture the castles in fixed order: you have to capture the first one, then the second one, and so on. After you capture the castle <script type=\\"math/tex\\">i<\/script> (but only before capturing castle <script type=\\"math/tex\\">i + 1<\/script>) you may recruit new warriors from castle <script type=\\"math/tex\\">i<\/script>, leave a warrior to defend castle <script type=\\"math/tex\\">i<\/script>, and use any number of portals leading from castle <script type=\\"math/tex\\">i<\/script> to other castles having smaller numbers. As soon as you capture the next castle, these actions for castle <script type=\\"math/tex\\">i<\/script> won\'t be available to you.</p>\\n<p>If, during some moment in the game, you don\'t have enough warriors to capture the next castle, you lose. Your goal is to maximize the sum of importance values over all defended castles (note that you may hire new warriors in the last castle, defend it and use portals leading from it even after you capture it — your score will be calculated afterwards).</p>\\n<p>Can you determine an optimal strategy of capturing and defending the castles?</p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>The first line contains three integers <script type=\\"math/tex\\">n, m, k(1 \\\\le n \\\\le 5000, 0 \\\\le m \\\\le \\\\min(\\\\frac{n(n-1)}{2}, 3 \\\\cdot 10^5), 0 \\\\le k \\\\le 5000)<\/script> — the number of castles, the number of portals and initial size of your army, respectively.</p>\\n<p>Then <script type=\\"math/tex\\">n<\/script> lines follow. The <script type=\\"math/tex\\">i<\/script>-th line describes the <script type=\\"math/tex\\">i<\/script>-th castle with three integers <script type=\\"math/tex\\">a_i, b_i, c_i (0 \\\\le a_i, b_i, c_i \\\\le 5000 )<\/script> — the number of warriors required to capture the <script type=\\"math/tex\\">i<\/script>-th castle, the number of warriors available for hire in this castle and its importance value.</p>\\n<p>Then <script type=\\"math/tex\\">m<\/script> lines follow. The <script type=\\"math/tex\\">i<\/script>-th line describes the <script type=\\"math/tex\\">i<\/script>-th portal with two integers <script type=\\"math/tex\\">u_i, v_i (1 \\\\le v_i < u_i \\\\le n)<\/script>, meaning that the portal leads from the castle <script type=\\"math/tex\\">u_i<\/script> to the castle <script type=\\"math/tex\\">v_i<\/script>. There are no two same portals listed.</p>\\n<p>It is guaranteed that the size of your army won\'t exceed <script type=\\"math/tex\\">5000<\/script> under any circumstances (i. e. <script type=\\"math/tex\\">k + \\\\sum\\\\limits_{i = 1}^{n} b_i \\\\le 5000<\/script>).</p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>If it\'s impossible to capture all the castles, print one integer <script type=\\"math/tex\\">-1<\/script>.</p>\\n<p>Otherwise, print one integer equal to the maximum sum of importance values of defended castles.</p>\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>前置知识为01背包及其空间优化</p>\\n<p>dp好题。显然对于每个城堡，尽可能晚地被控制。然后dp维护 <script type=\\"math/tex\\">f[i][j]<\/script>为前 <script type=\\"math/tex\\">i<\/script> 个城堡剩余人数 <script type=\\"math/tex\\">j<\/script> 的最大收益。在每个城堡内控制之前的城堡时，是一个01背包，空间被优化成了一维，即直接更新在 <script type=\\"math/tex\\">f[i][j]<\/script> 上，注意j的遍历顺序。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre> 1\\n 2\\n 3\\n 4\\n 5\\n 6\\n 7\\n 8\\n 9\\n10\\n11\\n12\\n13\\n14\\n15\\n16\\n17\\n18\\n19\\n20\\n21\\n22\\n23\\n24\\n25\\n26\\n27\\n28\\n29\\n30\\n31\\n32\\n33\\n34\\n35\\n36\\n37\\n38\\n39\\n40\\n41\\n42</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;bits/stdc++.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">5003</span><span class=\\"p\\">;</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">b</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">c</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">][</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"n\\">vector</span><span class=\\"o\\">&lt;</span><span class=\\"kt\\">int</span><span class=\\"o\\">&gt;</span> <span class=\\"n\\">from</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">to</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"n\\">k</span><span class=\\"p\\">;</span>\\n  <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">n</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">m</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">k</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">a</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">b</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">,</span> <span class=\\"n\\">c</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"n\\">v</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">m</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">scanf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">u</span><span class=\\"p\\">,</span> <span class=\\"o\\">&amp;</span><span class=\\"n\\">v</span><span class=\\"p\\">);</span>\\n    <span class=\\"n\\">from</span><span class=\\"p\\">[</span><span class=\\"n\\">v</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">u</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">u</span><span class=\\"p\\">:</span> <span class=\\"n\\">from</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">u</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">x</span><span class=\\"p\\">)</span> <span class=\\"n\\">x</span> <span class=\\"o\\">=</span> <span class=\\"n\\">u</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">to</span><span class=\\"p\\">[</span><span class=\\"n\\">x</span><span class=\\"p\\">].</span><span class=\\"n\\">push_back</span><span class=\\"p\\">(</span><span class=\\"n\\">i</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">k</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">5000</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">][</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">5000</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">b</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;=</span> <span class=\\"n\\">a</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">?</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"n\\">b</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]]</span><span class=\\"o\\">:</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"k\\">auto</span> <span class=\\"nl\\">u</span><span class=\\"p\\">:</span> <span class=\\"n\\">to</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">5000</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">)</span>\\n          <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"p\\">],</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">][</span><span class=\\"n\\">j</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">]</span> <span class=\\"o\\">+</span> <span class=\\"n\\">c</span><span class=\\"p\\">[</span><span class=\\"n\\">u</span><span class=\\"p\\">]);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;=</span> <span class=\\"mi\\">5000</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n    <span class=\\"n\\">ans</span> <span class=\\"o\\">=</span> <span class=\\"n\\">max</span><span class=\\"p\\">(</span><span class=\\"n\\">ans</span><span class=\\"p\\">,</span> <span class=\\"n\\">f</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"p\\">][</span><span class=\\"n\\">i</span><span class=\\"p\\">]);</span>\\n  <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;%d&quot;</span><span class=\\"p\\">,</span> <span class=\\"n\\">ans</span><span class=\\"p\\">);</span>\\n\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"dp","url":"/tags/dp"}],"title":"CF-1271D Portals","updated_at":"2022-01-19T23:40:55+08:00","url":"/docs/acm/dp/cf-1271d"}')}}]);
//# sourceMappingURL=chunk-2d0b1c20.8da81260.js.map