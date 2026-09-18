# Greedy Character Closure Scan | 26 Lines | O(n) | 13ms

# Intuition
A valid substring containing character `c` must contain ALL occurrences of `c`. When two characters' ranges overlap, they must be merged into one larger block. Greedily finding the smallest valid closed blocks — processed in order of first appearance — maximises the count while minimising total length.

# Approach
- **Precompute:** For each character, record its first occurrence, last occurrence, and total count. Collect characters in `firstSeen` order (order of first appearance in `s`).
- **Key invariant:** A substring `[lo, hi]` is valid if the total count of the characters whose intervals are merged to form it equals exactly `hi - lo + 1` — meaning no other character appears inside, and all included characters are fully contained.
- **Greedy construction:** Maintain a `pending` stack. For each character `c` (in `firstSeen` order), prepend `[charFirst[c], charLast[c], charCount[c]]` to the front of `pending`. Then iterate `pending` from front (newest) to back (oldest), accumulating `[lo, hi]` and `total` count. Stop as soon as `total === hi - lo + 1` — we've found the smallest valid closed block ending at or before the current character.
- **Emit and reset:** When a complete block is found, push `s[lo..hi]` to result and clear `pending`. Clearing all of pending is correct: any older characters (those with earlier first occurrences, now discarded) cannot form their own small closed blocks without overlapping the just-found block — keeping the greedy choice of smaller blocks maximises the count.
- Characters that are never part of a closed block (e.g. a character whose range spans multiple other closed blocks) are simply not selected — the problem doesn't require covering all characters.

# Complexity
- Time complexity: $$O(n)$$ — one pass to build frequency data; the outer loop is at most $$O(26)$$ iterations with at most $$O(26)$$ inner work each, plus $$O(\text{output length})$$ for slicing.

- Space complexity: $$O(n)$$ — for the output strings; all auxiliary structures (`pending`, frequency arrays) are $$O(26) = O(1)$$.

# Code
```typescript []
const maxNumOfSubstrings = (s: string): string[] => {
    const charFirst = new Array(26).fill(-1);
    const charLast  = new Array(26).fill(-1);
    const charCount = new Array(26).fill(0);
    const firstSeen: number[] = [];

    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 97;
        if (charCount[c] === 0) { charFirst[c] = i; firstSeen.push(c); }
        charCount[c]++;
        charLast[c] = i;
    }

    const result: string[] = [];
    let pending: number[][] = [];

    for (const c of firstSeen) {
        pending.unshift([charFirst[c], charLast[c], charCount[c]]);

        let lo = Infinity, hi = -Infinity, total = 0;
        for (const [f, l, cnt] of pending) {
            total += cnt; lo = Math.min(lo, f); hi = Math.max(hi, l);
            if (total === hi - lo + 1) break;
        }

        if (total === hi - lo + 1) {
            result.push(s.slice(lo, hi + 1));
            pending = [];
        }
    }

    return result;
};
```