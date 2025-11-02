const maxProduct = (nums: number[]): number => {
    nums.sort((a, b) => Math.abs(b) - Math.abs(a)); 
    return Math.abs(nums[0]) * Math.abs(nums[1]) * 1e5;
};