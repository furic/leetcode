function canMakeEqual(nums: number[], k: number): boolean {
    const n = nums.length;
    let flipsToMakeAllPos = 0;
    let flipsToMakeAllNeg = 0;
    let expectedSignForPos = 1;  // Targeting all 1's
    let expectedSignForNeg = 1;  // Targeting all -1's

    const needsFlip = (current: number, expected: number): boolean => current * expected === -1;
    const isAligned = (current: number, expected: number): boolean => current * expected === 1;

    for (let i = 0; i < n - 1; i++) {
        const currentValue = nums[i];

        if (needsFlip(currentValue, expectedSignForPos)) {
            flipsToMakeAllPos++;
            expectedSignForPos = -1;
        } else {
            expectedSignForPos = 1;
        }

        if (isAligned(currentValue, expectedSignForNeg)) {
            flipsToMakeAllNeg++;
            expectedSignForNeg = -1;
        } else {
            expectedSignForNeg = 1;
        }

        if (flipsToMakeAllPos > k && flipsToMakeAllNeg > k) {
            return false;
        }
    }

    const lastValue = nums[n - 1];
    const canMakeAllPos = isAligned(lastValue, expectedSignForPos) && flipsToMakeAllPos <= k;
    const canMakeAllNeg = needsFlip(lastValue, expectedSignForNeg) && flipsToMakeAllNeg <= k;

    return canMakeAllPos || canMakeAllNeg;
}