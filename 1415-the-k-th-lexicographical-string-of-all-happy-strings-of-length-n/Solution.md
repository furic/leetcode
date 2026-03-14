# Combinatorial Rank Decoding | 14 Lines | O(n) | 1ms

# Intuition
The happy strings form a perfectly balanced ternary-then-binary tree: 3 choices for the first character, 2 for every subsequent one. This regular structure lets us decode the k-th string directly position by position — no generation or backtracking needed.

# Approach
- **Total count check:** There are `3 × 2^(n-1)` happy strings of length `n`. If `k` exceeds this, return `""`.
- Convert `k` to 0-indexed (`k--`) to simplify floor-division math.
- For each position `pos` from `0` to `n-1`:
  - `subtreeSize = 2^(n - pos - 1)` — the number of happy strings rooted at any single choice at this position. The first position branches into `2^(n-1)` strings per letter; each subsequent position halves that.
  - Filter the alphabet `['a', 'b', 'c']` to the 2 (or 3 for the first position) choices that differ from `prevChar`.
  - `choiceIndex = floor(k / subtreeSize)` — which of the available choices contains the k-th string in its subtree.
  - Append `choices[choiceIndex]` to the result and update `prevChar`.
  - Reduce `k` to the rank within the chosen subtree: `k %= subtreeSize`.
- This is essentially converting `k` through a variable-base positional system where each digit has exactly 2 valid symbols (constrained by the previous character).

# Complexity
- Time complexity: $$O(n)$$ — one iteration per character position, each doing O(1) work.

- Space complexity: $$O(n)$$ — for the output string.

# Code
```typescript []
const getHappyString = (n: number, k: number): string => {
    const totalHappyStrings = 3 * (1 << (n - 1));
    if (k > totalHappyStrings) return '';

    k--;

    let result = '';
    let prevChar = '';

    for (let pos = 0; pos < n; pos++) {
        const subtreeSize = 1 << (n - pos - 1);
        const choices = ['a', 'b', 'c'].filter(ch => ch !== prevChar);
        const choiceIndex = Math.floor(k / subtreeSize);

        prevChar = choices[choiceIndex];
        result += prevChar;
        k %= subtreeSize;
    }

    return result;
};
```