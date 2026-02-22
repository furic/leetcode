# Simulate Active Player Toggle | 7 Lines | O(n) | 1ms

# Intuition
Both swap rules simply toggle which player is currently "active". Instead of tracking two separate players explicitly, we can use a single index that flips between `0` and `1` to represent the active player.

# Approach
- Initialize `scores = [0, 0]` for both players and `activeIndex = 0` (first player starts active).
- Iterate through each game `i`:
  - **Odd points rule:** If `nums[i]` is odd, toggle `activeIndex` (`1 - activeIndex`) — this happens *before* the active player collects points, per the sequential rule ordering.
  - **6th game rule:** If `i % 6 === 5`, toggle `activeIndex` again — also applied before scoring.
  - Both rules apply independently and can compound (e.g., double-toggle = no net change, or single toggle = swap).
  - Add `nums[i]` to `scores[activeIndex]` — whoever is active *after* both potential swaps collects the points.
- Return `scores[0] - scores[1]`.

The key insight is that both rules are just XOR-style toggles on the same binary state variable. Applying them sequentially before crediting points exactly mirrors the problem's "sequential rules" description.

# Complexity
- Time complexity: $$O(n)$$ — single pass through the array.

- Space complexity: $$O(1)$$ — only a fixed-size scores array and a couple of variables.

# Code
```typescript []
const scoreDifference = (nums: number[]): number => {
    const scores = [0, 0];
    let activeIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 1) activeIndex = 1 - activeIndex;
        if (i % 6 === 5) activeIndex = 1 - activeIndex;
        scores[activeIndex] += nums[i];
    }
    return scores[0] - scores[1];
};
```