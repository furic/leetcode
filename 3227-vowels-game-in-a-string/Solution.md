# Game Theory Vowel Existence | 1 Line | O(n) | 14ms

# Intuition
This game has a surprisingly simple solution. Alice wins if and only if the string contains at least one vowel. The key insight is that Alice can always win by taking the entire string (if it has an odd number of vowels) or by strategically removing vowels to force Bob into a losing position. If there are no vowels, Alice cannot make any move and loses immediately.

# Approach
I'll analyze this as a game theory problem with optimal play:

1. **No Vowels Case**: If the string contains no vowels, Alice cannot make a move (she needs odd vowels, minimum 1). Bob wins immediately.

2. **Has Vowels Case**: If the string contains at least one vowel, Alice can always force a win through optimal play:
   - If total vowels is odd: Alice takes the entire string and wins
   - If total vowels is even: Alice can remove individual vowels (odd count = 1) to reduce the total, eventually forcing Bob into a position where he cannot move

3. **Optimal Strategy**: With optimal play, the outcome depends solely on vowel existence, not on complex game tree analysis. Alice's ability to remove single vowels gives her ultimate control over the game state.

4. **Implementation**: Simply check if any character in the string is a vowel. Use string methods for efficient vowel detection.

The game reduces to a simple existence check because Alice's strategic options with vowel manipulation guarantee victory when vowels are present.

# Complexity
- Time complexity: $$O(n)$$
  - Split string into characters: O(n)
  - Check each character against vowel string: O(n) total
  - Early termination possible with `some()` method when first vowel is found

- Space complexity: $$O(n)$$
  - String split creates array of n characters
  - Vowel string "aeiou" uses constant O(1) space
  - No additional data structures beyond the character array

# Code
```typescript []
const doesAliceWin = (s: string): boolean => s.split('').some((c) => "aeiou".includes(c));
```