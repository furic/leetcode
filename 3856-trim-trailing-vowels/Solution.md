# Reverse Scan Vowel Trim | 6 Lines | O(n) | 0ms

# Intuition
Trailing vowels are at the end of the string, so we scan backwards from the last character and stop as soon as we hit a consonant. Everything up to and including that consonant is the answer.

# Approach
- Define the vowel set as the string `'aeiou'` for quick `includes` lookup.
- Start pointer `i` at the last index (`s.length - 1`).
- Walk `i` leftward while `s[i]` is a vowel — decrement `i` each step.
- When the loop ends, `i` points to the last non-vowel character (or `-1` if the entire string is vowels).
- Return `s.slice(0, i + 1)`, which cleanly handles both the all-vowel case (returns `""`) and the no-trailing-vowel case (returns `s` unchanged).

# Complexity
- Time complexity: $$O(n)$$ — in the worst case (all vowels) we scan the entire string once.

- Space complexity: $$O(n)$$ — for the returned slice; the algorithm itself uses $$O(1)$$ extra space.

# Code
```typescript []
const trimTrailingVowels = (s: string): string => {
    const VOWELS = 'aeiou';
    let i = s.length - 1;
    while (i >= 0 && VOWELS.includes(s[i])) {
        i--;
    }
    return s.slice(0, i + 1);
};
```