const findMedianSortedArrays = (nums1: number[], nums2: number[]): number => {
    // Binary search on the shorter array
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];

    const m = nums1.length;
    const n = nums2.length;
    const halfLen = (m + n + 1) >> 1;

    let lo = 0;
    let hi = m;

    while (lo <= hi) {
        const cut1 = (lo + hi) >> 1;       // partition index in nums1
        const cut2 = halfLen - cut1;        // partition index in nums2

        const left1  = cut1 > 0 ? nums1[cut1 - 1] : -Infinity;
        const right1 = cut1 < m ? nums1[cut1]      :  Infinity;
        const left2  = cut2 > 0 ? nums2[cut2 - 1]  : -Infinity;
        const right2 = cut2 < n ? nums2[cut2]       :  Infinity;

        if (left1 <= right2 && left2 <= right1) {
            const maxLeft  = Math.max(left1, left2);
            const minRight = Math.min(right1, right2);
            return (m + n) & 1 ? maxLeft : (maxLeft + minRight) / 2;
        }

        if (left1 > right2) hi = cut1 - 1;
        else                lo = cut1 + 1;
    }

    return 0;
};