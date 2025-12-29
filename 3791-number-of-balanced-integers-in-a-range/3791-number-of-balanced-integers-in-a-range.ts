/**
 * Counts balanced integers in a range
 * A balanced integer has ≥2 digits and equal sums at odd/even positions (1-indexed from left)
 * Uses digit DP to count efficiently
 */
const countBalanced = (low: number, high: number): number => {
    /**
     * Counts balanced integers from 0 to n using digit DP
     */
    const countUpTo = (n: number): number => {
        if (n < 0) return 0;

        const digits = n.toString().split('').map(Number);
        const numDigits = digits.length;
        
        // Offset to handle negative differences (difference can range from -9*digits to +9*digits)
        const DIFFERENCE_OFFSET = 200;
        const memoization = new Map<string, number>();

        /**
         * DP function to count valid numbers
         * @param digitIndex - current position in the number (0-indexed from left)
         * @param sumDifference - (even_position_sum - odd_position_sum) + OFFSET
         * @param isTightBound - whether we're still bounded by n's digits
         */
        const dp = (
            digitIndex: number,
            sumDifference: number,
            isTightBound: boolean
        ): number => {
            // Base case: reached end of number
            if (digitIndex === numDigits) {
                // Balanced if even_sum - odd_sum = 0 (sumDifference = OFFSET)
                return sumDifference === DIFFERENCE_OFFSET ? 1 : 0;
            }

            // Memoization (only for non-tight cases as tight depends on n's digits)
            const stateKey = `${digitIndex},${sumDifference},${isTightBound}`;
            if (!isTightBound && memoization.has(stateKey)) {
                return memoization.get(stateKey)!;
            }

            let count = 0;
            const maxDigit = isTightBound ? digits[digitIndex] : 9;

            // Try all possible digits at this position
            for (let digit = 0; digit <= maxDigit; digit++) {
                // Calculate 1-indexed position from left (leftmost is position 1)
                const positionFromLeft = digitIndex + 1;
                const isOddPositionFromLeft = positionFromLeft % 2 === 1;

                // Update difference: odd positions subtract, even positions add
                // diff = even_sum - odd_sum, so:
                // - odd position: subtract digit (contributes to odd_sum)
                // - even position: add digit (contributes to even_sum)
                const newDifference = isOddPositionFromLeft 
                    ? sumDifference - digit 
                    : sumDifference + digit;

                count += dp(
                    digitIndex + 1,
                    newDifference,
                    isTightBound && digit === maxDigit
                );
            }

            if (!isTightBound) memoization.set(stateKey, count);
            return count;
        };

        return dp(0, DIFFERENCE_OFFSET, true);
    };

    // Count in range [low, high] using inclusion-exclusion
    return countUpTo(high) - countUpTo(low - 1);
};