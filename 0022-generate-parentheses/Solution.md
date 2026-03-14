# Constrained DFS Backtracking | 10 Lines | O(4ⁿ/√n) | 0ms

# Intuition
A valid parentheses string can be built character by character with two simple constraints: never place more `(` than `n`, and never place `)` when it would exceed the number of `(` placed so far. These constraints prune the DFS to only produce valid strings — no post-filtering needed.

# Approach
- Recurse with state `(openCount, closeCount, current)`:
  - `openCount` — how many `(` have been placed so far.
  - `closeCount` — how many `)` have been placed so far.
  - `current` — the string built so far.
- **Base case:** when `current.length === n * 2`, we've placed all `n` pairs — push to results and return.
- **Branch 1 — add `(`:** valid when `openCount < n` (still have opening brackets to place).
- **Branch 2 — add `)`:** valid when `openCount > closeCount` (there's an unmatched `(` to close).
- Both branches can fire independently at any step, but the constraints ensure every completed path is a well-formed string.
- **Why no invalid strings are generated:** `openCount > closeCount` guarantees the running balance never goes negative (no premature `)`), and `openCount ≤ n` caps the total pairs.

# Complexity
- Time complexity: $$O\!\left(\dfrac{4^n}{\sqrt{n}}\right)$$ — the number of valid combinations is the Catalan number $$C_n$$, which grows as $$\dfrac{4^n}{n^{3/2}\sqrt{\pi}}$$; each string takes $$O(n)$$ to construct.

- Space complexity: $$O(n)$$ — recursion depth is at most `2n`; output storage is $$O(C_n \cdot n)$$.

# Code
```typescript []
const generateParenthesis = (n: number): string[] => {
    const results: string[] = [];

    const dfs = (openCount: number, closeCount: number, current: string): void => {
        if (current.length === n * 2) {
            results.push(current);
            return;
        }

        if (openCount < n)            dfs(openCount + 1, closeCount, current + '(');
        if (openCount > closeCount)   dfs(openCount, closeCount + 1, current + ')');
    };

    dfs(0, 0, '');
    return results;
};
```