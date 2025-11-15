# Zero-Jumping Optimization | 35 Lines | O(n√n) | 150ms

# Intuition
A substring is dominant if `ones >= zeros²`. The key insight is that as we add more zeros to a substring, the required number of ones grows quadratically. This means we can only have O(√n) zeros in any valid substring, which allows us to optimize by "jumping" between zero positions.

# Approach
- **Preprocessing - Track Zero Positions**:
  - Build `previousZeroPos[i]` array that stores the last index where '0' occurred before position i
  - This allows us to quickly jump backwards through the string, hopping from one zero to the previous zero
  - previousZeroPos[0] = -1 (sentinel value for no previous zero)
  
- **Main Algorithm - Fix Right Endpoint**:
  - For each position as the ending point of substrings (endPos from 1 to n)
  - Work backwards from this endpoint, jumping through positions with zeros
  - Track the cumulative zero count as we jump backwards
  
- **Zero-Jumping Strategy**:
  - Start at current ending position with zeroCount = 0 or 1
  - Use previousZeroPos to jump to positions of previous zeros
  - At each jump, increment zeroCount
  - Stop when zeroCount² > n (impossible to have enough 1's)
  
- **Counting Valid Substrings**:
  - For each zero count level (after each jump):
  - Calculate substring from previousZeroPos[currentStartPos] to endPos
  - substringLength = endPos - previousZeroPos[currentStartPos]
  - oneCount = substringLength - zeroCount
  - Check dominance condition: oneCount >= zeroCount²
  
- **Segment-Based Counting**:
  - When dominance condition is met, count all valid starting positions
  - segmentLength = distance to previous zero = currentStartPos - previousZeroPos[currentStartPos]
  - This segment contains consecutive 1's (or is the start of string)
  - extraOnes = oneCount - zeroCount² (how many "spare" 1's we have)
  - validStartPositions = min(segmentLength, extraOnes + 1)
  - We can start at any position in this segment up to extraOnes positions back
  
- **Why This Works**:
  - By fixing the zero positions and counting 1's in between, we avoid checking every possible substring
  - The quadratic growth of required 1's limits zeros to O(√n)
  - For each zero configuration, we count all valid starting positions in O(1)
  
- **Optimization Details**:
  - Early termination when zeroCount² > stringLength
  - Jump directly between zeros instead of checking every position
  - Batch count multiple substrings with same zero count

# Complexity
- Time complexity: $$O(n\sqrt{n})$$
  - Outer loop: O(n) iterations (one per ending position)
  - Inner loop: O(√n) iterations per ending position (limited by zeroCount² ≤ n)
  - Total: O(n × √n) = O(n√n)

- Space complexity: $$O(n)$$
  - previousZeroPos array: O(n) space
  - All other variables: O(1) space
  - Total: O(n)

# Code
```typescript
const numberOfSubstrings = (s: string): number => {
    const stringLength = s.length;
    
    const previousZeroPos: number[] = new Array(stringLength + 1);
    previousZeroPos[0] = -1;
    
    for (let index = 0; index < stringLength; index++) {
        const isFirstChar = index === 0;
        const previousCharIsZero = index > 0 && s[index - 1] === '0';
        
        if (isFirstChar || previousCharIsZero) {
            previousZeroPos[index + 1] = index;
        } else {
            previousZeroPos[index + 1] = previousZeroPos[index];
        }
    }
    
    let dominantSubstringCount = 0;
    
    for (let endPos = 1; endPos <= stringLength; endPos++) {
        let zeroCount = s[endPos - 1] === '0' ? 1 : 0;
        let currentStartPos = endPos;
        
        while (currentStartPos > 0 && zeroCount * zeroCount <= stringLength) {
            const substringLength = endPos - previousZeroPos[currentStartPos];
            const oneCount = substringLength - zeroCount;
            
            if (oneCount >= zeroCount * zeroCount) {
                const segmentLength = currentStartPos - previousZeroPos[currentStartPos];
                const extraOnes = oneCount - zeroCount * zeroCount;
                const validStartPositions = Math.min(segmentLength, extraOnes + 1);
                
                dominantSubstringCount += validStartPositions;
            }
            
            currentStartPos = previousZeroPos[currentStartPos];
            zeroCount++;
        }
    }
    
    return dominantSubstringCount;
};
```