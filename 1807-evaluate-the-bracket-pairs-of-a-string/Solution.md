# HashMap Bracket Key Lookup | 14 Lines | O(n + k) | 38ms

# Intuition
Build a map from knowledge upfront, then scan the string once — copy non-bracket characters directly, and for each `(key)` pair, look up the value or substitute `'?'`.

# Approach
- Construct a `Map<string, string>` from `knowledge` for O(1) lookups.
- Walk `s` with index `i`:
  - If `s[i]` is not `'('`, append it to `result` and advance.
  - Otherwise, skip `'('`, accumulate characters into `key` until `')'`, skip `')'`, and append `lookup.get(key) ?? '?'` to `result`.
- Return `result`.

# Complexity
- Time complexity: $$O(n + k)$$ where $$n$$ = length of `s` and $$k$$ = total characters in `knowledge` — one pass to build the map, one pass to scan the string.

- Space complexity: $$O(k)$$ — the map stores all knowledge pairs.

# Code
```typescript []
const evaluate = (s: string, knowledge: string[][]): string => {
    const lookup = new Map<string, string>(knowledge as [string, string][]);
    let result = '';
    let i = 0;

    while (i < s.length) {
        if (s[i] !== '(') {
            result += s[i++];
        } else {
            i++;
            let key = '';
            while (s[i] !== ')') key += s[i++];
            i++;
            result += lookup.get(key) ?? '?';
        }
    }

    return result;
};
```