# Frequency Map Squaring Chain | 12 Lines | O(n log log V) | 35ms

# Intuition
The palindromic pattern `[x, x², x⁴, ..., xᵏ, ..., x⁴, x², x]` is built by repeatedly squaring `x` to form the spine, with each value used twice (mirrored) except the center peak. We greedily follow the squaring chain from each starting value, counting pairs, then add 1 for the center.

# Approach
- Count frequencies of all elements in a `Map`.
- For each starting value `start`:
  - **`start === 1`:** The chain is always all-1s (since `1^(2^k) = 1`). The length must be odd-length (to have a center), so take `freq` if odd, `freq - 1` if even.
  - **`start > 1`:** Walk the squaring chain: while `key²` exists in the map and `freq[key] >= 2`, consume a pair (`chainLen += 2`) and advance `key = key²`. Add 1 for the center at the end.
- Return the maximum chain length found.

# Complexity
- Time complexity: $$O(n \log \log V)$$ — squaring doubles the bit-length each step, so each chain is at most $$O(\log \log V) \approx 5$$ steps for $$V \leq 10^9$$.

- Space complexity: $$O(n)$$ — the frequency map.

# Code
```typescript []
const maximumLength = (nums: number[]): number => {
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

    let maxLen = 0;

    for (const [start, startFreq] of freq) {
        let chainLen = 0;

        if (start === 1) {
            chainLen = startFreq % 2 === 1 ? startFreq : startFreq - 1;
        } else {
            let key = start;
            while ((freq.get(key) ?? 0) >= 2 && freq.has(key * key)) {
                chainLen += 2;
                key = key * key;
            }
            chainLen++;
        }

        maxLen = Math.max(maxLen, chainLen);
    }

    return maxLen;
};
```