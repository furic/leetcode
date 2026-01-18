# Sort and Two-Pointer with Prefix Max | 52 Lines | O(n log n) | 122ms

# Intuition

To maximize capacity while staying under budget, sort machines by cost and use two pointers. For each machine, find the best partner (highest capacity) among cheaper machines that fit the remaining budget using prefix maximum capacity.

# Approach

**Filter and Sort:**
- Keep only machines with cost < budget
- Sort by cost ascending

**Prefix Maximum Capacity:**
- Precompute max capacity from start to each position
- Enables O(1) lookup of best partner

**Two-Pointer Optimization:**
- For each machine i (current):
  - Calculate remaining budget after buying i
  - Shrink right pointer to exclude too-expensive partners
  - Best partner = machine with max capacity among [0, min(pointer, i-1)]
  - Update global max capacity

**Why This Works:**
- Sorting ensures we can use pointers
- Prefix max gives best capacity in valid range
- Checking pairs (i, j) where j < i avoids duplicates

**Example: costs=[4,8,5,3], capacity=[1,5,2,7], budget=8**

Filter: all machines fit individually
Sort: [{3,7}, {4,1}, {5,2}, {8,5}]
Prefix max: [7, 7, 7, 7]

i=0 (cost=3, cap=7): remaining=5, no partner (i=0), max=7
i=1 (cost=4, cap=1): remaining=4, partner idx=0, cap=7+1=8 ✓
i=2 (cost=5, cap=2): remaining=3, pointer shrinks to -1, no valid
i=3 (cost=8, cap=5): remaining=0, no valid

Result: 8 ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Filter: O(n)
  - Sort: O(n log n)
  - Prefix max: O(n)
  - Two-pointer scan: O(n) with amortized pointer moves
  - Overall: O(n log n)

- Space complexity: $$O(n)$$
  - Filtered array: O(n)
  - Prefix array: O(n)
  - Overall: O(n)

# Code
```typescript []
const maxCapacity = (costs: number[], capacity: number[], budget: number): number => {
    const numMachines = costs.length;
    
    const affordableMachines: Array<{ cost: number; capacity: number }> = [];
    
    for (let i = 0; i < numMachines; i++) {
        if (costs[i] < budget) {
            affordableMachines.push({ 
                cost: costs[i], 
                capacity: capacity[i] 
            });
        }
    }

    if (affordableMachines.length === 0) return 0;

    affordableMachines.sort((a, b) => a.cost - b.cost);

    const numAffordable = affordableMachines.length;
    
    const prefixMaxCapacity = new Int32Array(numAffordable);
    let runningMaxCapacity = 0;

    for (let i = 0; i < numAffordable; i++) {
        runningMaxCapacity = Math.max(runningMaxCapacity, affordableMachines[i].capacity);
        prefixMaxCapacity[i] = runningMaxCapacity;
    }

    let maxTotalCapacity = runningMaxCapacity;

    let maxAffordableIndex = numAffordable - 1;

    for (let currentIndex = 0; currentIndex < numAffordable; currentIndex++) {
        const currentCost = affordableMachines[currentIndex].cost;
        const currentCapacity = affordableMachines[currentIndex].capacity;
        const remainingBudget = budget - currentCost;

        while (maxAffordableIndex >= 0 && 
               affordableMachines[maxAffordableIndex].cost >= remainingBudget) {
            maxAffordableIndex--;
        }

        const bestPartnerIndex = Math.min(maxAffordableIndex, currentIndex - 1);

        if (bestPartnerIndex >= 0) {
            const partnerCapacity = prefixMaxCapacity[bestPartnerIndex];
            const totalCapacity = currentCapacity + partnerCapacity;
            
            maxTotalCapacity = Math.max(maxTotalCapacity, totalCapacity);
        }
    }

    return maxTotalCapacity;
};
```