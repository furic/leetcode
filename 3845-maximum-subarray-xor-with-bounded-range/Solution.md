# Sliding Window + XOR Trie + Lazy PQ | 75 Lines | O(n log n) | 593ms

# Intuition

Maintain sliding window where max-min ≤ k. For each valid window, find maximum XOR of any subarray using prefix XOR and trie. Use priority queues with lazy deletion to track min/max efficiently.

# Approach

**Data Structures:**
1. **Prefix XOR**: prefix[i] = nums[0]⊕...⊕nums[i-1]
   - Subarray XOR[l,r] = prefix[r+1] ⊕ prefix[l]
2. **XOR Trie**: Store prefix XORs, query for maximum XOR
3. **Priority Queues**: Track min/max with lazy deletion

**Sliding Window:**
1. Expand right: add element to PQs and trie
2. While max-min > k:
   - Shrink left: remove from trie, lazy cleanup PQs
3. Query trie for max XOR ending at right

**Lazy Deletion:**
- PQs store [value, index]
- Clean stale entries (index < left) when accessing top
- More efficient than rebuilding PQs

**Example: nums=[5,4,5,6], k=2**

Window [0,3]: max=6, min=4, diff=2 ✓
Prefix: [0,5,1,4,2]
Max XOR: Try all pairs, best = 4⊕2 = 6... Actually 7

Result: 7 ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sliding window: O(n)
  - Per position: PQ operations O(log n)
  - Trie operations: O(log max_value) = O(15) = O(1)
  - Overall: O(n log n)

- Space complexity: $$O(n)$$
  - Trie: O(n × 15)
  - Priority queues: O(n)
  - Prefix array: O(n)
  - Overall: O(n)

# Code
```typescript []
const maxXor = (nums: number[], k: number): number => {
    const n = nums.length;
    const BITS = 15;

    const prefix = new Uint32Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ nums[i];
    }

    const trie: number[][] = [[0, 0]];
    const cnt: number[] = [0];

    const insert = (val: number) => {
        let node = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            if (!trie[node][bit]) {
                trie[node][bit] = trie.length;
                trie.push([0, 0]);
                cnt.push(0);
            }
            node = trie[node][bit];
            cnt[node]++;
        }
    };

    const remove = (val: number) => {
        let node = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            node = trie[node][bit];
            cnt[node]--;
        }
    };

    const query = (val: number): number => {
        let node = 0,
            res = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            const want = 1 - bit;
            if (trie[node][want] && cnt[trie[node][want]] > 0) {
                res |= 1 << b;
                node = trie[node][want];
            } else if (trie[node][bit] && cnt[trie[node][bit]] > 0) {
                node = trie[node][bit];
            } else {
                return res;
            }
        }
        return res;
    };

    const maxPQ = new MaxPriorityQueue<[number, number]>((x) => x[0]);
    const minPQ = new MinPriorityQueue<[number, number]>((x) => x[0]);

    let ans = 0;
    let l = 0;

    insert(prefix[0]);

    for (let r = 0; r < n; r++) {
        maxPQ.push([nums[r], r]);
        minPQ.push([nums[r], r]);
        insert(prefix[r + 1]);

        while (maxPQ.front()![1] < l) maxPQ.pop();
        while (minPQ.front()![1] < l) minPQ.pop();

        while (maxPQ.front()![0] - minPQ.front()![0] > k) {
            remove(prefix[l]);
            l++;
            while (maxPQ.front()![1] < l) maxPQ.pop();
            while (minPQ.front()![1] < l) minPQ.pop();
        }

        ans = Math.max(ans, query(prefix[r + 1]));
    }

    return ans;
};
```