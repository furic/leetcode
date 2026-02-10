const longestBalanced = (nums: number[]): number => {
    let maxLength = 0;

    // Try each starting position
    for (let i = 0; i < nums.length; i++) {
        const evens = new Set<number>();
        const odds = new Set<number>();

        // Extend to each ending position
        for (let j = i; j < nums.length; j++) {
            // Add current number to the appropriate set
            if (nums[j] % 2 === 0) {
                evens.add(nums[j]);
            } else {
                odds.add(nums[j]);
            }

            // Check if this subarray is balanced
            if (evens.size === odds.size) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }

    return maxLength;
}