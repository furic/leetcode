# Two-Pass Directional Excess Removal | 26 Lines | O(2ⁿ) | 1ms

# Intuition
A parentheses string becomes invalid when, scanning left to right, we encounter a `')'` with no matching `'('` before it (excess closing), or when excess `'('` remain unmatched at the end. We fix excess closing parens with a left-to-right scan, then fix excess opening parens by reversing the string and applying the same logic with roles swapped.

# Approach
- **Unified `remove(str, startScan, startRemove, open, close)`:** Handles one direction of excess-bracket removal.
  - Scan from `startScan`, tracking `balance` (increment on `open`, decrement on `close`).
  - When `balance < 0`, an excess `close` has been found at position `k`. Try removing each **distinct run** of `close` characters in `[startRemove, k]` — skip over consecutive duplicates to avoid generating the same result twice — and recurse on the string with that character removed.
  - Return immediately after branching; the recursive calls handle everything past this point.
- **Phase transition:** If the scan completes cleanly (no negative balance) with `open === '('`, the first phase (removing excess `')'`) is done. Reverse the string and recurse with roles swapped (`open = ')'`, `close = '('`) — this catches excess `'('` from the original string, which appear as "excess closing" when the string is reversed and roles flipped.
- **Completion:** If the scan completes cleanly with `open === ')'`, the second phase is done — reverse the string back to original orientation and push to `results`.
- Deduplication is automatic: only the first character of each maximal identical run is tried for removal, since removing any other character in that run yields the same resulting string.

# Complexity
- Time complexity: $$O(2^n)$$ worst case — bounded by the branching factor of the removal search tree at each invalid position; the run-deduplication significantly prunes this in practice, and `n` is small (at most 20 parentheses per constraints).

- Space complexity: $$O(n)$$ per recursive call (string slicing), with recursion depth bounded by the number of removals needed; output storage is $$O(k \cdot n)$$ for `k` distinct valid results.

# Code
```typescript []
const removeInvalidParentheses = (s: string): string[] => {
    const results: string[] = [];

    const remove = (str: string, startScan: number, startRemove: number, open: string, close: string): void => {
        let balance = 0;

        for (let k = startScan; k < str.length; k++) {
            if (str[k] === open) balance++;
            if (str[k] === close) balance--;

            if (balance < 0) {
                for (let x = startRemove; x <= k; x++) {
                    if (str[x] === close && (x === startRemove || str[x - 1] !== close)) {
                        remove(str.slice(0, x) + str.slice(x + 1), k, x, open, close);
                    }
                }
                return;
            }
        }

        const reversed = [...str].reverse().join('');

        if (open === '(') {
            remove(reversed, 0, 0, ')', '(');
        } else {
            results.push(reversed);
        }
    };

    remove(s, 0, 0, '(', ')');
    return results;
};
```