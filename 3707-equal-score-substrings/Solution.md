# Prefix Sum Binary Search | 33 Lines | O(n) | 1ms

# Intuition
We need to find a split position where the left and right substrings have equal scores. By precomputing prefix sums of character scores, we can efficiently check each possible split position in O(1) time per position.

# Approach
**Prefix Sum with Two-Pointer Logic:**
- Build a prefix sum array to enable O(1) score queries for any substring
- Check if total score is even (necessary condition for equal split)
- Iterate through split positions, checking if left score equals half of total
- Use early termination when left score exceeds target

**Step-by-Step Process:**

1. **Build Prefix Sum Array:**
   - `prefixSum[i]` = sum of character scores from index 0 to i
   - Character score: `charCodeAt(i) - 96` (since 'a' has ASCII 97, 'a'-96=1)
   - Build iteratively: `prefixSum[i] = prefixSum[i-1] + charScore[i]`
   - Enables O(1) query: score of s[0..i] = prefixSum[i]

2. **Check Total Score Parity:**
   - Total score = `prefixSum[stringLength - 1]`
   - If odd, cannot split evenly → return false immediately
   - If even, calculate `targetScore = totalScore / 2`

3. **Try Each Split Position:**
   - Valid splits: index 0 to stringLength-2 (must leave ≥1 char on right)
   - For split at index i:
     - Left substring: s[0..i] with score = prefixSum[i]
     - Right substring: s[i+1..n-1] with score = totalScore - prefixSum[i]
   
4. **Validation at Each Position:**
   - If `leftScore == targetScore`, then `rightScore == targetScore` (since total is 2×target)
   - Return true immediately when found
   
   **Early Termination Optimization:**
   - If `leftScore > targetScore`, all future splits will also exceed (scores are cumulative)
   - Can return false early without checking remaining positions

5. **Final Return:**
   - If no valid split found after checking all positions, return false

**Why Prefix Sum:**
- Without prefix sum: O(n) to calculate each substring score → O(n²) total
- With prefix sum: O(1) to calculate each substring score → O(n) total
- Trade space for time: O(n) space for O(n) speedup

**Example Walkthrough (s = "adcb"):**
- Character scores: a=1, d=4, c=3, b=2
- prefixSum = [1, 5, 8, 10]
- totalScore = 10, targetScore = 5

- Split at i=0: leftScore=1, not equal to 5
- Split at i=1: leftScore=5, equals target → return true ✓

**Example 2 (s = "bace"):**
- Character scores: b=2, a=1, c=3, e=5
- prefixSum = [2, 3, 6, 11]
- totalScore = 11 (odd) → return false immediately ✗

**Edge Cases:**
- String length 2: One valid split position
- All same characters: Valid if even length
- Scores increasing: Early termination kicks in
- Total odd: Immediate rejection

# Complexity
- Time complexity: $$O(n)$$ for building prefix sum + O(n) for checking splits
- Space complexity: $$O(n)$$ for prefix sum array

# Code
```typescript
const scoreBalance = (s: string): boolean => {
    const stringLength = s.length;
    
    const prefixSum: number[] = new Array(stringLength);
    
    for (let index = 0; index < stringLength; index++) {
        const charScore = s.charCodeAt(index) - 96;
        prefixSum[index] = (index > 0 ? prefixSum[index - 1] : 0) + charScore;
    }
    
    const totalScore = prefixSum[stringLength - 1];
    
    if (totalScore % 2 !== 0) {
        return false;
    }
    
    const targetScore = totalScore / 2;
    
    for (let splitIndex = 0; splitIndex < stringLength - 1; splitIndex++) {
        const leftScore = prefixSum[splitIndex];
        
        if (leftScore > targetScore) {
            return false;
        }
        
        if (leftScore === targetScore) {
            return true;
        }
    }
    
    return false;
};
```