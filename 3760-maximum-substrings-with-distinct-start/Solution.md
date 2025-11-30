# Distinct Character Count | 7 Lines | O(n) | 33ms

# Intuition
Each substring must start with a distinct character, so the maximum number of substrings is bounded by the number of unique characters. The key insight is that we can always achieve this bound by starting a new substring at each first occurrence of a character.

# Approach
- **Upper Bound Observation**:
  - Each substring needs a distinct starting character
  - Maximum possible substrings = number of unique characters in string
  - With only 26 lowercase letters, this is at most 26

- **Achievability - Greedy Construction**:
  - Process string left to right
  - Start a new substring whenever we encounter a character not yet used as a starting character
  - All remaining characters extend the last substring
  - This always achieves exactly (number of unique characters) substrings

- **Why Greedy Works**:
  - First occurrence of each character: Start new substring here
  - Subsequent occurrences: Already used as starter, must be part of existing substring
  - Example "abab": 
    - 'a' at index 0: new substring starting with 'a'
    - 'b' at index 1: new substring starting with 'b'
    - 'a' at index 2: 'a' already used, extend current
    - 'b' at index 3: 'b' already used, extend current
    - Result: ["a", "bab"] or equivalently track count = 2

- **Simple Implementation**:
  - Count distinct characters using a Set
  - Each unique character contributes exactly one substring
  - No need to actually construct the substrings

- **Example Walkthrough** ("abab"):
  - Process 'a': not in set, add it, count = 1
  - Process 'b': not in set, add it, count = 2
  - Process 'a': already in set, skip
  - Process 'b': already in set, skip
  - Result: 2

- **Edge Cases Handled**:
  - All same characters ("aaaa"): only 1 unique char → 1 substring
  - All distinct characters ("abcd"): 4 unique chars → 4 substrings
  - Single character: 1 substring

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string
  - Set operations (has, add): O(1) average
  - Total: O(n)

- Space complexity: $$O(1)$$
  - Set stores at most 26 characters (lowercase English letters)
  - Constant space regardless of input length
  - Total: O(26) = O(1)

# Code
```typescript
const maxDistinct = (s: string): number => {
    const used = new Set<string>();
    let count = 0;

    for (const char of s) {
        if (!used.has(char)) {
            count++;
            used.add(char);
        }
    }

    return count;
};
```