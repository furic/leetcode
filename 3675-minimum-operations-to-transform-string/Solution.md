# Circular Alphabet Transformation | 8 Lines | O(n) | 65ms

# Intuition
Since each operation transforms all occurrences of a character to the next character in the circular alphabet, we need to find the character that requires the most steps to reach 'a'. The key insight is that each character has a fixed number of steps needed to reach 'a' through the circular transformation, and the minimum operations equals the maximum steps required by any character in the string.

# Approach
I'll calculate the steps required for each unique character and find the maximum:

1. **Circular Distance Calculation**: For each character, calculate how many steps it takes to reach 'a' using the circular alphabet property. For character c, the steps to 'a' is (26 - (c - 'a')) % 26.

2. **Character Processing**: Iterate through each character in the string and compute its distance to 'a'. Since all occurrences of the same character are transformed simultaneously, we only care about unique characters.

3. **Maximum Steps**: Track the maximum number of steps required among all characters. This represents the minimum number of operations needed since we must perform at least this many operations to transform the "hardest" character.

4. **Circular Alphabet Logic**: The formula (26 - (char_code - 'a')) % 26 handles the circular nature:
   - 'a' → 0 steps (already at target)
   - 'b' → 25 steps (b→c→...→z→a)
   - 'z' → 1 step (z→a)

The algorithm works because operations are global - once we decide to transform all instances of a character, they all change simultaneously.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string to examine each character
  - Each character requires constant-time arithmetic to compute steps to 'a'
  - No nested loops or complex operations

- Space complexity: $$O(1)$$
  - Only using a constant amount of extra variables (maxSteps, stepsToA)
  - No additional data structures that scale with input size
  - All computations performed with primitive operations

# Code
```typescript []
const minOperations = (s: string): number => {
    let maxSteps = 0;

    for (const char of s) {
        const stepsToA = (26 - (char.charCodeAt(0) - 'a'.charCodeAt(0))) % 26;
        maxSteps = Math.max(maxSteps, stepsToA);
    }

    return maxSteps;
};
```