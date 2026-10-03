# Index Stack Base Tracking | 14 Lines | O(n) | 3ms

# Intuition
Use a stack to track indices of unmatched characters. The stack's top always marks the boundary just before the start of the current valid substring, so the distance from the current index to that boundary gives the valid length.

# Approach
- Initialise the stack with `-1` as a base marker (handles the case where a valid substring starts at index 0).
- For `'('`, push its index.
- For `')'`, pop the stack:
  - If the stack becomes empty, this `')'` is unmatched — push its index as the new base.
  - Otherwise, the top of the stack now marks the character just before the current valid run — compute `i - stack.top` as a candidate length.

# Complexity
- Time complexity: $$O(n)$$ — each index is pushed and popped at most once.

- Space complexity: $$O(n)$$ — the stack.

# Code
```typescript []
const longestValidParentheses = (s: string): number => {
    const stack: number[] = [-1];
    let longest = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) stack.push(i);
            else longest = Math.max(longest, i - stack[stack.length - 1]);
        }
    }

    return longest;
};
```