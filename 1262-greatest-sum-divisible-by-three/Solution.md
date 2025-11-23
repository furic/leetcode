# Greedy Remainder Tracking | 35 Lines | O(n) |

# Intuition
To maximize a sum divisible by 3, we start with the total sum. If it's not divisible by 3, we need to remove the minimum value to make it divisible. The key insight is that we only need to track remainders (0, 1, or 2) and remove the smallest numbers with specific remainders.

# Approach
- **Core Strategy - Greedy Removal**:
  - Calculate total sum of all numbers
  - If total sum is divisible by 3, we're done (maximum achieved)
  - Otherwise, remove minimum value to fix the remainder
  - Goal: Minimize what we remove to maximize final sum

- **Remainder Mathematics**:
  - Every number has remainder 0, 1, or 2 when divided by 3
  - Sum of numbers with remainder 0 doesn't affect total remainder
  - To fix total remainder of 1: Remove remainder-1 OR remove two remainder-2 numbers
  - To fix total remainder of 2: Remove remainder-2 OR remove two remainder-1 numbers
  - Why? (1+1)%3=2, (2+2)%3=1 - remainders combine additively

- **Track Smallest Numbers by Remainder**:
  - Maintain two smallest numbers with remainder 1
  - Maintain two smallest numbers with remainder 2
  - Don't need to track remainder 0 (doesn't affect correction strategy)
  - Use Infinity as sentinel for "not found"

- **Correction Strategy Based on Total Remainder**:
  - **Total remainder = 0**: No correction needed, return totalSum
  - **Total remainder = 1**: Two options
    - Remove 1 smallest number with remainder 1
    - Remove 2 smallest numbers with remainder 2 (if both exist)
    - Choose option that removes minimum value
  - **Total remainder = 2**: Two options
    - Remove 1 smallest number with remainder 2
    - Remove 2 smallest numbers with remainder 1 (if both exist)
    - Choose option that removes minimum value

- **Why Track Two Smallest**:
  - Need option to remove two numbers with same remainder
  - Removing smallest minimizes loss, maximizes final sum
  - Example: If remainder=2, and we have [5,8] with rem=1, remove 5+8=13 is better than larger single rem=2

- **Example Walkthrough** ([3,6,5,1,8]):
  - totalSum = 23, remainder = 2
  - Numbers by remainder: rem=0:{3,6}, rem=1:{1}, rem=2:{5,8}
  - Smallest with rem=1: 1
  - Smallest with rem=2: 5, second smallest: 8
  - To fix remainder of 2:
    - Option 1: Remove smallest rem=2 = 5 → sum = 18
    - Option 2: Remove two smallest rem=1 = only have one, so Infinity
  - Choose option 1: 23 - 5 = 18

- **Edge Cases Handled**:
  - All numbers have remainder 0: totalSum divisible by 3
  - Cannot fix remainder: return 0 (minToRemove = Infinity)
  - Only one number available when two needed: use Infinity check

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through array to calculate sum and track smallest numbers
  - Each number processed in O(1) time
  - Final calculation: O(1)
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Four variables for smallest numbers (constant space)
  - totalSum and totalRemainder variables
  - No additional data structures that grow with input
  - Total: O(1)

# Code
```typescript
const maxSumDivThree = (nums: number[]): number => {
    let totalSum = 0;
    let smallestRemainder1 = Infinity;
    let secondSmallestRemainder1 = Infinity;
    let smallestRemainder2 = Infinity;
    let secondSmallestRemainder2 = Infinity;

    for (const num of nums) {
        totalSum += num;
        const remainder = num % 3;

        if (remainder === 1) {
            if (num < smallestRemainder1) {
                secondSmallestRemainder1 = smallestRemainder1;
                smallestRemainder1 = num;
            } else if (num < secondSmallestRemainder1) {
                secondSmallestRemainder1 = num;
            }
        } else if (remainder === 2) {
            if (num < smallestRemainder2) {
                secondSmallestRemainder2 = smallestRemainder2;
                smallestRemainder2 = num;
            } else if (num < secondSmallestRemainder2) {
                secondSmallestRemainder2 = num;
            }
        }
    }

    const totalRemainder = totalSum % 3;
    
    if (totalRemainder === 0) {
        return totalSum;
    }

    let minToRemove = Infinity;

    if (totalRemainder === 1) {
        minToRemove = Math.min(
            smallestRemainder1,
            secondSmallestRemainder2 < Infinity 
                ? smallestRemainder2 + secondSmallestRemainder2 
                : Infinity
        );
    } else {
        minToRemove = Math.min(
            smallestRemainder2,
            secondSmallestRemainder1 < Infinity 
                ? smallestRemainder1 + secondSmallestRemainder1 
                : Infinity
        );
    }

    return minToRemove === Infinity ? 0 : totalSum - minToRemove;
};
```