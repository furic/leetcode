# Fenwick Tree for Dynamic Range Queries | 45 Lines | O(q log n) | 75ms

# Intuition
To make a string alternating, we need to eliminate all adjacent equal characters, which I'll call "bad pairs." The minimum deletions equals the count of bad pairs in the substring. When we flip a character, only the pairs involving that character are affected. A Fenwick Tree allows us to efficiently track and query bad pair counts even as the string changes.

# Approach
- **Understanding the Core Problem**:
  - An alternating string has no adjacent equal characters, meaning characters alternate between 'A' and 'B'
  - When we have adjacent equal characters (a "bad pair"), we must delete one of them to make the string alternating
  - The minimum deletions for a substring equals the number of bad pairs it contains
  - Example: "AAA" has 2 bad pairs (positions 0-1 and 1-2), requiring 2 deletions to get "A"

- **Bad Pair Representation**:
  - Create array `bad[i]` where bad[i] = 1 if chars[i] == chars[i+1], else 0
  - This represents whether position i forms a bad pair with its right neighbor
  - Array has length n-1 since the last character has no right neighbor
  - Sum of bad[l..r-1] gives the count of bad pairs in substring s[l..r]

- **Fenwick Tree for Efficient Queries**:
  - Also known as Binary Indexed Tree (BIT)
  - Supports two operations in O(log n): update a value and compute prefix sum
  - Perfect for our needs: query sum of bad pairs in range, update after character flips
  - Range sum [l, r] = prefixSum(r) - prefixSum(l-1)

- **Handling Type 1 Queries (Character Flip)**:
  - When flipping character at index j, potentially affects two bad pairs:
    - Pair with left neighbor at position j-1 (if j > 0)
    - Pair with right neighbor at position j (if j < n-1)
  - Recompute both bad pair values and update the Fenwick Tree
  - This ensures subsequent queries reflect the modified string

- **Handling Type 2 Queries (Count Deletions)**:
  - To count bad pairs in substring s[l..r], query range [l, r-1] in bad array
  - Why r-1? Because bad[i] represents the pair between positions i and i+1
  - The last position r doesn't form a pair within the substring
  - Use Fenwick Tree's range sum for O(log n) query time

- **Fenwick Tree Operations Explained**:
  - update(idx, delta): Adds delta to position idx, propagates through tree structure
  - prefixSum(idx): Returns sum of elements from 0 to idx
  - The bit manipulation (i & -i) finds the least significant bit, enabling efficient tree traversal
  - Tree indices are 1-based (add 1 to array indices when accessing tree)

- **Example Walkthrough** (s="ABA", queries=[[2,1,2],[1,1],[2,0,2]]):
  - Initial: chars = ['A','B','A'], bad = [1,0] (A==B? No, B==A? No)
  - Wait, that's wrong. Let me recalculate: bad[0] = (A==B)? = 0, bad[1] = (B==A)? = 0
  - Query [2,1,2]: Count bad pairs in range [1,1] of bad array = 0 → answer 0
  - Query [1,1]: Flip s[1] from 'B' to 'A' → chars = ['A','A','A']
    - Update bad[0] = (A==A)? = 1, bad[1] = (A==A)? = 1
  - Query [2,0,2]: Count bad pairs in range [0,1] = 1+1 = 2 → answer 2

- **Why This Approach is Efficient**:
  - Each flip affects at most 2 bad pairs → O(log n) per flip
  - Each query takes O(log n) with Fenwick Tree
  - Total: O(q log n) for q queries, much better than naive O(qn)

# Complexity
- Time complexity: $$O(n + q \log n)$$
  - Initial setup (bad array + Fenwick Tree): O(n)
  - Each query of type 1: O(log n) for at most 2 Fenwick updates
  - Each query of type 2: O(log n) for range sum query
  - Total for q queries: O(q log n)

- Space complexity: $$O(n)$$
  - Character array: O(n)
  - Bad pairs array: O(n)
  - Fenwick Tree: O(n)
  - Result array: O(number of type 2 queries) ≤ O(q)
  - Total: O(n + q)

# Code
```typescript
const minDeletions = (s: string, queries: number[][]): number[] => {
    const n = s.length;
    const chars = s.split('');
    
    const bad = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) {
        bad[i] = chars[i] === chars[i + 1] ? 1 : 0;
    }
    
    const tree = new Array(n + 1).fill(0);
    
    const update = (idx: number, delta: number) => { for (let i = idx + 1; i <= n; i += i & -i) tree[i] += delta; };
    const prefixSum = (idx: number) => { let s = 0; for (let i = idx + 1; i > 0; i -= i & -i) s += tree[i]; return s; };
    
    const rangeSum = (left: number, right: number): number => {
        if (left > right) return 0;
        return prefixSum(right) - (left > 0 ? prefixSum(left - 1) : 0);
    };
    
    for (let i = 0; i < n - 1; i++) {
        if (bad[i]) update(i, 1);
    }
    
    const result: number[] = [];
    
    for (const query of queries) {
        if (query[0] === 1) {
            const j = query[1];
            chars[j] = chars[j] === 'A' ? 'B' : 'A';
            
            if (j > 0) {
                const newBad = chars[j - 1] === chars[j] ? 1 : 0;
                if (newBad !== bad[j - 1]) {
                    update(j - 1, newBad - bad[j - 1]);
                    bad[j - 1] = newBad;
                }
            }
            
            if (j < n - 1) {
                const newBad = chars[j] === chars[j + 1] ? 1 : 0;
                if (newBad !== bad[j]) {
                    update(j, newBad - bad[j]);
                    bad[j] = newBad;
                }
            }
        } else {
            const l = query[1], r = query[2];
            result.push(rangeSum(l, r - 1));
        }
    }
    
    return result;
};
```