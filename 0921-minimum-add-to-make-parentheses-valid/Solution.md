# Unmatched Bracket Counter | 10 Lines | O(n) | 0ms

# Intuition
Track unmatched open parentheses as we scan. Any `')'` with no open to match is an immediate insertion need. Any `'('` left unmatched at the end also needs a closing insertion.

# Approach
- Maintain `openPending` (count of unmatched `'('` seen so far).
- For `'('`: increment `openPending`.
- For `')'`: if there's a pending open, match it (decrement); otherwise it's unmatched — increment `insertionsNeeded`.
- Final answer: `openPending + insertionsNeeded` — leftover opens each need a closing insertion, plus the already-counted unmatched closes.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const minAddToMakeValid = (s: string): number => {
    let openPending = 0, insertionsNeeded = 0;

    for (const ch of s) {
        if (ch === '(') {
            openPending++;
        } else if (openPending > 0) {
            openPending--;
        } else {
            insertionsNeeded++;
        }
    }

    return openPending + insertionsNeeded;
};
```