# Last-Char Contribution Dedup | 8 Lines | O(n) | 3ms

# Intuition
Each new character `c` appends itself to every existing distinct subsequence (including the empty one), creating `total + 1` new subsequences. But any subsequences ending in `c` from the last time `c` appeared are duplicates — subtract those to avoid double-counting.

# Approach
- Track `total` = count of distinct non-empty subsequences seen so far.
- For each character `c`:
  - `newContrib = 1 + total` — the new subsequences this character creates (appending `c` to all existing ones, plus `c` alone).
  - `total += newContrib - lastCount[c]` — subtract the contribution `c` made last time (which now generates the same subsequences as before).
  - Update `lastCount[c] = newContrib`.
- Return `total`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$ — fixed-size array of 26 entries.

# Code
```typescript []
const distinctSubseqII = (s: string): number => {
    const MOD = 1_000_000_007;
    const lastCount = new Array(26).fill(0);
    let total = 0;

    for (const ch of s) {
        const idx = ch.charCodeAt(0) - 97;
        const newContrib = (1 + total) % MOD;
        total = (total + newContrib - lastCount[idx] + MOD) % MOD;
        lastCount[idx] = newContrib;
    }

    return total;
};
```