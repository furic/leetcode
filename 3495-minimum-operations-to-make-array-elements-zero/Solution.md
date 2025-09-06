# Weighted Depth Calculation | 30 Lines | O(q log n) | 36ms

# Intuition
Each number in the array decreases by dividing by 4 until it reaches zero. The number of required operations depends on how "deep" the number is in powers-of-4 ranges. Instead of simulating each operation, we can calculate the total operations by summing contributions of numbers within each depth.

# Approach
For each query `[l, r]`, iterate through depth levels where depth `d` covers numbers from `4^(d-1)` to `4^d - 1`. Count how many numbers in `[l, r]` overlap with that range and multiply by the depth to get the total weighted sum. Divide the weighted sum by 2 (ceiling) because each operation reduces two numbers. Sum results over all queries.

# Complexity
- Time complexity: $$O(q \cdot \log n)$$, where `q` is the number of queries and `n` is the maximum value in the ranges.  
- Space complexity: $$O(1)$$.

# Code
```typescript
function minOperations(queries: number[][]): number {
    let totalOps = 0;

    for (const [l, r] of queries) {
        let weightedSum = 0;
        let rangeStart = 1;

        for (let depth = 1; depth <= 20; depth++) {
            const rangeEnd = rangeStart * 4 - 1;
            const left = Math.max(l, rangeStart);
            const right = Math.min(r, rangeEnd);

            if (right >= left) {
                const count = right - left + 1;
                weightedSum += count * depth;
            }

            rangeStart *= 4;
        }

        totalOps += Math.floor((weightedSum + 1) / 2);
    }

    return totalOps;
}
```