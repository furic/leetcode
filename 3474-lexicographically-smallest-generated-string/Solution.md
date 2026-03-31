# Two-Phase Constraint Satisfaction | 30 Lines | O(n×m) | 219ms

# Intuition
`'T'` positions impose hard equality constraints — those windows must be `str2`. `'F'` positions impose inequality constraints — those windows must differ from `str2`. We handle these in two phases: first enforce all `'T'` constraints, then repair any `'F'` violations greedily.

# Approach
- **Phase 1 — enforce `'T'` constraints:**
  - Initialise `result` of length `n + m - 1` with `'?'` placeholders.
  - For each `'T'` at index `i`, write `str2[j]` into `result[i+j]` for each `j`.
  - If a position is already set to a different character, the constraints are contradictory — return `""`.
- **Track free positions:** Record which positions were still `'?'` after Phase 1 (`wasUndecided`). Fill remaining `'?'` with `'a'` for lexicographic minimality.
- **Phase 2 — fix `'F'` violations:**
  - For each `'F'` at index `i`, check if the current window `result[i..i+m-1]` equals `str2`.
  - If it does, we must break the match. To stay lexicographically smallest, find the **rightmost free (undecided) position** in the window and change it to `'b'` (the next letter after `'a'`).
  - If no free position exists in the window, the match can't be broken — return `""`.
  - Note: after changing a position to `'b'`, it no longer counts as free — the `wasUndecided` flag remains `true` but the value has changed, which naturally handles cascading windows (a `'b'` in a later window might break that match without needing another fix).

# Complexity
- Time complexity: $$O(n \times m)$$ — Phase 1 and Phase 2 each iterate over `n` windows of size `m`.

- Space complexity: $$O(n + m)$$ — the result array and `wasUndecided` flags.

# Code
```typescript []
const generateString = (str1: string, str2: string): string => {
    const n = str1.length;
    const m = str2.length;

    const result: string[] = Array(n + m - 1).fill('?');

    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'T') continue;
        for (let j = 0; j < m; j++) {
            const existing = result[i + j];
            if (existing !== '?' && existing !== str2[j]) return '';
            result[i + j] = str2[j];
        }
    }

    const wasUndecided = result.map(ch => ch === '?');
    for (let i = 0; i < result.length; i++)
        if (result[i] === '?') result[i] = 'a';

    for (let i = 0; i < n; i++) {
        if (str1[i] !== 'F') continue;
        if (result.slice(i, i + m).join('') !== str2) continue;

        let fixed = false;
        for (let j = i + m - 1; j >= i; j--) {
            if (wasUndecided[j]) {
                result[j] = 'b';
                fixed = true;
                break;
            }
        }
        if (!fixed) return '';
    }

    return result.join('');
};
```