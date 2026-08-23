# Half Sum Balance + Question Mark Parity | 8 Lines | O(n) | 11ms

# Intuition
Bob wins if and only if he can always equalise the two halves' sums. The key insight: if `(q0 + q1)` is odd, one player is forced to place a digit with no counter-move available — Alice wins. If the question marks are even, Bob can always mirror Alice's moves unless the existing digit imbalance is exactly what the `?`s can compensate, in which case Bob wins.

# Approach
- Compute `sum0`, `q0` (digit sum and `?` count in the first half) and `sum1`, `q1` for the second half.
- **Alice wins if:**
  - `(q0 + q1) % 2 === 1`: odd total `?`s — Alice always has the last move advantage.
  - OR `sum0 - sum1 !== (q1 - q0) * 9 / 2`: the digit imbalance can't be neutralised by optimal `?` placement. When `?`s are balanced, each pair of `?`s (one per side) can contribute at most `9` net difference. Bob needs `sum0 - sum1 = (q1 - q0) * 4.5` to perfectly compensate with the available `?`s.

# Complexity
- Time complexity: $$O(n)$$ — two passes over each half.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const sumGame = (num: string): boolean => {
    const half = num.length / 2;

    const analyze = (s: string): [number, number] => {
        let digitSum = 0, qCount = 0;
        for (const ch of s) {
            if (ch === '?') qCount++;
            else digitSum += +ch;
        }
        return [digitSum, qCount];
    };

    const [sum0, q0] = analyze(num.slice(0, half));
    const [sum1, q1] = analyze(num.slice(half));

    return (q0 + q1) % 2 === 1 || sum0 - sum1 !== (q1 - q0) * 9 / 2;
};
```