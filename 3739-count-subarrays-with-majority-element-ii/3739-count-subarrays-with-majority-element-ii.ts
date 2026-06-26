const countMajoritySubarrays = (nums: number[], target: number): number => {
    const n = nums.length;

    // prefixFreq[k + n] = how many times prefix sum k has been seen
    const prefixFreq = new Array<number>(2 * n + 1).fill(0);
    prefixFreq[n] = 1; // prefix sum 0 seen once (empty prefix)

    let offsetIdx = n; // current prefix sum + n (offset to avoid negative indices)
    let strictlyLess = 0; // count of past prefix sums strictly less than current
    let count = 0;

    for (let i = 0; i < n; i++) {
        if (nums[i] === target) {
            // +1: current prefix sum grows, so one more past sum is now strictly less
            strictlyLess += prefixFreq[offsetIdx];
            offsetIdx++;
            prefixFreq[offsetIdx]++;
        } else {
            // -1: current prefix sum shrinks, drop the frequency at new position
            offsetIdx--;
            strictlyLess -= prefixFreq[offsetIdx];
            prefixFreq[offsetIdx]++;
        }
        // All subarrays ending at i where target is majority correspond to
        // past prefix sums strictly less than current
        count += strictlyLess;
    }

    return count;
};