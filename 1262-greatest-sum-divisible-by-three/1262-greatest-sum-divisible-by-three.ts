/**
 * Finds the maximum sum of array elements that is divisible by 3
 * Strategy: Start with total sum, then remove the minimum elements needed to make it divisible by 3
 */
const maxSumDivThree = (nums: number[]): number => {
    let totalSum = 0;

    // Track the two smallest numbers with remainder 1 when divided by 3
    let smallestRemainder1 = Infinity;
    let secondSmallestRemainder1 = Infinity;

    // Track the two smallest numbers with remainder 2 when divided by 3
    let smallestRemainder2 = Infinity;
    let secondSmallestRemainder2 = Infinity;

    // Calculate total sum and track smallest numbers by their remainder
    for (const num of nums) {
        totalSum += num;
        const remainder = num % 3;

        if (remainder === 1) {
            // Update the two smallest numbers with remainder 1
            if (num < smallestRemainder1) {
                secondSmallestRemainder1 = smallestRemainder1;
                smallestRemainder1 = num;
            } else if (num < secondSmallestRemainder1) {
                secondSmallestRemainder1 = num;
            }
        } else if (remainder === 2) {
            // Update the two smallest numbers with remainder 2
            if (num < smallestRemainder2) {
                secondSmallestRemainder2 = smallestRemainder2;
                smallestRemainder2 = num;
            } else if (num < secondSmallestRemainder2) {
                secondSmallestRemainder2 = num;
            }
        }
    }

    const totalRemainder = totalSum % 3;
    
    // If total sum is already divisible by 3, no removal needed
    if (totalRemainder === 0) {
        return totalSum;
    }

    // Calculate minimum amount to remove to make sum divisible by 3
    let minToRemove = Infinity;

    if (totalRemainder === 1) {
        // To fix remainder of 1: remove 1 number with rem=1, OR 2 numbers with rem=2
        // (since 2+2=4≡1 mod 3)
        minToRemove = Math.min(
            smallestRemainder1,
            secondSmallestRemainder2 < Infinity 
                ? smallestRemainder2 + secondSmallestRemainder2 
                : Infinity
        );
    } else {
        // To fix remainder of 2: remove 1 number with rem=2, OR 2 numbers with rem=1
        // (since 1+1=2 mod 3)
        minToRemove = Math.min(
            smallestRemainder2,
            secondSmallestRemainder1 < Infinity 
                ? smallestRemainder1 + secondSmallestRemainder1 
                : Infinity
        );
    }

    return minToRemove === Infinity ? 0 : totalSum - minToRemove;
};