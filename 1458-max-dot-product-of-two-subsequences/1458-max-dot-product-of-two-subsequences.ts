function maxDotProduct(nums1: number[], nums2: number[]): number {
    if (nums1[0] > nums2[0]) {
        const tmp = nums1; nums1 = nums2; nums2 = tmp;
    }

    const max1 = Math.max(...nums1);
    const min2 = Math.min(...nums2);
    if (max1 < 0 && min2 > 0) return max1 * min2;

    const m = nums1.length, n = nums2.length;
    const dp: number[] = new Array(n + 1).fill(0);

    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            const v = nums1[i] * nums2[j] + dp[j];
            if (v > dp[j + 1]) dp[j + 1] = v;
        }
        for (let j = 0; j < n; j++) {
            if (dp[j + 1] < dp[j]) dp[j + 1] = dp[j];
        }
    }

    return dp[n];
};