# Vowel Frequency Sort with First-Occurrence Tiebreak | 14 Lines | O(n log n) | 63ms

# Intuition
Extract vowels, sort them by frequency descending (ties broken by first occurrence), then place them back into the vowel positions of the original string in order.

# Approach
- Count frequency of each vowel and record each vowel's first occurrence index in one pass.
- Sort distinct vowels by descending frequency, breaking ties by ascending first occurrence index.
- Expand the sorted vowels into a flat sequence (`vowelQueue`) respecting their counts.
- Rebuild the string: for non-vowel characters keep the original; for vowel positions consume from `vowelQueue` in order.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by sorting the flat vowel sequence; there are at most `n` vowels and 5 distinct vowel types, so sorting is effectively $$O(n \log n)$$.

- Space complexity: $$O(n)$$ — for the vowel queue and output array.

# Code
```typescript []
const sortVowels = (s: string): string => {
    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

    const freq = new Map<string, number>();
    const firstOccurrence = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (!VOWELS.has(ch)) continue;
        freq.set(ch, (freq.get(ch) ?? 0) + 1);
        if (!firstOccurrence.has(ch)) firstOccurrence.set(ch, i);
    }

    const sortedVowels = [...freq.keys()].sort((a, b) =>
        freq.get(b)! - freq.get(a)! || firstOccurrence.get(a)! - firstOccurrence.get(b)!
    );

    const vowelQueue = sortedVowels.flatMap((v) => Array(freq.get(v)!).fill(v));

    let vowelIndex = 0;
    return s.split('').map((ch) => VOWELS.has(ch) ? vowelQueue[vowelIndex++] : ch).join('');
};
```