const maxProduct = (nums: number[], k: number, limit: number): number => {
    const memo = new Map<string, number>();

    // Compute maximum possible alternating sum range for quick bounds rejection
    const maxPossibleSum = nums.reduce((acc, num) => acc + num, 0);

    if (k < -maxPossibleSum || k > maxPossibleSum) {
        return -1;
    }

    /**
     * Recursively finds the maximum product of a valid subsequence.
     * @param index Current index in the nums array
     * @param signTurn 0 = not started, 1 = even index (positive), 2 = odd index (negative)
     * @param currentProduct Product of selected numbers so far
     * @param remainingAltSum Remaining alternating sum needed
     * @param hasTaken Whether we have included at least one number in the subsequence
     */
    function dfs(
        index: number,
        signTurn: number,
        currentProduct: number,
        remainingAltSum: number,
        hasTaken: boolean
    ): number {
        // Base case: end of array
        if (index === nums.length) {
            if (hasTaken && remainingAltSum === 0 && currentProduct <= limit) {
                return currentProduct;
            }
            return -1;
        }

        // Cap product to limit+1 to reduce memo key explosion
        const cappedProduct = Math.min(currentProduct, limit + 1);
        const memoKey = `${index},${signTurn},${cappedProduct},${remainingAltSum}`;

        if (memo.has(memoKey)) return memo.get(memoKey)!;

        // Option 1: Skip the current number
        let maxResult = dfs(index + 1, signTurn, currentProduct, remainingAltSum, hasTaken);

        // Option 2: Take the current number
        const nextSignTurn = signTurn === 2 ? 1 : 2; // Alternate sign
        const sign = signTurn === 2 ? -1 : 1;         // Apply alternating sign logic
        const newProduct = currentProduct * nums[index];
        const newAltSum = remainingAltSum - sign * nums[index];

        const includeResult = dfs(index + 1, nextSignTurn, newProduct, newAltSum, true);
        maxResult = Math.max(maxResult, includeResult);

        memo.set(memoKey, maxResult);
        return maxResult;
    }

    return dfs(0, 0, 1, k, false);
}