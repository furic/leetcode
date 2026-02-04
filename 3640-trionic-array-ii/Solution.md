# Three-Phase DP | 38 Lines | O(n) | 31ms

# Intuition

Track maximum sum for each of three phases at each position: (1) increasing, (2) increasing→decreasing, (3) complete trionic (increasing→decreasing→increasing). Use DP to transition between phases based on monotonicity.

# Approach

**DP States:**
- `phase1[i]` = max sum of strictly increasing subarray ending at i
- `phase2[i]` = max sum of (increasing→decreasing) ending at i
- `phase3[i]` = max sum of complete trionic ending at i

**Transitions:**
- **Phase 1** (if nums[i] > nums[i-1]):
  - Start fresh: nums[i-1] + nums[i]
  - Extend: phase1[i-1] + nums[i]

- **Phase 2** (if nums[i] < nums[i-1]):
  - Transition from phase 1: phase1[i-1] + nums[i]
  - Continue phase 2: phase2[i-1] + nums[i]

- **Phase 3** (if nums[i] > nums[i-1]):
  - Transition from phase 2: phase2[i-1] + nums[i]
  - Continue phase 3: phase3[i-1] + nums[i]

**Result:**
- Maximum value in phase3 array

**Example: nums=[1,4,2,7]**

i=1: nums[1]=4 > nums[0]=1
- phase1[1] = max(1+4, -∞+4) = 5

i=2: nums[2]=2 < nums[1]=4
- phase2[2] = max(5+2, -∞+2) = 7

i=3: nums[3]=7 > nums[2]=2
- phase3[3] = max(7+7, -∞+7) = 14 ✓

Result: 14 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through array
  - Constant work per position
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Three DP arrays: O(n) each
  - Overall: O(n)
  - Could optimize to O(1) by tracking only previous values

# Code
```typescript []
const maxSumTrionic = (nums: number[]): number => {
    const arrayLength = nums.length;

    const phaseOneSum = Array(arrayLength).fill(-Infinity);
    const phaseTwoSum = Array(arrayLength).fill(-Infinity);
    const phaseThreeSum = Array(arrayLength).fill(-Infinity);

    let maxTrionicSum = -Infinity;

    for (let i = 1; i < arrayLength; i++) {
        if (nums[i] > nums[i - 1]) {
            phaseOneSum[i] = Math.max(
                nums[i - 1] + nums[i],
                phaseOneSum[i - 1] + nums[i]
            );
        }

        if (nums[i] < nums[i - 1]) {
            const transitionFromPhaseOne = phaseOneSum[i - 1] !== -Infinity
                ? phaseOneSum[i - 1] + nums[i]
                : -Infinity;
            const continuePhaseTwo = phaseTwoSum[i - 1] !== -Infinity
                ? phaseTwoSum[i - 1] + nums[i]
                : -Infinity;
            phaseTwoSum[i] = Math.max(transitionFromPhaseOne, continuePhaseTwo);
        }

        if (nums[i] > nums[i - 1]) {
            const transitionFromPhaseTwo = phaseTwoSum[i - 1] !== -Infinity
                ? phaseTwoSum[i - 1] + nums[i]
                : -Infinity;
            const continuePhaseThree = phaseThreeSum[i - 1] !== -Infinity
                ? phaseThreeSum[i - 1] + nums[i]
                : -Infinity;
            phaseThreeSum[i] = Math.max(transitionFromPhaseTwo, continuePhaseThree);
        }

        maxTrionicSum = Math.max(maxTrionicSum, phaseThreeSum[i]);
    }

    return maxTrionicSum;
};
```