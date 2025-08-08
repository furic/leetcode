# Greedy Stack Remove Pairs | 32 Lines | O(n) | 16ms

# Intuition

To maximize the total score, **always remove the higher-value pair first** whenever possible. Since removing "ab" and "ba" may overlap, we should prioritize removing the pair with the higher point value greedily to avoid wasting potential high-value removals.

# Approach

- If `x < y`, swap `(x, y)` and `(a, b)` to always prioritize removing the higher-value pair first.
- Iterate through the string:
  - Use counters to simulate stack behavior for matching pairs (`char1` and `char2`).
  - For each character:
    - If it is `char1`, increment `count1`.
    - If it is `char2`:
      - If there is a pending `char1`, remove the pair for `x` points and decrement `count1`.
      - Otherwise, increment `count2` to track `char2`.
    - If it is neither, clear the current block by removing all possible `char2-char1` pairs for `y` points and reset counters.
- After iterating, remove any remaining `char2-char1` pairs for `y` points.

# Complexity

- Time complexity:  
  $$O(n)$$, as we process each character exactly once.
- Space complexity:  
  $$O(1)$$, using only a few counters regardless of input size.

# Code

```typescript
const maximumGain = (s: string, x: number, y: number): number => {
    let [char1, char2] = ['a', 'b'];
    if (x < y) {
        [x, y] = [y, x];
        [char1, char2] = ['b', 'a'];
    }

    let score = 0;
    let [count1, count2] = [0, 0];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === char1) {
            count1++;
        } else if (s[i] === char2) {
            if (count1 > 0) {
                count1--;
                score += x;
            } else {
                count2++;
            }
        } else {
            score += Math.min(count1, count2) * y;
            [count1, count2] = [0, 0];
        }
    }

    return score + Math.min(count1, count2) * y;
};
```