# Product Mod K Subarray Count | 14 Lines | O(n × k) | 54ms

# Intuition
We need to count subarrays by their product mod `k`. Since `k ≤ 5`, there are only `k` possible remainders. We track how many subarrays ending at the previous element have each product remainder, then extend them by multiplying the new element's mod.

# Approach
- `endingHere[r]` = number of subarrays ending at the previous element with product ≡ `r (mod k)`.
- For each new element `num`:
  - Start a new subarray of just `[num]`: increment `current[num % k]`.
  - Extend every previous subarray with remainder `r`: the new product remainder is `(r × numMod) % k` — add `endingHere[r]` to `current[(r * numMod) % k]`.
  - Accumulate `current` into `result` (total subarrays with each remainder).
  - Set `endingHere = current` for the next iteration.

# Complexity
- Time complexity: $$O(n \times k)$$ — for each of `n` elements, we update `k` remainder buckets.

- Space complexity: $$O(k)$$ — three arrays of size `k`.

# Code
```typescript []
const resultArray = (nums: number[], k: number): number[] => {
    const endingHere = new Array<number>(k).fill(0);
    const result     = new Array<number>(k).fill(0);

    for (const num of nums) {
        const numMod = num % k;
        const current = new Array<number>(k).fill(0);

        current[numMod]++;
        for (let r = 0; r < k; r++)
            current[(r * numMod) % k] += endingHere[r];

        for (let r = 0; r < k; r++) {
            result[r]    += current[r];
            endingHere[r] = current[r];
        }
    }

    return result;
};
```