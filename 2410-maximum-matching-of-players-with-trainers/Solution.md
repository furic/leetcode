# [TypeScript] Two-Pointer Matching | 18 Lines | O(n log n) | 89ms

# Intuition

We need to **maximize the number of matchings** where `players[i] <= trainers[j]`. Since each player and trainer can only be matched once, **greedy matching from smallest to smallest** will maximize pairings without wasting higher-capacity trainers on lower-ability players unnecessarily.

---

# Approach

1. **Sort** `players` and `trainers` in ascending order.
2. Use **two pointers**:
   - `playerIdx` iterates over `players`.
   - `trainerIdx` iterates over `trainers`.
3. For each player:
   - If the current trainer can accommodate the player (`players[playerIdx] <= trainers[trainerIdx]`), count it as a match and move both pointers.
   - Otherwise, try the next trainer by moving `trainerIdx` only.
4. Continue until we exhaust players or trainers.

---

# Complexity

- **Time complexity:**  
  $$O(n \log n + m \log m)$$  
  for sorting players (`n`) and trainers (`m`), then a linear two-pointer scan.

- **Space complexity:**  
  $$O(1)$$  
  outside of the sort, no additional space is used.

---

# Code

```typescript
const matchPlayersAndTrainers = (players: number[], trainers: number[]): number => {
    players.sort((a, b) => a - b);
    trainers.sort((a, b) => a - b);

    let playerIdx = 0;
    let trainerIdx = 0;
    let matches = 0;

    while (playerIdx < players.length && trainerIdx < trainers.length) {
        if (players[playerIdx] <= trainers[trainerIdx]) {
            matches++;
            playerIdx++;
            trainerIdx++;
        } else {
            trainerIdx++;
        }
    }

    return matches;
};
```