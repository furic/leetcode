/**
 * Calculates the maximum GCD score achievable by selecting a subarray
 * and optionally doubling up to k elements (each element at most once).
 * Score = subarray length × GCD of elements × (2 if doubling is beneficial, 1 otherwise)
 */
const maxGCDScore = (nums: number[], k: number): number => {
    const n = nums.length;
    let maxScore = 0;
    
    /**
     * Calculates greatest common divisor using Euclidean algorithm
     */
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };
    
    // Try all possible subarrays [i, j]
    for (let i = 0; i < n; i++) {
        let subarrayGCD = nums[i];
        let minPowerOfTwo = Number.MAX_SAFE_INTEGER;
        let elementsWithMinPower = 0;
        
        for (let j = i; j < n; j++) {
            // Update GCD to include nums[j]
            subarrayGCD = gcd(subarrayGCD, nums[j]);
            
            // Extract lowest bit: represents highest power of 2 dividing nums[j]
            const lowestBit = nums[j] & -nums[j];
            
            // Track minimum power of 2 and count elements with it
            if (lowestBit < minPowerOfTwo) {
                minPowerOfTwo = lowestBit;
                elementsWithMinPower = 1;
            } else if (lowestBit === minPowerOfTwo) {
                elementsWithMinPower++;
            }
            
            // Calculate score: length × GCD × multiplier
            // If we can double all "bottleneck" elements (those with min power), GCD doubles
            const canDoubleGCD = elementsWithMinPower <= k;
            const subarrayLength = j - i + 1;
            const score = subarrayGCD * (canDoubleGCD ? 2 : 1) * subarrayLength;
            
            maxScore = Math.max(maxScore, score);
        }
    }
    
    return maxScore;
};