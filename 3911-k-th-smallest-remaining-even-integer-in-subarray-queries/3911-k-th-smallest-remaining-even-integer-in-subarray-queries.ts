const kthRemainingInteger = (nums: number[], queries: number[][]): number[] => {
    const n = nums.length;

    // evenPrefix[i] = count of even numbers in nums[0..i-1]
    const evenPrefix = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        evenPrefix[i + 1] = evenPrefix[i] + (nums[i] % 2 === 0 ? 1 : 0);
    }

    // Count of even numbers in nums[l..r] with value ≤ val
    const countEvensLeq = (l: number, r: number, val: number): number => {
        // Upper bound: first index in [l, r+1) where nums[idx] > val
        let lo = l, hi = r + 1;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (nums[mid] <= val) lo = mid + 1;
            else hi = mid;
        }
        return evenPrefix[lo] - evenPrefix[l];
    };

    const result: number[] = [];

    for (const [l, r, k] of queries) {
        const totalEvensRemoved = evenPrefix[r + 1] - evenPrefix[l];

        // Find smallest m where m - countEvensLeq(l, r, 2*m) >= k
        let lo = k, hi = k + totalEvensRemoved;
        while (lo < hi) {
            const mid = (lo + hi) >>> 1;
            if (mid - countEvensLeq(l, r, 2 * mid) >= k) hi = mid;
            else lo = mid + 1;
        }

        result.push(2 * lo);
    }

    return result;
};