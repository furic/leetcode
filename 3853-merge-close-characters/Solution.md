# Greedy Simulation Repeat Scan | 12 Lines | O(n² × merges) | 5ms

# Intuition
The problem mandates a strict merge priority: leftmost left index first, then smallest right index. This naturally leads to a straightforward simulation — repeatedly scan left to right, perform the first valid merge found, then restart from the beginning.

# Approach
- Split `s` into a `chars` array for easy index-based mutation.
- Repeatedly scan with a `changed` flag pattern:
  - For each index `i`, look ahead up to `k` positions (`j = i+1` to `i+k`) within the current array bounds.
  - If `chars[j] === chars[i]`, a merge is valid — remove index `j` by splicing it out (`[...slice(0,j), ...slice(j+1)]`), set `changed = true`, and immediately `break` out of both loops to restart from index `0`.
  - This ensures we always process the leftmost `i`, and for ties on `i`, the smallest `j` (since we scan `j` in ascending order and break on first match).
- Continue the outer `while` loop as long as at least one merge occurred in the last pass.
- When a full scan completes with no merges (`changed` stays `false`), the string is fully settled — join and return.
- **Correctness:** Restarting after each merge is necessary because removals shift indices, potentially creating new close pairs that didn't exist before (as shown in Example 3 where chained merges occur).

# Complexity
- Time complexity: $$O(n^2 \times M)$$ where $$M$$ is the number of merges performed — each merge requires a full rescan from the start and an $$O(n)$$ splice. In the worst case (long chain of merges), this is $$O(n^3)$$.

- Space complexity: $$O(n)$$ — the chars array at any point is at most the original length.

# Code
```typescript []
const mergeCharacters = (s: string, k: number): string => {
    let chars = s.split('');

    let changed = true;
    while (changed) {
        changed = false;
        const next = chars;
        for (let i = 0; i < next.length; i++) {
            for (let j = i + 1; j <= i + k && j < next.length; j++) {
                if (next[j] === next[i]) {
                    chars = [...next.slice(0, j), ...next.slice(j + 1)];
                    changed = true;
                    break;
                }
            }
            if (changed) break;
        }
    }

    return chars.join('');
};
```