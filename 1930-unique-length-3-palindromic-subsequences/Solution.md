# First-Last Bitmask | 33 Lines | O(n) | 40ms

# Intuition
A length-3 palindrome has the form XYX where the first and last characters must be the same. To count unique palindromes, we can fix the outer character and count how many unique middle characters exist between its first and last occurrence in the string.

# Approach
- **Key Observation**:
  - Length-3 palindrome structure: XYX (outer chars must match)
  - For each character that appears multiple times, we can form palindromes using it as outer chars
  - Need to count unique middle characters between first and last occurrence
  
- **Preprocessing - Track Positions**:
  - Build two arrays (size 26 for 'a'-'z'):
  - `firstOccurrence[c]`: index of first appearance of character c
  - `lastOccurrence[c]`: index of last appearance of character c
  - Single pass through string to populate these arrays

- **Main Algorithm - Fix Outer Character**:
  - For each character in alphabet (a-z):
  - Check if it appears at least twice with gap between (lastPos - firstPos > 1)
  - If yes, scan all characters between first and last occurrence
  - Track unique middle characters using bitmask

- **Bitmask Optimization**:
  - Use 26-bit integer to represent presence of each character (a-z)
  - For each character between first and last occurrence:
    - Convert char to index (0-25)
    - Set corresponding bit: `bitmask |= 1 << charIndex`
  - Count set bits = number of unique middle characters
  - Each unique middle char forms one unique palindrome with this outer char

- **Why Bitmask Works**:
  - Need to track which characters appear (not how many times)
  - Bitmask provides O(1) insertion and automatic deduplication
  - 26 characters fit in a single integer (JavaScript numbers are 64-bit)
  - Bit counting gives us unique character count efficiently

- **Counting Unique Palindromes**:
  - For outer character X with k unique middle chars between first/last occurrence
  - Creates k unique palindromes: XY₁X, XY₂X, ..., XYₖX
  - Sum across all possible outer characters gives total count

- **Example Walkthrough** ("aabca"):
  - Character 'a': first=0, last=4
    - Middle chars between indices 0 and 4: "abc" at indices 1,2,3
    - Unique middle chars: {a, b, c} → 3 palindromes: "aaa", "aba", "aca"
  - Character 'b': first=1, last=1 → no gap, skip
  - Character 'c': first=3, last=3 → no gap, skip
  - Total: 3 unique palindromes

- **Edge Cases Handled**:
  - Character appears only once: firstPos == lastPos, skip
  - Characters adjacent: lastPos - firstPos == 1, no middle char, skip
  - Single character in middle: creates one palindrome

# Complexity
- Time complexity: $$O(n)$$
  - First pass to build occurrence arrays: O(n)
  - Outer loop over 26 characters: O(26)
  - For each character, scan between first/last: O(n) worst case
  - Total: O(n + 26×n) = O(n) since we scan each position at most 26 times
  - Bit counting: O(26) per character = O(1)

- Space complexity: $$O(1)$$
  - Two fixed-size arrays of 26 elements: O(26) = O(1)
  - Bitmask variable: O(1)
  - No additional space dependent on input size

# Code
```typescript
const countPalindromicSubsequence = (s: string): number => {
    const ALPHABET_SIZE = 26;
    const stringLength = s.length;
    const firstOccurrence = Array(ALPHABET_SIZE).fill(-1);
    const lastOccurrence = Array(ALPHABET_SIZE).fill(-1);

    for (let index = 0; index < stringLength; index++) {
        const charCode = s.charCodeAt(index) - 97;
        if (firstOccurrence[charCode] === -1) {
            firstOccurrence[charCode] = index;
        }
        lastOccurrence[charCode] = index;
    }

    let uniquePalindromeCount = 0;

    for (let outerChar = 0; outerChar < ALPHABET_SIZE; outerChar++) {
        const firstPos = firstOccurrence[outerChar];
        const lastPos = lastOccurrence[outerChar];
        
        if (firstPos !== -1 && lastPos - firstPos > 1) {
            let middleCharsBitmask = 0;
            
            for (let middleIndex = firstPos + 1; middleIndex < lastPos; middleIndex++) {
                const middleCharCode = s.charCodeAt(middleIndex) - 97;
                middleCharsBitmask |= 1 << middleCharCode;
            }
            
            const uniqueMiddleChars = countSetBits(middleCharsBitmask);
            uniquePalindromeCount += uniqueMiddleChars;
        }
    }

    return uniquePalindromeCount;
};

const countSetBits = (num: number): number => {
    let count = 0;
    while (num > 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
};
```