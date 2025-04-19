const minimumPairRemoval = (nums: number[]): number => {
    let ops = 0;

    const isNonDecreasing = (arr: number[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    };

    while (!isNonDecreasing(nums)) {
        let minSum = Infinity;
        let index = -1;

        // Find leftmost adjacent pair with minimum sum
        for (let i = 0; i < nums.length - 1; i++) {
            let sum = nums[i] + nums[i + 1];
            if (sum < minSum) {
                minSum = sum;
                index = i;
            }
        }

        // Replace the pair with their sum
        const merged = nums[index] + nums[index + 1];
        nums.splice(index, 2, merged);

        ops++;
    }

    return ops;
}