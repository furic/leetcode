function minRemoval(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let i = 0;
    for (let j = 0; j < n; j++){
        if (i <= j && nums[j] > nums[i] * k){
            i++;
        }
    }
    return i;
};