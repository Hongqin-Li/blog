(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e6676"],{9933:function(s){s.exports=JSON.parse('{"created_at":"2020-10-17T10:05:41+08:00","excerpt":"The 15-puzzle has been around for over 100 years; even if you don\'t know it by that name, you\'ve seen it. It is constructed with 15 sliding  tiles, each with a number from 1 to 15 on it, and all packed into a 4 by 4 frame with one tile missing. Let\'s call the missing tile \'x\'; the  object of the puzzle is to arrange the tiles so that they are ordered  as:","html":"<p>The 15-puzzle has been around for over 100 years; even if you don\'t know it by that name, you\'ve seen it. It is constructed with 15 sliding  tiles, each with a number from 1 to 15 on it, and all packed into a 4 by 4 frame with one tile missing. Let\'s call the missing tile \'x\'; the  object of the puzzle is to arrange the tiles so that they are ordered  as:  </p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code> 1  2  3  4\\n 5  6  7  8\\n 9 10 11 12\\n13 14 15  x\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>where the only legal operation is to exchange \'x\' with one of the  tiles with which it shares an edge. As an example, the following  sequence of moves solves a slightly scrambled puzzle:  </p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3\\n4\\n5</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code> 1  2  3  4     1  2  3  4     1  2  3  4     1  2  3  4\\n 5  6  7  8     5  6  7  8     5  6  7  8     5  6  7  8\\n 9  x 10 12     9 10  x 12     9 10 11 12     9 10 11 12\\n13 14 11 15    13 14 11 15    13 14  x 15    13 14 15  x\\n            r-&gt;            d-&gt;            r-&gt;\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>The letters in the previous row indicate which neighbor of the \'x\'  tile is swapped with the \'x\' tile at each step; legal values are  \'r\',\'l\',\'u\' and \'d\', for right, left, up, and down, respectively.  </p>\\n<p>Not all puzzles can be solved; in 1870, a man named Sam Loyd was  famous for distributing an unsolvable version of the puzzle, and frustrating many people. In fact, all you have to do to make a  regular puzzle into an unsolvable one is to swap two tiles (not counting the missing \'x\' tile, of course).  </p>\\n<p>In this problem, you will write a program for solving the less well-known 8-puzzle, composed of tiles on a three by three arrangement.  </p>\\n<h2 id=\\"input\\">Input</h2>\\n<p>You will receive, several descriptions of configuration of the 8 puzzle. One description is just a list of the tiles in their initial positions, with the rows listed from top to bottom, and the tiles listed from left to right within a row, where the tiles are represented by numbers 1 to  8, plus \'x\'. For example, this puzzle  </p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1\\n2\\n3</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>1 2 3\\nx 4 6\\n7 5 8\\n</code></pre></div>\\n</td></tr></table>\\n\\n<p>is described by this list:  1 2 3 x 4 6 7 5 8 </p>\\n<h2 id=\\"output\\">Output</h2>\\n<p>You will print to standard output either the word \\"unsolvable\'\', if the puzzle has no solution, or a string consisting entirely of the letters  \'r\', \'l\', \'u\' and \'d\' that describes a series of moves that produce a  solution. The string should include no spaces and start at the beginning of the line. Do not print a blank line between cases. </p>\\n<h2 id=\\"sample-input\\">Sample Input</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>2  3  4  1  5  x  7  6  8\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"sample-output\\">Sample Output</h2>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>1</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code>ullddrurdllurdruldr\\n</code></pre></div>\\n</td></tr></table>\\n\\n<h2 id=\\"solution\\">Solution</h2>\\n<p>将x换成9可得一个排列，问题中的每个状态可由某个排列表示，为了节省空间，我们可以使用排列的顺序数（cantor展开就是求这个顺序数的）来表示某一个排列。即排列到其顺序数用cantor，顺序数到排列字符串为一个元素为字符串的数组，后者可以预处理求得。而状态之间的转换（x在9宫格中下一个可能的位置）可以预处理得到。之后就是典型的BFS求最短路了。</p>\\n<table class=\\"codehilitetable\\"><tr><td class=\\"linenos\\"><div class=\\"linenodiv\\"><pre>  1\\n  2\\n  3\\n  4\\n  5\\n  6\\n  7\\n  8\\n  9\\n 10\\n 11\\n 12\\n 13\\n 14\\n 15\\n 16\\n 17\\n 18\\n 19\\n 20\\n 21\\n 22\\n 23\\n 24\\n 25\\n 26\\n 27\\n 28\\n 29\\n 30\\n 31\\n 32\\n 33\\n 34\\n 35\\n 36\\n 37\\n 38\\n 39\\n 40\\n 41\\n 42\\n 43\\n 44\\n 45\\n 46\\n 47\\n 48\\n 49\\n 50\\n 51\\n 52\\n 53\\n 54\\n 55\\n 56\\n 57\\n 58\\n 59\\n 60\\n 61\\n 62\\n 63\\n 64\\n 65\\n 66\\n 67\\n 68\\n 69\\n 70\\n 71\\n 72\\n 73\\n 74\\n 75\\n 76\\n 77\\n 78\\n 79\\n 80\\n 81\\n 82\\n 83\\n 84\\n 85\\n 86\\n 87\\n 88\\n 89\\n 90\\n 91\\n 92\\n 93\\n 94\\n 95\\n 96\\n 97\\n 98\\n 99\\n100</pre></div></td><td class=\\"code\\"><div class=\\"codehilite\\"><pre><span></span><code><span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;stdio.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;string.h&gt;</span><span class=\\"cp\\"></span>\\n<span class=\\"cp\\">#include</span> <span class=\\"cpf\\">&lt;algorithm&gt;</span><span class=\\"cp\\"></span>\\n\\n<span class=\\"k\\">using</span> <span class=\\"k\\">namespace</span> <span class=\\"n\\">std</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">9</span><span class=\\"p\\">;</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">MAXN</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">362880</span><span class=\\"p\\">;</span>  <span class=\\"c1\\">// 9! = 362880</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">pdir</span><span class=\\"p\\">[</span><span class=\\"mi\\">9</span><span class=\\"p\\">][</span><span class=\\"mi\\">4</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span>\\n  <span class=\\"p\\">{</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">3</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"mi\\">4</span><span class=\\"p\\">,</span> <span class=\\"mi\\">0</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">5</span><span class=\\"p\\">,</span> <span class=\\"mi\\">1</span><span class=\\"p\\">},</span>\\n  <span class=\\"p\\">{</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">4</span><span class=\\"p\\">,</span> <span class=\\"mi\\">6</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">5</span><span class=\\"p\\">,</span> <span class=\\"mi\\">7</span><span class=\\"p\\">,</span> <span class=\\"mi\\">3</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"mi\\">2</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">8</span><span class=\\"p\\">,</span> <span class=\\"mi\\">4</span><span class=\\"p\\">},</span>\\n  <span class=\\"p\\">{</span><span class=\\"mi\\">3</span><span class=\\"p\\">,</span> <span class=\\"mi\\">7</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"mi\\">4</span><span class=\\"p\\">,</span> <span class=\\"mi\\">8</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">6</span><span class=\\"p\\">},</span> <span class=\\"p\\">{</span><span class=\\"mi\\">5</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"mi\\">7</span><span class=\\"p\\">},</span>\\n<span class=\\"p\\">};</span>\\n<span class=\\"k\\">const</span> <span class=\\"kt\\">char</span> <span class=\\"n\\">dirmap</span><span class=\\"p\\">[</span><span class=\\"mi\\">4</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">{</span><span class=\\"sc\\">&#39;d&#39;</span><span class=\\"p\\">,</span> <span class=\\"sc\\">&#39;l&#39;</span><span class=\\"p\\">,</span> <span class=\\"sc\\">&#39;u&#39;</span><span class=\\"p\\">,</span> <span class=\\"sc\\">&#39;r&#39;</span><span class=\\"p\\">};</span>\\n\\n<span class=\\"kt\\">char</span> <span class=\\"n\\">perm</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">][</span><span class=\\"mi\\">10</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">op</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">],</span> <span class=\\"n\\">visit</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">pi</span><span class=\\"p\\">,</span> <span class=\\"n\\">xi</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span> <span class=\\"n\\">que</span><span class=\\"p\\">[</span><span class=\\"n\\">MAXN</span><span class=\\"p\\">];</span>\\n<span class=\\"kt\\">int</span> <span class=\\"n\\">ql</span><span class=\\"p\\">,</span> <span class=\\"n\\">qr</span><span class=\\"p\\">;</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">nextp</span><span class=\\"p\\">(</span><span class=\\"kt\\">char</span> <span class=\\"n\\">p</span><span class=\\"p\\">[],</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n  <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">i</span> <span class=\\"o\\">==</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">reverse</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">j</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">&gt;</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n    <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">p</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">]);</span>\\n    <span class=\\"n\\">reverse</span><span class=\\"p\\">(</span><span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"n\\">p</span><span class=\\"o\\">+</span><span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">cantor</span><span class=\\"p\\">(</span><span class=\\"kt\\">char</span> <span class=\\"n\\">s</span><span class=\\"p\\">[],</span> <span class=\\"kt\\">int</span> <span class=\\"n\\">n</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">int</span> <span class=\\"n\\">pi</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"n\\">e</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"mi\\">2</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&gt;=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">--</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">a</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">j</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">j</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">j</span><span class=\\"p\\">]</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">])</span> <span class=\\"n\\">a</span> <span class=\\"o\\">++</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">pi</span> <span class=\\"o\\">+=</span> <span class=\\"n\\">a</span><span class=\\"o\\">*</span><span class=\\"n\\">e</span><span class=\\"p\\">;</span>\\n    <span class=\\"n\\">e</span> <span class=\\"o\\">*=</span> <span class=\\"n\\">n</span><span class=\\"o\\">-</span><span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"n\\">pi</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">init</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"kt\\">char</span> <span class=\\"n\\">s</span><span class=\\"p\\">[]</span> <span class=\\"o\\">=</span> <span class=\\"s\\">&quot;123456789&quot;</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">MAXN</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"n\\">memmove</span><span class=\\"p\\">(</span><span class=\\"n\\">perm</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">],</span> <span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">perm</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]));</span>\\n    <span class=\\"n\\">nextp</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"n\\">memset</span><span class=\\"p\\">(</span><span class=\\"n\\">nxt</span><span class=\\"p\\">,</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">,</span> <span class=\\"k\\">sizeof</span><span class=\\"p\\">(</span><span class=\\"n\\">nxt</span><span class=\\"p\\">));</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">void</span> <span class=\\"nf\\">bfs</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">que</span><span class=\\"p\\">[</span><span class=\\"n\\">qr</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span><span class=\\"mi\\">0</span><span class=\\"p\\">,</span> <span class=\\"mi\\">8</span><span class=\\"p\\">};</span>\\n  <span class=\\"n\\">visit</span><span class=\\"p\\">[</span><span class=\\"mi\\">0</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"n\\">ql</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">qr</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span> <span class=\\"n\\">itm</span> <span class=\\"o\\">=</span> <span class=\\"n\\">que</span><span class=\\"p\\">[</span><span class=\\"n\\">ql</span><span class=\\"o\\">++</span><span class=\\"p\\">];</span>\\n    <span class=\\"kt\\">char</span> <span class=\\"o\\">*</span><span class=\\"n\\">s</span> <span class=\\"o\\">=</span> <span class=\\"n\\">perm</span><span class=\\"p\\">[</span><span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">pi</span><span class=\\"p\\">];</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"mi\\">4</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"kt\\">int</span> <span class=\\"n\\">xi</span> <span class=\\"o\\">=</span> <span class=\\"n\\">pdir</span><span class=\\"p\\">[</span><span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">xi</span><span class=\\"p\\">][</span><span class=\\"n\\">i</span><span class=\\"p\\">];</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">xi</span> <span class=\\"o\\">!=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n        <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">xi</span><span class=\\"p\\">],</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">xi</span><span class=\\"p\\">]);</span>\\n        <span class=\\"kt\\">int</span> <span class=\\"n\\">pi</span> <span class=\\"o\\">=</span> <span class=\\"n\\">cantor</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n        <span class=\\"n\\">swap</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">xi</span><span class=\\"p\\">],</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">xi</span><span class=\\"p\\">]);</span>\\n        <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"o\\">!</span><span class=\\"n\\">visit</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">])</span> <span class=\\"p\\">{</span>\\n          <span class=\\"n\\">visit</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span>\\n          <span class=\\"n\\">nxt</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">itm</span><span class=\\"p\\">.</span><span class=\\"n\\">pi</span><span class=\\"p\\">;</span>\\n          <span class=\\"n\\">op</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">i</span><span class=\\"p\\">;</span>\\n          <span class=\\"n\\">que</span><span class=\\"p\\">[</span><span class=\\"n\\">qr</span><span class=\\"o\\">++</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"p\\">(</span><span class=\\"k\\">struct</span> <span class=\\"n\\">Item</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span><span class=\\"n\\">pi</span><span class=\\"p\\">,</span> <span class=\\"n\\">xi</span><span class=\\"p\\">};</span>\\n        <span class=\\"p\\">}</span>\\n      <span class=\\"p\\">}</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n<span class=\\"p\\">}</span>\\n\\n<span class=\\"kt\\">int</span> <span class=\\"nf\\">main</span><span class=\\"p\\">()</span> <span class=\\"p\\">{</span>\\n  <span class=\\"n\\">init</span><span class=\\"p\\">();</span>\\n  <span class=\\"n\\">bfs</span><span class=\\"p\\">();</span>\\n  <span class=\\"kt\\">char</span> <span class=\\"n\\">c</span><span class=\\"p\\">,</span> <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">n</span><span class=\\"o\\">+</span><span class=\\"mi\\">1</span><span class=\\"p\\">];</span>\\n  <span class=\\"k\\">while</span> <span class=\\"p\\">(</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">fin</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n    <span class=\\"k\\">for</span> <span class=\\"p\\">(</span><span class=\\"kt\\">int</span> <span class=\\"n\\">i</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">&lt;</span> <span class=\\"n\\">n</span><span class=\\"p\\">;</span> <span class=\\"n\\">i</span> <span class=\\"o\\">++</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">while</span><span class=\\"p\\">((</span><span class=\\"n\\">c</span> <span class=\\"o\\">=</span> <span class=\\"n\\">getchar</span><span class=\\"p\\">())</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39; &#39;</span> <span class=\\"o\\">||</span> <span class=\\"n\\">c</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">)</span> <span class=\\"p\\">;</span>\\n      <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">c</span> <span class=\\"o\\">==</span> <span class=\\"n\\">EOF</span><span class=\\"p\\">)</span> <span class=\\"p\\">{</span> <span class=\\"n\\">fin</span> <span class=\\"o\\">=</span> <span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"k\\">break</span><span class=\\"p\\">;</span> <span class=\\"p\\">}</span>\\n      <span class=\\"n\\">s</span><span class=\\"p\\">[</span><span class=\\"n\\">i</span><span class=\\"p\\">]</span> <span class=\\"o\\">=</span> <span class=\\"n\\">c</span> <span class=\\"o\\">==</span> <span class=\\"sc\\">&#39;x&#39;</span> <span class=\\"o\\">?</span> <span class=\\"sc\\">&#39;9&#39;</span><span class=\\"o\\">:</span> <span class=\\"n\\">c</span><span class=\\"p\\">;</span>\\n    <span class=\\"p\\">}</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">fin</span><span class=\\"p\\">)</span> <span class=\\"k\\">break</span><span class=\\"p\\">;</span>\\n    <span class=\\"kt\\">int</span> <span class=\\"n\\">pi</span> <span class=\\"o\\">=</span> <span class=\\"n\\">cantor</span><span class=\\"p\\">(</span><span class=\\"n\\">s</span><span class=\\"p\\">,</span> <span class=\\"n\\">n</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">if</span> <span class=\\"p\\">(</span><span class=\\"n\\">pi</span> <span class=\\"o\\">&amp;&amp;</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]</span> <span class=\\"o\\">==</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">)</span> <span class=\\"n\\">printf</span><span class=\\"p\\">(</span><span class=\\"s\\">&quot;unsolvable</span><span class=\\"se\\">\\\\n</span><span class=\\"s\\">&quot;</span><span class=\\"p\\">);</span>\\n    <span class=\\"k\\">else</span> <span class=\\"p\\">{</span>\\n      <span class=\\"k\\">for</span> <span class=\\"p\\">(;</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]</span> <span class=\\"o\\">!=</span> <span class=\\"o\\">-</span><span class=\\"mi\\">1</span><span class=\\"p\\">;</span> <span class=\\"n\\">pi</span> <span class=\\"o\\">=</span> <span class=\\"n\\">nxt</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">])</span>\\n        <span class=\\"n\\">putchar</span><span class=\\"p\\">(</span><span class=\\"n\\">dirmap</span><span class=\\"p\\">[</span><span class=\\"n\\">op</span><span class=\\"p\\">[</span><span class=\\"n\\">pi</span><span class=\\"p\\">]]);</span>\\n      <span class=\\"n\\">putchar</span><span class=\\"p\\">(</span><span class=\\"sc\\">&#39;\\\\n&#39;</span><span class=\\"p\\">);</span>\\n    <span class=\\"p\\">}</span>\\n  <span class=\\"p\\">}</span>\\n  <span class=\\"k\\">return</span> <span class=\\"mi\\">0</span><span class=\\"p\\">;</span>\\n<span class=\\"p\\">}</span>\\n</code></pre></div>\\n</td></tr></table>","tags":[{"name":"bfs","url":"/tags/bfs"}],"title":"HDU-1043 Eight","updated_at":"2020-10-17T10:05:41+08:00","url":"/docs/acm/search/hdu-1043"}')}}]);
//# sourceMappingURL=chunk-2d0e6676.b08ff2b9.js.map