# Suffix Match Precompute + Greedy Skip | 22 Lines | O(n + m) | 65ms

# Intuition
We need to find the lexicographically smallest index sequence that matches `word2` with at most one mismatch. Greedy left-to-right works for exact matches, but for the one allowed skip, we need to know whether the remaining suffix can still be matched — precomputing suffix reachability lets us check this in O(1).

# Approach
- **Suffix precompute:** Scan `word1` right-to-left, greedily matching `word2` right-to-left. `suffixMatch[j]` = the earliest index in `word1` where `word2[j..m-1]` can be matched. This tells us: if we use the skip at position `j`, the suffix `word2[j+1..m-1]` can be matched starting from `suffixMatch[j+1]` in `word1`.
- **Greedy forward scan:** Walk `word1` left-to-right, matching `word2` character by character:
  - **Match:** always take it (greedy, minimises index).
  - **Mismatch:** use the one allowed skip (`skipped === 0`) only if the remaining suffix is still achievable — i.e. `j === m - 1` (this is the last character, no suffix needed) or `i < suffixMatch[j + 1]` (there's room in `word1` to match the rest).
  - Once a skip is used (`skipped = 1`), no more skips are allowed.
- Return the result if all `m` characters were placed, otherwise return `[]`.

# Complexity
- Time complexity: $$O(n + m)$$ — one backward pass for suffix precompute, one forward pass for greedy matching.

- Space complexity: $$O(m)$$ — the `suffixMatch` array and result.

# Code
```typescript []
const validSequence = (word1: string, word2: string): number[] => {
    const n = word1.length, m = word2.length;

    const suffixMatch = new Array(m).fill(-1);
    let j = m - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) suffixMatch[j--] = i;
    }

    const result: number[] = [];
    let skipped = 0;
    j = 0;

    for (let i = 0; i < n; i++) {
        if (j === m) break;
        const isMatch = word1[i] === word2[j];
        const canSkip = skipped === 0 && (j === m - 1 || i < suffixMatch[j + 1]);

        if (isMatch || canSkip) {
            if (!isMatch) skipped++;
            result.push(i);
            j++;
        }
    }

    return j === m ? result : [];
};
```