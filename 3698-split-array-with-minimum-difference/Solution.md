# Mountain Split Pattern | 42 Lines | O(n) | 6ms

# Intuition
We need to find a split point where the left part is strictly increasing and the right part is strictly decreasing. The array must follow a "mountain" pattern - it can only increase then decrease, never increase again after decreasing.

# Approach
Traverse the array once to identify the pattern. Track when we transition from increasing to decreasing (the peak). If the array increases again after decreasing, return -1. Handle three cases: purely increasing arrays, fixed peak positions, and moveable peaks where we can assign the peak element to either side for optimal difference.

# Complexity
- Time complexity: $$O(n)$$
- Space complexity: $$O(1)$$

# Code
```typescript
const splitArray = (nums: number[]): number => {
    if (nums.length === 2) return Math.abs(nums[0] - nums[1]);

    let isStillIncreasing = true;
    let leftSum = nums[0];
    let rightSum = 0;
    let peakIndex = 0;

    for (let currentIndex = 1; currentIndex < nums.length; currentIndex++) {
        const currentElement = nums[currentIndex];
        const previousElement = nums[currentIndex - 1];

        if (isStillIncreasing && currentElement <= previousElement) {
            isStillIncreasing = false;
            peakIndex = currentIndex - 1;
        } else if (!isStillIncreasing && currentElement >= previousElement) {
            return -1;
        }

        if (isStillIncreasing) {
            leftSum += currentElement;
        } else {
            rightSum += currentElement;
        }
    }

    if (isStillIncreasing) {
        const lastElement = nums[nums.length - 1];
        return Math.abs(leftSum - lastElement * 2);
    }

    const peakElement = nums[peakIndex];
    const nextElement = nums[peakIndex + 1];
    if (peakIndex === 0 || peakElement <= nextElement) {
        return Math.abs(leftSum - rightSum);
    }

    const sumWithPeakInLeft = Math.abs(leftSum - rightSum);
    const sumWithPeakInRight = Math.abs((leftSum - peakElement) - (rightSum + peakElement));
    
    return Math.min(sumWithPeakInLeft, sumWithPeakInRight);
};
```