# Two Pass Vowel Sorting | 14 Lines | O(n log v) | 72ms

# Intuition
We need to sort vowels by ASCII value while keeping consonants in their original positions. This suggests a two-pass approach: first extract and sort all vowels, then replace vowels in the original string with the sorted vowels in order. Since we need to preserve the positions of consonants, we can't simply sort the entire string.

# Approach
I'll use a two-pass algorithm with vowel extraction and replacement:

1. **Vowel Identification**: Create a set containing all vowels (both uppercase and lowercase) for efficient lookup in O(1) time.

2. **Extract and Sort**: Filter the string to extract only vowels, then sort them by ASCII value. JavaScript's default string sort is lexicographic, which corresponds to ASCII ordering for single characters.

3. **Replace in Original Positions**: Iterate through the original string character by character. When encountering a vowel, replace it with the next vowel from the sorted list. When encountering a consonant, leave it unchanged.

4. **Position Tracking**: Use a pointer to track the current position in the sorted vowels array, incrementing it each time we replace a vowel.

5. **String Reconstruction**: Convert the character array back to a string for the final result.

This approach ensures consonants stay in place while vowels are redistributed in sorted order.

# Complexity
- Time complexity: $$O(n \log v)$$
  - Extracting vowels: O(n) where n is string length
  - Sorting v vowels: O(v log v) where v is number of vowels
  - Replacing vowels: O(n)
  - Total: O(n + v log v) = O(n log v) since v ≤ n

- Space complexity: $$O(n)$$
  - Sorted vowels array: O(v) space where v ≤ n
  - Character array copy of string: O(n) space
  - Vowel set: O(1) space (constant 10 vowels)
  - Total: O(n)

# Code
```typescript []
const sortVowels = (s: string): string => {
    const vowelSet = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

    const sortedVowels = s.split("").filter(char => vowelSet.has(char)).sort();

    let vowelIndex = 0;
    const characters = s.split("");

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
        if (vowelSet.has(characters[charIndex])) {
            characters[charIndex] = sortedVowels[vowelIndex++];
        }
    }

    return characters.join("");
};
```