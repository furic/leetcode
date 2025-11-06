function minNumber(nums1: number[], nums2: number[]): number {
    nums1.sort((a, b) => a - b);

    for (let i = 0; i < nums1.length; i++) {
        if (nums2.includes(nums1[i])) {
            return nums1[i];
        }
    }

    const firstChar = nums1[0];
    const secondChar = Math.min(...nums2);
    return Math.min(+`${firstChar}${secondChar}`, +`${secondChar}${firstChar}`)
};