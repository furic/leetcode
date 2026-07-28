# Half Frequency Sort Palindrome Build | 10 Lines | O(n) | 6ms

# Intuition
Since `s` is a palindrome, the first half determines the whole string. To get the lexicographically smallest result, sort the first half's characters in ascending order and mirror them on the right.

# Approach
- Count character frequencies in the first half (`s.length >> 1` characters).
- Build `left` by appending characters in alphabetical order (a to z) according to their frequency. Build `right` as the reverse of `left`.
- Append the middle character unchanged if the string has odd length.
- Return `left + mid + right`.

# Complexity
- Time complexity: $$O(n)$$ — one pass to count, O(26) to build halves, O(n) to join.

- Space complexity: $$O(n)$$ — for the output string.

# Code
```typescript []
const smallestPalindrome = (s: string): string => {
    const halfLen = s.length >> 1;
    const freq = new Int32Array(26);
    for (let i = 0; i < halfLen; i++) freq[s.charCodeAt(i) - 97]++;

    let left = '', right = '';
    for (let i = 0; i < 26; i++) {
        if (freq[i] > 0) {
            const chars = String.fromCharCode(i + 97).repeat(freq[i]);
            left  += chars;
            right  = chars + right;
        }
    }

    const mid = s.length % 2 !== 0 ? s[halfLen] : '';
    return left + mid + right;
};
```