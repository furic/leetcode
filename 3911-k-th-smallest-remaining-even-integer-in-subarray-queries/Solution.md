# Prefix Even Count + Binary Search on Answer | 24 Lines | O((n + q) log n) | 125ms

# Intuition
The k-th remaining even after removing some evens from the infinite sequence `2, 4, 6, ...` can be found by binary searching on the candidate answer `2*m`: how many even integers ≤ `2*m` survive after removals? That's `m - (evens removed that are ≤ 2*m)`. We want the smallest `m` where this count reaches `k`.

# Approach
- **Prefix even count:** Precompute `evenPrefix[i]` = count of even numbers in `nums[0..i-1]`. This enables O(1) range even counts.
- **`countEvensLeq(l, r, val)`:** Among `nums[l..r]`, count elements that are both even and ≤ `val`. Since `nums` is sorted, binary search for the upper bound of `val` in `[l, r]`, then subtract `evenPrefix` values to get the count of evens in that prefix.
- **Per query `[l, r, k]`:** Binary search on `m` in `[k, k + totalEvensRemoved]`:
  - Lower bound `k`: at minimum `k` evens survive (if no removals intersect the answer range).
  - Upper bound `k + totalEvensRemoved`: at most `totalEvensRemoved` extra slots are needed.
  - At each `mid`, compute `mid - countEvensLeq(l, r, 2*mid)` = count of evens ≤ `2*mid` that survive. Find the smallest `m` where this ≥ `k`.
- The answer is `2 * lo` after the binary search converges.

# Complexity
- Time complexity: $$O(n + q \log^2 n)$$ — prefix build is $$O(n)$$; each query does an outer binary search over $$O(\log n)$$ range with an inner binary search of $$O(\log n)$$, giving $$O(\log^2 n)$$ per query.

- Space complexity: $$O(n)$$ — for the prefix even count array.

# Code
```typescript []
const kthRemainingInteger = (nums: number[], queries: number[][]): number[] => {
    const n = nums.length;

    const evenPrefix = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        evenPrefix[i + 1] = evenPrefix[i] + (nums[i] % 2 === 0 ? 1 : 0);
    }

    const countEvensLeq = (l: number, r: number, val: number): number => {
        let lo = l, hi = r + 1;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (nums[mid] <= val) lo = mid + 1;
            else hi = mid;
        }
        return evenPrefix[lo] - evenPrefix[l];
    };

    const result: number[] = [];

    for (const [l, r, k] of queries) {
        const totalEvensRemoved = evenPrefix[r + 1] - evenPrefix[l];

        let lo = k, hi = k + totalEvensRemoved;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (mid - countEvensLeq(l, r, 2 * mid) >= k) hi = mid;
            else lo = mid + 1;
        }

        result.push(2 * lo);
    }

    return result;
};
```