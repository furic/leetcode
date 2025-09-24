# Hash Map Lookup Pattern | 14 Lines | O(n) | 3ms

# Intuition
For each number in the array, we need to find if there exists another number that complements it to reach the target sum. Instead of checking all pairs (which would be O(n²)), we can use a hash map to store numbers we've seen and their indices, then check if the required complement exists in constant time.

# Approach
I'll use a single-pass hash map approach:

1. **Hash Map for Lookups**: Create a map to store each number and its index as we iterate through the array.

2. **Complement Calculation**: For each current number, calculate what its complement should be: `complement = target - currentNumber`.

3. **Check for Existing Complement**: Before storing the current number, check if its complement already exists in the map. If it does, we've found our pair.

4. **Return Indices**: When a complement is found, return the stored index of the complement and the current index.

5. **Store Current Number**: If no complement is found, store the current number and its index for potential future matches.

6. **Single Pass Efficiency**: This approach only requires one pass through the array, making it much more efficient than checking all pairs.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array: O(n)
  - Hash map lookup and insertion operations: O(1) average case
  - No nested loops required

- Space complexity: $$O(n)$$
  - Hash map stores at most n key-value pairs
  - In worst case (no solution found until end), we store n-1 numbers
  - Additional space is proportional to input size

# Code
```typescript []
const twoSum = (nums: number[], target: number): number[] => {
    const valueToIndex = new Map<number, number>();
    
    for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
        const currentNumber = nums[currentIndex];
        const complement = target - currentNumber;
        
        if (valueToIndex.has(complement)) {
            return [valueToIndex.get(complement)!, currentIndex];
        }
        
        valueToIndex.set(currentNumber, currentIndex);
    }
    
    return [];
};
```