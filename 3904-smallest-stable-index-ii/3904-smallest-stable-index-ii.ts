/*
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
*/

function findSuffixMinIdx(nums: number[], startIndex: number) {
    let min = nums[startIndex];
    let minIndex = startIndex;
    for(let i = startIndex; i < nums.length; i++) {
        min = Math.min(min, nums[i]);
        if(min === nums[i]) minIndex = i;
    }
    return minIndex;
}

// function findSuffixMinIdx(nums: number[], from: number): number {
//     let min = nums[from];
//     let minIdx = from;
//     for (let i = from; i < nums.length; i++) {
//         if (nums[i] < min) {
//             min = nums[i];
//             minIdx = i;
//         }
//     }
//     return minIdx;
// }

function firstStableIndex(nums: number[], k: number): number {
    let prefixMax = -1;
    let suffixMinIdx = findSuffixMinIdx(nums, 0);

    for (let i = 0; i < nums.length; i++) {
        if (i > suffixMinIdx) suffixMinIdx = findSuffixMinIdx(nums, i);
        prefixMax = Math.max(prefixMax, nums[i]);
        if (prefixMax - nums[suffixMinIdx] <= k) return i;
    }

    return -1;
}