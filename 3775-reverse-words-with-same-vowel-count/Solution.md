# Vowel-Based Conditional Reversal | 12 Lines | O(n×m) | 117ms

# Intuition
The problem requires selective word reversal based on matching vowel counts with the first word. By establishing a target vowel count from the first word and then comparing each subsequent word against this target, we can determine which words to reverse using a functional transformation pipeline.

# Approach
- **Define Vowel Set**:
  - Create a Set containing the five vowels: 'a', 'e', 'i', 'o', 'u'
  - Set provides O(1) lookup time for checking if a character is a vowel
  - Case doesn't matter since input is guaranteed lowercase

- **Vowel Counting Helper Function**:
  - Split word into individual characters
  - Filter to keep only characters present in the vowel Set
  - Return the length of this filtered array
  - This gives the total vowel count for any word

- **Establish Target Benchmark**:
  - Split the entire string by spaces to get array of words
  - Count vowels in the first word (index 0)
  - This becomes the target count that determines which words get reversed
  - First word itself is never reversed (remains unchanged by definition)

- **Conditional Word Transformation**:
  - Map over each word with its index
  - For the first word (i === 0): return unchanged
  - For all other words: count their vowels and compare to target
  - If vowel count matches target: reverse the word by splitting into characters, reversing the array, then joining back
  - If vowel count differs: return word unchanged

- **String Reconstruction**:
  - After mapping transforms each word appropriately
  - Join all words back together with single spaces
  - This produces the final result string

- **Example Walkthrough** ("cat and mice"):
  - First word "cat" has 1 vowel (the 'a')
  - Target count established as 1
  - Second word "and" has 1 vowel (the 'a') → matches target → reverse to "dna"
  - Third word "mice" has 2 vowels ('i' and 'e') → doesn't match → keep as "mice"
  - Result: "cat dna mice"

# Complexity
- Time complexity: $$O(n \times m)$$
  - Split string into words: O(n) where n is string length
  - For each word, count vowels: O(m) where m is word length
  - Reverse operation (when needed): O(m) per word
  - Total across all words: O(n × m) considering we process each character

- Space complexity: $$O(n \times m)$$
  - Words array: O(n) for storing split words
  - Character arrays during reversal: O(m) per word
  - Output array from map: O(n × m)
  - Total: O(n × m)

# Code
```typescript
const reverseWords = (s: string): string => {
    const VOWELS = new Set(["a", "e", "i", "o", "u"]);

    const countVowels = (word: string): number =>
        word.split("").filter((c) => VOWELS.has(c)).length;

    const words = s.split(" ");
    const targetCount = countVowels(words[0]);

    return words
        .map((word, i) =>
            i === 0
                ? word
                : countVowels(word) === targetCount
                ? word.split("").reverse().join("")
                : word
        )
        .join(" ");
};
```