const productExceptSelf = (nums: number[]): number[] => {
    const result = new Array(nums.length).fill(1);

    // First pass: result[i] holds the product of all elements to the left of i
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // Second pass: multiply in the product of all elements to the right of i
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};