# Frequency Map Counting | 15 Lines | O(n) | 3ms

# Intuition
We need to find all elements that appear with the maximum frequency and return the total count of these elements (not just how many distinct elements have max frequency). This requires two passes: first to count frequencies and find the maximum, then to sum up all occurrences of elements that have that maximum frequency.

# Approach
I'll use a frequency map with two-pass counting:

1. **Build Frequency Map**: Create a hash map to count the frequency of each element in the array by iterating through all elements.

2. **Find Maximum Frequency**: Scan through all frequencies in the map to determine the highest frequency value.

3. **Count Total Elements**: Iterate through the frequency map again, and for each element that has the maximum frequency, add its frequency to the running total.

4. **Edge Case**: Handle empty array by returning 0 immediately.

5. **Example Walkthrough**: For [1,2,2,3,1,4]:
   - Frequencies: {1→2, 2→2, 3→1, 4→1}
   - Max frequency: 2
   - Elements with max frequency: 1 and 2, each appearing 2 times
   - Total: 2 + 2 = 4

# Complexity
- Time complexity: $$O(n)$$
  - First pass to build frequency map: O(n)
  - Finding maximum frequency: O(unique elements) ≤ O(n)
  - Counting total elements with max frequency: O(unique elements) ≤ O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Frequency map stores at most n entries (when all elements are distinct)
  - In worst case, space is proportional to number of unique elements
  - All other variables use constant space

# Code
```typescript []
const maxFrequencyElements = (nums: number[]): number => {
    if (nums.length === 0) return 0;

    const elementFrequencies = new Map<number, number>();
    
    for (const element of nums) {
        elementFrequencies.set(element, (elementFrequencies.get(element) || 0) + 1);
    }

    const maxFrequency = Math.max(...elementFrequencies.values());
    
    let totalElementsWithMaxFrequency = 0;
    for (const [_, frequency] of elementFrequencies) {
        if (frequency === maxFrequency) {
            totalElementsWithMaxFrequency += frequency;
        }
    }

    return totalElementsWithMaxFrequency;
};
```