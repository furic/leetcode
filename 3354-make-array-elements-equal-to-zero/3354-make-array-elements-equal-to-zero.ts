const countValidSelections = (nums: number[]): number => {
    let validCount = 0;
    const totalSum = nums.reduce((acc, val) => acc + val, 0);
    let leftSum = 0;
    let rightSum = totalSum;

    // Check each position that could be a starting point (where nums[i] == 0)
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 0) {
            // For a valid selection, left and right sums must be nearly balanced
            // If leftSum and rightSum differ by at most 1, the ball can clear all numbers
            const difference = Math.abs(leftSum - rightSum);
            
            if (difference <= 1) {
                // Both directions (left and right) are valid when perfectly balanced
                // Only one direction valid when difference is exactly 1
                validCount += (difference === 0) ? 2 : 1;
            }
        } else {
            // Update sums as we move through the array
            leftSum += nums[index];
            rightSum -= nums[index];
        }
    }

    return validCount;
};