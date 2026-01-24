function minPairSum(nums: number[]): number {
    nums.sort((a, b)=>a-b);
    const n = nums.length;
    let result = Number.MIN_SAFE_INTEGER;
    for(let i=0;i< n/2;i++){
         result = Math.max(result, nums[i] + nums[n - i - 1]);
    }
    return result;
};