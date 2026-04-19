function findMin(nums: number[], startIndex: number) {
    let min = nums[startIndex];
    let minIndex = startIndex;
    for(let i = startIndex; i < nums.length; i++) {
        min = Math.min(min, nums[i]);
        if(min === nums[i]) minIndex = i;
    }
    return minIndex;
}

function firstStableIndex(nums: number[], k: number): number {
    let max = -1;
    let minIndex = findMin(nums, 0);
    for(let i = 0; i < nums.length; i++) {
        if(i > minIndex) minIndex = findMin(nums, i);
        max = Math.max(max, nums[i]);
        const min = nums[minIndex];
        if((max - min) <= k) return i;
    }

    return -1;
};