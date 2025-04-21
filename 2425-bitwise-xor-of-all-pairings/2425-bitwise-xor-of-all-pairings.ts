function xorAllNums(nums1: number[], nums2: number[]): number {
    let xor1 = 0, xor2 = 0;
    if (nums2.length % 2 === 1) {
        for (const num of nums1) {
            xor1 ^= num;
        }
    }
    if (nums1.length % 2 === 1) {
        for (const num of nums2) {
            xor2 ^= num;
        }
    }
    return xor1 ^ xor2;
};