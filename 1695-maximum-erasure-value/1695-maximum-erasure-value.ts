const maximumUniqueSubarray = (nums: number[]): number => {
    const seen = new Set();
    let left = 0;
    let currentWindowSum = 0;
    let maxWindowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];

        // If duplicate found, move the left pointer until num is unique in the window
        while (seen.has(num)) {
            currentWindowSum -= nums[left];
            seen.delete(nums[left]);
            left++;
        }

        // Add current number to the window
        currentWindowSum += num;
        seen.add(num);

        // Update maximum sum found so far
        maxWindowSum = Math.max(maxWindowSum, currentWindowSum);
    }

    return maxWindowSum;
};