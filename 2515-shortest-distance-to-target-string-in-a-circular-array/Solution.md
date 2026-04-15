# Linear Scan Circular Distance | 12 Lines | O(N) | 0ms

# Intuition
On a circular array you can reach any index via two paths — clockwise and counter-clockwise. The two distances always sum to `n`, so given the linear gap `d`, the circular minimum is just `min(d, n - d)`. A single pass collecting all matches and tracking the running minimum is sufficient.

# Approach
- **Single linear scan** — iterate over every index `i` in `words` once. This avoids any need to separately locate all occurrences first; we fold the distance calculation directly into the search.
- **Match check** — only do distance arithmetic when `words[i] === target`, skipping all non-matching indices cheaply.
- **Two-path distance formula** — for a match at index `i`:
  - `linearDistance = Math.abs(i - startIndex)` — the straight-line (non-wrapping) gap between the two indices.
  - `wrappedDistance = circularLength - linearDistance` — the complementary path that wraps around the array boundary. These two always sum to `n`.
  - Take `Math.min(linearDistance, wrappedDistance)` to get the shortest circular hop to this occurrence.
- **Running minimum** — initialise `shortestDistance = circularLength` (the worst possible valid distance on a circle of size `n` is `n/2 ≤ n`, so `n` acts as a safe sentinel). After each match, update with `Math.min(shortestDistance, linearDistance, wrappedDistance)`.
- **Not-found detection** — if no match was ever found, `shortestDistance` remains `circularLength`. Since any real distance satisfies `0 ≤ d ≤ ⌊n/2⌋ < n`, checking `shortestDistance < circularLength` cleanly distinguishes "found" from "not found" and returns `-1` in the latter case. This avoids a separate boolean flag.

# Complexity
- Time complexity: $$O(N)$$ — one pass over the array; each string equality check is $$O(L)$$ where L is word length, giving $$O(N \cdot L)$$ strictly, but treated as $$O(N)$$ under the constraints (L ≤ 100).

- Space complexity: $$O(1)$$ — only scalar variables are used regardless of input size.

# Code
```typescript []
const closestTarget = (words: string[], target: string, startIndex: number): number => {
    const circularLength = words.length;
    let shortestDistance = circularLength;

    for (let i = 0; i < circularLength; i++) {
        if (words[i] === target) {
            const linearDistance = Math.abs(i - startIndex);
            const wrappedDistance = circularLength - linearDistance;
            shortestDistance = Math.min(shortestDistance, linearDistance, wrappedDistance);
        }
    }

    return shortestDistance < circularLength ? shortestDistance : -1;
};
```