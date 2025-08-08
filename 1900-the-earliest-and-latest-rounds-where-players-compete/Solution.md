# Tournament Recursion | 45 Lines | O(log n) | 2ms

# Intuition

We need to compute **both the earliest and latest rounds** two specific players can meet in a knockout tournament with flexible results for other matches. Since the tournament structure is recursive (half the players advance each round, with middle players auto-advancing if odd), we can recursively simulate:

- **Earliest:** force them to meet as early as possible by eliminating other players strategically.
- **Latest:** delay their meeting by ensuring they always avoid each other until they must meet.

---

# Approach

1. **Preprocessing:**
   - Ensure `playerA < playerB`.
   - If they immediately face each other (`playerA + playerB == n + 1`), return `[1, 1]`.
   - Mirror positions if the first player is in the latter half to reduce symmetric cases.

2. **Recursive splitting:**
   - Compute the next round size as `(n + 1) // 2`.
   - Compute:
     - Number of players left of `playerA` (`leftFree`).
     - Gap between `playerA` and `playerB` (`middleGap`).
     - Additional inner gap if `playerB` is in the second half.

3. **Simulate all positions:**
   - For each valid `i` in `leftFree` and `j` in `middleGap`, recursively compute the `[earliest, latest]` for the reduced `nextRoundPlayers` with updated positions.

4. **Aggregate results:**
   - Track the minimal earliest and maximal latest across all configurations.

---

# Complexity

- **Time complexity:**  
  $$O(\log n)$$  
  since the tournament halves the players each round with recursion over a logarithmic tree.

- **Space complexity:**  
  $$O(\log n)$$  
  for the recursion stack.

---

# Code

```typescript
const earliestAndLatest = (n: number, firstPlayer: number, secondPlayer: number): number[] => {
    let playerA = Math.min(firstPlayer, secondPlayer);
    let playerB = Math.max(firstPlayer, secondPlayer);

    if (playerA + playerB === n + 1) return [1, 1];
    if (n <= 4) return [2, 2];

    if (playerA - 1 > n - playerB) {
        const mirroredA = n + 1 - playerB;
        const mirroredB = n + 1 - playerA;
        playerA = mirroredA;
        playerB = mirroredB;
    }

    const nextRoundPlayers = Math.floor((n + 1) / 2);
    let minRound = n;
    let maxRound = 1;

    if (playerB * 2 <= n + 1) {
        const leftFree = playerA - 1;
        const middleGap = playerB - playerA - 1;
        for (let i = 0; i <= leftFree; i++) {
            for (let j = 0; j <= middleGap; j++) {
                const [earliest, latest] = earliestAndLatest(nextRoundPlayers, i + 1, i + j + 2);
                minRound = Math.min(minRound, 1 + earliest);
                maxRound = Math.max(maxRound, 1 + latest);
            }
        }
    } else {
        const mirroredB = n + 1 - playerB;
        const leftFree = playerA - 1;
        const middleGap = mirroredB - playerA - 1;
        const innerGap = playerB - mirroredB - 1;
        for (let i = 0; i <= leftFree; i++) {
            for (let j = 0; j <= middleGap; j++) {
                const newSecondPlayer = i + j + 2 + Math.floor((innerGap + 1) / 2);
                const [earliest, latest] = earliestAndLatest(nextRoundPlayers, i + 1, newSecondPlayer);
                minRound = Math.min(minRound, 1 + earliest);
                maxRound = Math.max(maxRound, 1 + latest);
            }
        }
    }

    return [minRound, maxRound];
};
```