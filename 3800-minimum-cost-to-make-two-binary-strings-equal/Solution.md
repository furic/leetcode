# Greedy Operation Selection | 16 Lines | O(n) | 14ms

# Intuition

Positions where s and t differ fall into two categories: A-type (s='0', t='1') and B-type (s='1', t='0'). We can pair A and B positions using swaps/cross-swaps, then handle remaining unpaired positions. The key is choosing the minimum cost operation for each scenario.

# Approach

**Categorize Mismatches:**
- Count A-type: s[i]='0', t[i]='1' (need to increase s[i] or decrease t[i])
- Count B-type: s[i]='1', t[i]='0' (need to decrease s[i] or increase t[i])

**Handle Paired Positions:**
- Pairs = min(countA, countB)
- Options per pair:
  - Two flips: 2×flipCost
  - One swap (fix both): swapCost
- Choose minimum: pairs × min(2×flipCost, swapCost)

**Handle Remaining Unpaired:**
- remaining = |countA - countB|
- Can pair every 2 remaining using cross-swap + swap
- Options for pairs of 2:
  - Two flips: 2×flipCost
  - Cross-swap + swap: crossCost + swapCost
- Choose minimum: ⌊remaining/2⌋ × min(2×flipCost, crossCost+swapCost)

**Handle Final Leftover:**
- If remaining is odd, one position must be flipped
- Cost: flipCost

**Total:** costAB + costRemaining + costLeftover

# Complexity

- Time complexity: $$O(n)$$
  - Single pass to count mismatches: O(n)
  - Constant arithmetic: O(1)

- Space complexity: $$O(1)$$
  - Only counter variables
  - No additional data structures

# Code
```typescript []
const minimumCost = (
    s: string,
    t: string,
    flipCost: number,
    swapCost: number,
    crossCost: number
): number => {
    let countA = 0;
    let countB = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "0" && t[i] === "1") countA++;
        else if (s[i] === "1" && t[i] === "0") countB++;
    }

    const pairedAB = Math.min(countA, countB);
    const remaining = Math.abs(countA - countB);

    const costAB = pairedAB * Math.min(2 * flipCost, swapCost);
    const costRemaining = Math.floor(remaining / 2) * Math.min(2 * flipCost, crossCost + swapCost);
    const costLeftover = (remaining % 2) * flipCost;

    return costAB + costRemaining + costLeftover;
};
```