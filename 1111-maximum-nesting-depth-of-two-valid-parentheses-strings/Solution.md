# Depth Parity Split | 6 Lines | O(n) | 0ms

# Intuition
To minimize the max depth of both halves, alternate matching bracket pairs by depth parity — even-depth brackets go to group A, odd-depth to group B. This halves each group's maximum depth compared to the original.

# Approach
- Track running `depth`. For `'('`, assign the current depth's parity, then increment. For `')'`, decrement first, then assign the new depth's parity.
- Return `depth & 1` at each step.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(n)$$ — for the output array.

# Code
```typescript []
const maxDepthAfterSplit = (seq: string): number[] => {
    let depth = 0;
    return [...seq].map(ch => {
        if (ch === '(') return depth++ & 1;
        return --depth & 1;
    });
};
```