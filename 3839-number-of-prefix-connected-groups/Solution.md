# Hash Map with Prefix Grouping | 11 Lines | O(n×k) | 28ms

# Intuition

Group words by their k-length prefix using a hash map. Count how many groups have at least 2 words. Words shorter than k are ignored.

# Approach

**Prefix Grouping:**
1. Extract k-length prefix from each word (skip if length < k)
2. Use hash map to count words per prefix
3. Count prefixes with frequency ≥ 2

**Why This Works:**
- Same prefix → words are prefix-connected
- Prefix groups partition words into connected components
- Only count groups with ≥2 words

**Example: words=["apple","apply","banana","bandit"], k=2**

Prefix groups:
- "ap": ["apple","apply"] → count=2 ✓
- "ba": ["banana","bandit"] → count=2 ✓

Result: 2 groups ✓

# Complexity

- Time complexity: $$O(n \times k)$$
  - Process n words
  - Extract k-length prefix: O(k) per word
  - Hash map operations: O(1) average
  - Overall: O(n×k)

- Space complexity: $$O(n \times k)$$
  - Hash map stores n prefixes
  - Each prefix: O(k) space
  - Overall: O(n×k)

# Code
```typescript []
const prefixConnected = (words: string[], k: number): number => {
    const groupCountMap = new Map<string, number>();
    for (let word of words) {
        if (word.length < k) continue;
        const prefix = word.substring(0, k);
        groupCountMap.set(prefix, (groupCountMap.get(prefix) || 0) + 1);
    }
    
    return Array.from(groupCountMap.entries())
        .filter(([_, count]) => count >= 2)
        .length;
};
```