# Depth Tracking Outer Removal | 10 Lines | O(n) | 3ms

# Intuition
Each primitive's outermost pair is exactly the `'('` at depth 0→1 and the `')'` at depth 1→0. Skip those; keep everything else.

# Approach
- Track `depth`. For `'('`: only append if `depth > 0` (not the outermost), then increment.
- For `')'`: decrement first, then only append if `depth > 0` (not the outermost closing).

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(n)$$ — for the output string.

# Code
```typescript []
const removeOuterParentheses = (s: string): string => {
    let result = '';
    let depth = 0;

    for (const ch of s) {
        if (ch === '(') {
            if (depth > 0) result += ch;
            depth++;
        } else {
            depth--;
            if (depth > 0) result += ch;
        }
    }

    return result;
};
```