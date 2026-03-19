function mergeSortedArrays(nums1: number[], nums2: number[]): number[] {
    let i1: number = 0;
    let i2: number = 0;
    const mergedNums: number[] = [];
    while(i1 < nums1.length || i2 < nums2.length) {
        if (i1 >= nums1.length) {
            mergedNums.push(nums2[i2]);
            i2++;
            continue;
        }
        if (i2 >= nums2.length) {
            mergedNums.push(nums1[i1]);
            i1++;
            continue;
        }
        const num1 = nums1[i1];
        const num2 = nums2[i2];
        if (num1 < num2) {
            mergedNums.push(num1);
            i1++;
        } else {
            mergedNums.push(num2);
            i2++;
        }
    }
    return mergedNums;
}

function findMedian(sortedNums: number[]): number {
    // middle index of an odd array
    // (3 - 1) / 2 == 1.0 exactly
    // if array is even length, e.g. 4:
    // (4 - 1) / 2 == 1.5 exactly (base 2!)
    // use 1 and 2
    const middle = (sortedNums.length - 1) / 2;
    if (middle % 1 === 0) return sortedNums[middle];
    return (sortedNums[middle - 0.5] + sortedNums[middle + 0.5]) / 2;
}

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const mergedNums: number[] = mergeSortedArrays(nums1, nums2);
    return findMedian(mergedNums);
};