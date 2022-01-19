+++
tags = ["distributed systems"]
+++

# 关于共识

假设系统状态关于 t 的函数为 s(t)，则共识算法就是满足如下性质的函数 f

$$
\exists t_0 \text{ and } x_0, f(s(t)) = \begin{cases}
\text{unknown}, & t < t_0\\
x_0, & t >= t_0
\end{cases}
$$

即共识算法 f 在系统 s 上共识了 x0


## Basic Paxos

性质一：如果把 acceptor 看成一个 append-only 数组的话，prepare(n) 相当于 get_last_entry_before(idx)，accept(n, value) 相当于 set(idx, value)
证明：显然，故 basic paxos 只是把这个模型优化成了 O(1) 空间
​

性质二：对任意下标 idx，所有 acceptor 数组在此下标的数据，如果有，则相同
证明：由 basic paxos 协议的 proposal number 的唯一性直接得到，每个 proposal number 对应一个 proposal
​

性质三：对于任意时刻，如果下标 idx 在大多数的 acceptor 数组上存在值的话，其后的下标上的值在任何 acceptor 上都等同于这个值
证明：不妨假设每个时刻 accept 一个值，然后对时刻进行数学归纳法证明即可。具体地，假设 t 时刻及以前都正确，现考虑 t+1 时刻在 i 上 accept 的值，令 i0 为在大多数 acceptor 数组上存在值的最小的下标

- 如果 i == i0，由性质二，显然正确
- 如果 i < i0
   - 本次 accept 未使 i 在大多数 acceptor 数组上都有值，显然正确
   - 本次 accept 使 i 在大多数 acceptor 数组上都有了值，对于 i 后面的第一个 accepted 的下标 j，其在  basic paxos 协议中已经 get_last_entry_before(j) 了至少大多数，它一定拿到了 i 上的值，因为这个大多数和 i 上的大多数至少有一个重复的 acceptor，且此大多数不含本次 accept 的 acceptor（因为是 append-only 数组）
- 否则 i > i0，由归纳假设，[i0, i) 中间的所有值都是相同的，于是 basic paxos 协议中已经 get_last_entry_before(i) 了至少大多数，一定会拿到这个值并替换掉自己的，故正确

例子：如下状态不会存在

```
Index       i  i+1
            |   |
            v   v
    +-----+---+---+-----
A1  | ... | a |   | ...
    +-----+---+---+-----
A2  | ... | a |   | ...
    +-----+---+---+-----
A3  | ... |   | b | ...
    +-----+---+---+-----
```


性质四（正确性）：每次 propose 成功后都返回相同的值
证明：显然，由性质三直接得到
​

## Membership

如果把 basic paxos 再加一个维度，可以自然的得到支持成员变更的 basic paxos，只需修改 propose 流程即
首先，修改 proposal number n 为二元组（membership_id，seq），其比较方法为依次比较 membership_id 和 seq
最后修改 propose 流程如下

```
1. Choose new proposal number n

For membership_id in n.membership_id down to 0 do

2. Broadcast Prepare(n) to all servers indicated by membership_id

4. Retry until responses received from majority:
   - If any acceptedValue returned with acceptedProposal greater or equal to (membership_id, 0), replace value with acceptedValue for highest acceptedProposal and goto (5)

End for

5. Broadcast Accept(n, value) to all servers indicated by n.membership_id

6. When responses received from majority:
   - Any rejections(result > n)? goto (1)
   - Otherwise, value is chosen
```
类似地，可以得到如下性质，注意到下标是个二元组，把它看成整数即可，高位部分是 membership_id
​

性质一：对于任意时刻，如果下标 idx 在某个成员列表中的大多数 acceptor 数组上存在值的话（称 idx 为 majority acepted 的下标），则任何大于 idx 的下标上的值在（任何成员列表的）任何 acceptor 上都等同于这个值
证明：令 i 为 majority accepted 下标的最小值，如果 i 不存在，结论显然成立，否则对下标进行数学归纳法即可。假设 [i, j] 中所有值相同，现考虑 j+1 上的值，

- 对于循环变量从 (j+1).membership_id 到 i.membership_id + 1，其拿到的值一定属于 [(i.membership_i1+1, 0), j+1)，而它是 [i, j] 的子集，从这些循环中拿到的值相同，故结论成立
- 其遍历到了 i.membership_id，同 basic paxos，此时它一定可以拿到 i 对应的值，结论成立

​

性质二（正确性）：每次 propose 成功后都返回相同的值
证明：显然，由性质二直接得到
​

注意到同一个 acceptor 可以在不同的 membership_id 所指的 servers 里面，即反复增删同一个成员不影响正确性，只要它的 basic paxos 状态信息还在
​

## Implementation

Now we can build a simple kv log supporting

- out-of-order log commit like Multi-Paxos
- global log compaction
- max log entry limited in a server
- membership changing
- transfer a range of key to other servers
- strong leader checking, i.e., prior to current time, all globally confirmed logs related to a key has been confirmed in this server

​

The configuration of an epoch is composed of

- Some disjoint key ranges. For example, ["", "abc") and ["abc", infinite).
- Some servers, each of which belongs to exactly one key range. All servers of a key range make up the paxos group of this range.
- Each paxos group has three kinds of basic paxos entries
   - LOG_LEN log entries, maintained like Multi-Paxos. LOG_LEN can be infinite if you like.
   - One start entry and one end entry. Generally, the start entry build a consensus on the config of previous and current epoch, while the end entry build a consensus on the config of next epoch.
   - **The consensus rule of the end entry is special**, more on this later. 
   - Each of them persist accepted_proposal_id, accepted_proposal_value, is_confirmed and is_done. The is_done flag is not the part of paxos, only used for confirmed start entry.

​

The start entry is confirmed directly by receiving rpc from any servers in previous epoch.
​

The start entry is done if the state machine of key range govern by it paxos group is built successfully by either of the folllowing

- by all log entries prior to this epoch. For example, it can ask for servers governs the target key range in previous epoch
- by asking for other server with a done start entry in the same group

Before done, it need to ask for servers in previous epoch for old data. For example, the snapshot of data contains the information of epoch number and then we can determine which epoch the data lies in. Once majority start entries of each group in this epoch are done, we can safely shut down all servers in previous epochs.
​

The end entry can only be proposed if

- all start entries in this epoch is done and
- the last log entry in this epoch, i.e., with id LOG_LEN-1, is confirmed. (For example, try to batch propose [x, LOG_LEN) by nop to end this epoch.)

The end entry represents (called commited similar to a distributed transation)

- the confirmed config if all paxos groups in this epoch confirmed their end entry with the same valid config compared to current config,
- the config same as current config if all paxos groups in this epoch confirmed their end entry and they are not the same, (This case is same as performing a global compaction)
- unknown otherwise.

Once the end entry is committed, we known all server in next epoch, and we send rpc to them with the committed config.
​

The timestamp of each log entry is (epoch, log_id)?
​

Both membership changing and transfer are done by some special config.
​

is_strong_leader(server, key_range)

- key_range is a subset of key range governed by this server
- start is done
- [0, i] is confirmed and for each j in (i, LOG_LEN), j is majority empty in this group
- end is majority empty in this group

​

Now, we can start with a constant configuration at epoch 0 and have fun.
​

