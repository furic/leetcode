# Monotonic Stack Greedy Distinct Subsequence | 10 Lines | O(n) | 0ms

# Intuition
Build the lexicographically smallest subsequence greedily: for each character, pop larger characters off the stack if they appear again later (so we won't lose them), and skip the character if it's already in the stack.

# Approach
- Maintain a monotonic stack and an `inStack` set.
- For each character `ch`:
  - Skip if already in the stack (we already have the optimal placement).
  - While the stack top is greater than `ch` AND the top character appears again later in `s` (`s.lastIndexOf(top) > i`), pop it — we can pick it up later at a better position.
  - Push `ch` and mark it in `inStack`.
- The result is exactly one of each distinct character in lexicographically minimal order.

# Complexity
- Time complexity: $$O(n)$$ — each character is pushed and popped at most once; `lastIndexOf` is O(n) per call but bounded by the 26-character alphabet so effectively O(1) amortised per character.

- Space complexity: $$O(1)$$ — stack and set hold at most 26 characters.

# Code
```typescript []
const smallestSubsequence = (s: string): string => {
    const stack: string[] = [];
    const inStack = new Set<string>();

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (inStack.has(ch)) continue;

        while (stack.length && stack.at(-1)! > ch && s.lastIndexOf(stack.at(-1)!) > i) {
            inStack.delete(stack.pop()!);
        }

        stack.push(ch);
        inStack.add(ch);
    }

    return stack.join('');
};
```