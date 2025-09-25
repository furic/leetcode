# Lexicographic Sorting Optimization | 15 Lines | O(n log n) | 0ms

# Intuition
To find the longest common prefix among all strings, we need to find characters that appear in the same position across every string. Instead of comparing all strings with each other, we can use the key insight that if we sort the strings lexicographically, we only need to compare the first and last strings. Any common prefix between these extremes must also be common to all strings in between.

# Approach
I'll use lexicographic sorting with two-string comparison:

1. **Handle Edge Case**: Return empty string immediately if the input array is empty.

2. **Lexicographic Sorting**: Sort the array of strings lexicographically. This arranges strings in alphabetical order, placing the "smallest" and "largest" strings at the extremes.

3. **Two-String Comparison**: After sorting, compare only the first string (lexicographically smallest) and the last string (lexicographically largest). 

4. **Character-by-Character Matching**: Iterate through characters of both strings simultaneously, building the common prefix until we find a mismatch or reach the end of the shorter string.

5. **Why This Works**: If the first and last strings share a prefix, all strings in between must also share that same prefix due to the lexicographic ordering property.

This approach reduces the problem from comparing n strings to comparing just 2 strings.

# Complexity
- Time complexity: $$O(n \log n \cdot m + m)$$
  - Sorting n strings takes O(n log n × m) where m is average string length
  - Comparing first and last strings takes O(m) in worst case
  - Overall dominated by sorting: O(n log n × m)

- Space complexity: $$O(1)$$ or $$O(n \cdot m)$$
  - Sorting may require O(n × m) space depending on implementation
  - Common prefix string uses O(m) space
  - No additional data structures beyond the result

# Code
```typescript []
const longestCommonPrefix = (strs: string[]): string => {
    if (!strs.length) return "";
    
    strs.sort();
    const lexicallyFirstString = strs[0];
    const lexicallyLastString = strs[strs.length - 1];
    
    let commonPrefix = "";
    for (let characterIndex = 0; characterIndex < lexicallyFirstString.length; characterIndex++) {
        if (lexicallyFirstString[characterIndex] === lexicallyLastString[characterIndex]) {
            commonPrefix += lexicallyFirstString[characterIndex];
        } else {
            break;
        }
    }
    
    return commonPrefix;
};
```