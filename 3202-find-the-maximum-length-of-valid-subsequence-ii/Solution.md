# Two Pointer Interleaving | 46 Lines | O(n²) | 13ms

# Intuition
For a subsequence to be valid, consecutive pairs must have the same sum modulo k. This means if we have elements a, b, c in the subsequence, then (a+b) % k = (b+c) % k. This constraint implies that elements at even positions must have the same remainder when divided by k, and elements at odd positions must also have the same remainder. So we're essentially interleaving two groups of numbers with specific modulo values.

# Approach
I'll solve this by trying all possible pairs of modulo groups and finding the optimal interleaving:

1. **Group by Modulo**: Group all indices by their corresponding number's modulo k value.

2. **Optimization**: Sort groups by size (largest first) to enable early termination when smaller groups can't improve the result.

3. **Single Group Check**: The longest subsequence could be an entire group of numbers with the same modulo (alternating pattern like a, b, a, b where a % k = b % k).

4. **Pair-wise Interleaving**: For each pair of different modulo groups, calculate the maximum length achievable by interleaving elements from both groups while maintaining the index order.

5. **Two-Pointer Technique**: For each pair of groups, use a two-pointer approach to count:
   - Whether we can start with the larger group
   - Whether we can end with the larger group  
   - Maximum number of valid interleaving pairs

The key insight is that we're looking for subsequences of the form [g1[i1], g2[j1], g1[i2], g2[j2], ...] where g1 and g2 are modulo groups and indices are strictly increasing.

# Complexity
- Time complexity: $$O(n^2)$$
  - Grouping elements takes O(n) time
  - We check at most k² pairs of groups, where k ≤ n
  - For each pair, the two-pointer interleaving check takes O(n) time
  - Overall: O(k² × n) = O(n²) in worst case

- Space complexity: $$O(n)$$
  - We store all n indices grouped by their modulo values
  - Additional space for group sorting and processing is O(k) = O(n)

# Code
```typescript []
const maximumLength = (nums: number[], k: number): number => {
    const indicesByModulo: number[][] = Array.from({ length: k }, () => []);
    
    nums.forEach((num, index) => {
        indicesByModulo[num % k].push(index);
    });
    
    indicesByModulo.sort((groupA, groupB) => groupB.length - groupA.length);
    
    let maxSubsequenceLength = Math.max(2, indicesByModulo[0].length);
    
    for (let firstGroupIndex = 0; firstGroupIndex < indicesByModulo.length; firstGroupIndex++) {
        const firstGroup = indicesByModulo[firstGroupIndex];
        
        for (let secondGroupIndex = firstGroupIndex + 1; secondGroupIndex < indicesByModulo.length; secondGroupIndex++) {
            const secondGroup = indicesByModulo[secondGroupIndex];
            
            if (firstGroup.length + secondGroup.length <= maxSubsequenceLength) {
                break;
            }
            
            const interleavedLength = calculateInterleavedLength(firstGroup, secondGroup);
            maxSubsequenceLength = Math.max(maxSubsequenceLength, interleavedLength);
        }
    }
    
    return maxSubsequenceLength;
};

const calculateInterleavedLength = (largerGroup: number[], smallerGroup: number[]): number => {
    let totalLength = 0;
    
    if (largerGroup[0] < smallerGroup[0]) {
        totalLength++;
    }
    
    if (largerGroup[largerGroup.length - 1] < smallerGroup[smallerGroup.length - 1]) {
        totalLength++;
    }
    
    let largerGroupPointer = 0;
    let smallerGroupPointer = 0;
    
    while (largerGroupPointer < largerGroup.length && smallerGroupPointer < smallerGroup.length) {
        if (smallerGroup[smallerGroupPointer] < largerGroup[largerGroupPointer]) {
            totalLength += 2;
        }
        
        while (smallerGroupPointer < smallerGroup.length && 
               smallerGroup[smallerGroupPointer] < largerGroup[largerGroupPointer]) {
            smallerGroupPointer++;
        }
        
        largerGroupPointer++;
    }
    
    return totalLength;
};
```