# Brute Force At-Most-2-Diff Check | 10 Lines | O(q × d × n) | 6ms

# Intuition
With small constraints (`q, d, n ≤ 100`), brute-force comparison of every query against every dictionary word is fast enough. For each pair, count character differences and stop early if they exceed 2.

# Approach
- For each query, iterate over every dictionary word.
- Count positions where characters differ, breaking out early once `diffCount > 2`.
- If any dictionary word has `diffCount ≤ 2`, add the query to results and move to the next query (`break`).
- Return the collected results in original query order.

# Complexity
- Time complexity: $$O(q \times d \times n)$$ — for each of `q` queries, check up to `d` dictionary words each of length `n`. In the worst case `100 × 100 × 100 = 10^6` character comparisons.

- Space complexity: $$O(q)$$ — for the result array.

# Code
```typescript []
const twoEditWords = (queries: string[], dictionary: string[]): string[] => {
    const result: string[] = [];

    for (const query of queries) {
        for (const word of dictionary) {
            let diffCount = 0;
            for (let i = 0; i < query.length; i++) {
                if (query[i] !== word[i]) diffCount++;
                if (diffCount > 2) break;
            }
            if (diffCount <= 2) {
                result.push(query);
                break;
            }
        }
    }

    return result;
};
```