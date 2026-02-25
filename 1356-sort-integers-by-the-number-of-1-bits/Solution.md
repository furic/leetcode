# Hamming Weight Sort | 7 Lines | O(n log n) | 4ms

# Intuition
Sorting by bit count is straightforward with a custom comparator — the only challenge is computing the popcount efficiently. Rather than a naive loop, we use a classic parallel bit-counting trick to count set bits in O(1).

# Approach
- **Popcount via SWAR (SIMD Within A Register):** The `popcount` function counts set bits in a 32-bit integer using pure bitwise arithmetic in three steps:
  - `n = n - ((n >> 1) & 0x55555555)` — counts bits in each 2-bit group by subtracting the high bit from each pair (works because `10₂ - 01₂ = 01₂` and `11₂ - 01₂ = 10₂`).
  - `n = (n & 0x33333333) + ((n >> 2) & 0x33333333)` — sums adjacent 2-bit counts into 4-bit groups.
  - `(((n + (n >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24` — sums 4-bit counts into 8-bit groups, then the multiply propagates all byte sums into the top byte, which is extracted with `>> 24`.
  - Each of the three steps operates on all bits in parallel — no loops needed.
- **Sort with comparator:** Use `Array.sort` with `popcount(x) - popcount(y)` as the primary key and `x - y` as the tiebreaker for equal bit counts.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort; each comparator call runs in $$O(1)$$ due to the branchless popcount.

- Space complexity: $$O(\log n)$$ — in-place sort with call stack overhead only.

# Code
```typescript []
const popcount = (n: number): number => {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
};

const sortByBits = (arr: number[]): number[] =>
    arr.sort((x, y) => popcount(x) - popcount(y) || x - y);
```