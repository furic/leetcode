# Depth Counter Running Maximum | 4 Lines | O(n) | 0ms

# Intuition
Track the current nesting depth as we scan, incrementing on `'('` and decrementing on `')'`. The answer is the peak depth reached.

# Approach
- Maintain `depth` (current open bracket count) and `maxNesting` (peak so far).
- On `'('`: increment `depth` then update `maxNesting`.
- On `')'`: decrement `depth`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const maxDepth = (s: string): number => {
    let maxNesting = 0, depth = 0;
    for (const ch of s) {
        if      (ch === '(') maxNesting = Math.max(maxNesting, ++depth);
        else if (ch === ')') depth--;
    }
    return maxNesting;
};
```