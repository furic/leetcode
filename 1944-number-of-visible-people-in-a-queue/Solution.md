# Monotonic Stack Visibility Count | 11 Lines | O(n) | 14ms

# Intuition
A person can see someone to their right if no one in between is taller than both. This is exactly what a decreasing monotonic stack tracks — the stack holds the "visible horizon" from left to right. When a taller person arrives, they become visible to everyone they pop off the stack.

# Approach
- Maintain a stack of indices representing people whose rightward visibility hasn't been fully resolved yet. The stack stays in decreasing height order.
- For each person `i` from left to right:
  - **While the stack top is shorter than `heights[i]`:** The stack-top person can see `i` (the current taller person terminates their line of sight). Pop and increment their count.
  - **After the while loop**, if the stack is non-empty, the current stack top is taller than or equal to `heights[i]` — they can still see `i` directly. Increment their count.
  - Push `i` onto the stack.
- **Two cases where person A sees person B:**
  1. A is popped because B is taller (B terminates A's view) → counted in the while loop.
  2. B is shorter/equal and A remains on the stack above B → counted after the while loop.
- The last person on the stack at the end can see no one to their right — their count stays 0.

# Complexity
- Time complexity: $$O(n)$$ — each index is pushed and popped at most once.

- Space complexity: $$O(n)$$ — the stack holds at most `n` indices.

# Code
```typescript []
const canSeePersonsCount = (heights: number[]): number[] => {
    const visibleCount = new Array(heights.length).fill(0);
    const stack: number[] = [];

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] > heights[stack[stack.length - 1]]) {
            visibleCount[stack.pop()!]++;
        }

        if (stack.length > 0) visibleCount[stack[stack.length - 1]]++;

        stack.push(i);
    }

    return visibleCount;
};
```