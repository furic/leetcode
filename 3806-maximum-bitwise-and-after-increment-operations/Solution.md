# Greedy Bit Construction | 40 Lines | O(n log n × 31) | 423ms

# Intuition

To maximize bitwise AND of m elements, we want all chosen elements to share as many high-order bits as possible. Build the answer greedily bit-by-bit from MSB to LSB, checking if each bit can be set within budget k by transforming the m cheapest elements.

# Approach

**Greedy Bit Construction:**
- Try setting bits from high to low (bit 30 down to 0)
- For each candidate with new bit set, check feasibility
- If achievable within budget k, keep the bit

**Cost Calculation:**
To make element x have all bits of target:
- If x already has target bits: cost = 0
- If x ≤ target: cost = target - x (simple increase)
- If x > target: need to increase past conflicting bits
  - Find minimum padding to avoid AND conflicts
  - Cost = (target + padding) - x

**Feasibility Check:**
- Calculate cost to transform each element to target
- Sort costs and sum m smallest
- If total ≤ k, target is achievable

**Example: nums=[3,1,2], k=8, m=2**

Try bit 2 (value 4): candidate=4
- Costs: [1,3,2] → sorted [1,2]
- Sum=3 ≤ 8 ✓ → answer=4

Try bit 1 (value 2): candidate=6
- Costs: [3,5,4] → sorted [3,4]
- Sum=7 ≤ 8 ✓ → answer=6

Try bit 0 (value 1): candidate=7
- Costs: [4,6,5] → sorted [4,5]
- Sum=9 > 8 ✗

Result: 6 ✓

# Complexity

- Time complexity: $$O(n \log n \times 31)$$
  - 31 bits to check
  - Per bit: compute n costs + sort O(n log n)
  - Overall: O(31 × n log n)

- Space complexity: $$O(n)$$
  - Cost array: O(n)
  - Sorting space: O(log n)

# Code
```typescript []
const maximumAND = (nums: number[], k: number, m: number): number => {
    const minK = (delta: number, target: number): number => {
        let result = delta;
        while (result & target) {
            const lowbit = result & target & -(result & target);
            result = (result | (lowbit - 1)) + 1;
        }
        return result;
    };

    const cost = (x: number, target: number): number => {
        if ((x & target) === target) return 0;
        if (x <= target) return target - x;
        const delta = x - target;
        const padding = minK(delta, target);
        return target + padding - x;
    };

    const canAchieve = (target: number): boolean => {
        const costs = nums.map((x) => cost(x, target));
        costs.sort((a, b) => a - b);
        let total = 0;
        for (let i = 0; i < m; i++) {
            total += costs[i];
            if (total > k) return false;
        }
        return true;
    };

    let answer = 0;
    for (let b = 30; b >= 0; b--) {
        const candidate = answer | (1 << b);
        if (canAchieve(candidate)) {
            answer = candidate;
        }
    }

    return answer;
};
```