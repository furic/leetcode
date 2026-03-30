const maxProduct = (nums: number[]): number => {
    let best = Number.MIN_SAFE_INTEGER;
    let product = 1;

    for (const num of nums) {
        product *= num;
        best = Math.max(best, product);
        if (product === 0) product = 1;
    }

    product = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        product *= nums[i];
        best = Math.max(best, product);
        if (product === 0) product = 1;
    }

    return best;
};