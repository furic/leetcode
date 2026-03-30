# Greedy Assign + LCP Validate Backward | 22 Lines | O(n²) | 6ms

# Intuition
Assign characters greedily (smallest available letter first), propagating equality via the LCP matrix. Then validate the assigned string against the LCP values in a single backward pass — if any inconsistency is found, return `""`.

# Approach
- **Greedy assignment (forward pass):**
  - Iterate `i` from `0` to `n-1`. If `chars[i]` is unset, assign the next available letter (`nextCharCode`). If we've exhausted all 26 letters, return `""`.
  - For every `j > i`, if `lcp[i][j] > 0`, set `chars[j] = chars[i]` — they must share the same first character.
- **Validation (backward pass, bottom-right to top-left):**
  - For each `(i, j)`, check the LCP value against the expected value:
    - If `chars[i] !== chars[j]`: `lcp[i][j]` must be `0`; otherwise invalid.
    - If `chars[i] === chars[j]`: `lcp[i][j]` must equal `lcp[i+1][j+1] + 1` (or `1` if at the last row/column). This is the standard LCP recurrence — matching characters extend the common prefix by 1.
  - Return `""` on any mismatch.
- The backward pass is necessary because the greedy assignment only enforces `lcp[i][j] > 0 → same char`, but doesn't verify exact LCP lengths or catch cases where the matrix is internally inconsistent (e.g. `lcp[i][j]` too large, or `lcp[i][j] != lcp[j][i]`).

# Complexity
- Time complexity: $$O(n^2)$$ — forward pass is $$O(n^2)$$; validation is $$O(n^2)$$.

- Space complexity: $$O(n)$$ — for the `chars` array.

# Code
```typescript []
const findTheString = (lcp: number[][]): string => {
    const n = lcp.length;
    const chars: string[] = new Array(n).fill('');
    let nextCharCode = 'a'.charCodeAt(0);

    for (let i = 0; i < n; i++) {
        if (!chars[i]) {
            if (nextCharCode > 'z'.charCodeAt(0)) return '';
            chars[i] = String.fromCharCode(nextCharCode++);
            for (let j = i + 1; j < n; j++) {
                if (lcp[i][j] > 0) chars[j] = chars[i];
            }
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (chars[i] !== chars[j]) {
                if (lcp[i][j] !== 0) return '';
            } else {
                const expectedLcp = (i === n - 1 || j === n - 1) ? 1 : lcp[i + 1][j + 1] + 1;
                if (lcp[i][j] !== expectedLcp) return '';
            }
        }
    }

    return chars.join('');
};
```