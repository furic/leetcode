# Brute Force with Frequency Check | 42 Lines | O(n²×26) | 174ms

# Intuition

Check all possible substrings and verify if each has balanced character frequencies. A substring is balanced when all distinct characters appear the same number of times.

# Approach

**Brute Force with Frequency Tracking:**
1. Try all starting positions
2. For each start, extend end position
3. Maintain frequency array for current substring
4. Check balance condition: all non-zero frequencies equal
5. Track maximum balanced length

**Balance Check:**
- Iterate through frequency array
- Find first non-zero frequency (set as target)
- Verify all other non-zero frequencies match target
- O(26) = O(1) per check

**Example: s="abbac"**

Try substrings:
- "abba": freq={'a':2,'b':2} → balanced ✓, length=4
- "abbac": freq={'a':3,'b':2,'c':1} → not balanced ✗

Result: 4 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Two nested loops: O(n²) substrings
  - Balance check: O(26) = O(1) per substring
  - Overall: O(n²)

- Space complexity: $$O(1)$$
  - Frequency array: O(26) = O(1)
  - No additional data structures
  - Overall: O(1)

# Code
```typescript []
const longestBalanced = (s: string): number => {
    const stringLength = s.length;
    const ALPHABET_SIZE = 26;
    const CHAR_CODE_A = 97;
    let maxBalancedLength = 0;
    
    const isBalanced = (charFrequency: number[]): boolean => {
        let commonCount = -1;
        
        for (let i = 0; i < ALPHABET_SIZE; i++) {
            if (charFrequency[i] === 0) continue;
            
            if (commonCount === -1) {
                commonCount = charFrequency[i];
            } else if (charFrequency[i] !== commonCount) {
                return false;
            }
        }
        
        return true;
    };
    
    for (let start = 0; start < stringLength; start++) {
        const charFrequency = new Array(ALPHABET_SIZE).fill(0);
        
        for (let end = start; end < stringLength; end++) {
            charFrequency[s.charCodeAt(end) - CHAR_CODE_A]++;
            
            if (isBalanced(charFrequency)) {
                const substringLength = end - start + 1;
                maxBalancedLength = Math.max(maxBalancedLength, substringLength);
            }
        }
    }
    
    return maxBalancedLength;
};
```