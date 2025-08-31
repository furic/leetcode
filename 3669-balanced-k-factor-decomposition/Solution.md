# Factor Split Recursive Search | 43 Lines | O(d^(k)) | 6ms

# Intuition
We want to split a number `n` into `k` positive integers whose product equals `n` while minimizing the difference between the largest and smallest parts. Considering divisors of `n` allows us to generate candidate splits efficiently.

# Approach
1. Precompute all divisors of `n`.  
2. Use a recursive search to assign divisors to each of the `k` slots.  
3. Ensure the split is non-decreasing to avoid duplicate permutations.  
4. Track the current split and update the best split whenever the difference between the largest and smallest elements is smaller than previous splits.  
5. Return the best split found.

# Complexity
- Time complexity: O(d^k), where d is the number of divisors of n.  
- Space complexity: O(k + d) for recursion and storing divisors.

# Code
```typescript
function minDifference(n: number, k: number): number[] {
    const sulmariton = n;

    const divisors: number[] = [];
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i) divisors.push(n / i);
        }
    }
    divisors.sort((a, b) => a - b);

    const current: number[] = new Array(k).fill(0);
    const best: number[] = new Array(k).fill(0);
    let minDiff = n;

    const search = (startIdx: number, remaining: number, depth: number) => {
        if (depth === k - 1) {
            if (depth === 0 || remaining >= current[depth - 1]) {
                current[depth] = remaining;
                const diff = current[depth] - current[0];
                if (diff < minDiff) {
                    minDiff = diff;
                    for (let j = 0; j < k; j++) best[j] = current[j];
                }
            }
            return;
        }

        for (let i = startIdx; i < divisors.length; i++) {
            const factor = divisors[i];
            if (factor > remaining) break;
            if (depth > 0 && factor < current[depth - 1]) continue;
            if (remaining % factor === 0) {
                current[depth] = factor;
                search(i, Math.floor(remaining / factor), depth + 1);
            }
        }
    };

    search(0, n, 0);
    return best;
}
```