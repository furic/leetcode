# Two-Finger DP Free Finger State | 20 Lines | O(n × 27) | 9ms

# Intuition
At each step, one finger just typed the current character — its position is known. The other ("free") finger could be anywhere. State is just the free finger's position, making this a 1D DP over 27 states (26 letters + "unplaced").

# Approach
- **State:** `dp[free]` = minimum cost so far when the free finger is at position `free` and the other finger is at `prevChar` (the last typed letter).
- **`UNPLACED = 26`:** Represents a finger that hasn't moved yet — moving from it costs `0`.
- **`moveCost(a, b)`:** Manhattan distance on the keyboard grid. Letters map to `(a / 6, a % 6)` since there are 6 columns. Returns `0` if either finger is unplaced.
- **Initialisation:** Before typing any character, both fingers are unplaced. Set `dp[UNPLACED] = 0` and `prevChar = word[0]` (first character is typed for free).
- **Transition for each subsequent character `curChar`:**
  - **Option 1 — move the active finger (at `prevChar`) to `curChar`:** The free finger stays. `nextDp[free] = min(..., dp[free] + moveCost(prevChar, curChar))`.
  - **Option 2 — move the free finger to `curChar`:** The active finger (at `prevChar`) becomes free. `nextDp[prevChar] = min(..., dp[free] + moveCost(free, curChar))`.
- After processing all characters, the answer is `min(dp)`.

# Complexity
- Time complexity: $$O(n \times 27)$$ — `n` characters, each with 27 DP states.

- Space complexity: $$O(27) = O(1)$$ — two rolling DP arrays of size 27.

# Code
```typescript []
const minimumDistance = (word: string): number => {
    const moveCost = (a: number, b: number): number => {
        if (a === 26 || b === 26) return 0;
        return Math.abs(Math.floor(a / 6) - Math.floor(b / 6))
             + Math.abs(a % 6 - b % 6);
    };

    const UNPLACED = 26;
    let dp: number[] = Array(27).fill(Infinity);
    dp[UNPLACED] = 0;
    let prevChar = word.charCodeAt(0) - 65;

    for (let i = 1; i < word.length; i++) {
        const curChar = word.charCodeAt(i) - 65;
        const nextDp: number[] = Array(27).fill(Infinity);

        for (let free = 0; free < 27; free++) {
            if (dp[free] === Infinity) continue;
            nextDp[free]     = Math.min(nextDp[free],     dp[free] + moveCost(prevChar, curChar));
            nextDp[prevChar] = Math.min(nextDp[prevChar], dp[free] + moveCost(free, curChar));
        }

        dp = nextDp;
        prevChar = curChar;
    }

    return Math.min(...dp);
};
```