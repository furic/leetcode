function maxDistance(nums1: number[], nums2: number[]): number {
    let i = 0;
    let res = 0;
    const n1 = nums1.length, n2 = nums2.length;

    for (let j = 0; j < n2; j++) {
        while (i < n1 && nums1[i] > nums2[j]) {
            i++;
        }
        if (i === n1) 
            break;

        res = Math.max(res, j - i);
    }

    return res;
};