# DP with Match Length + Greedy Check | 48 Lines | O(n²) | 333ms

# Intuition

Precompute two properties for all substrings: (1) if it's a palindrome, (2) how many chars match from ends inward. Use these to quickly check if removing one char creates a palindrome. Check longest substrings first.

# Approach

**Precomputation (DP):**
1. **isPal[i][j]**: Is s[i..j] a palindrome?
2. **matchLen[i][j]**: How many chars match from ends?
   - If s[i]==s[j]: matchLen = 1 + matchLen[i+1][j-1]
   - Else: 0

**Almost-Palindrome Check:**
- If matchLen ≥ halfLen: already palindrome (all pairs match)
- Otherwise: find first mismatch at position m
  - Left char = s[i+m], Right char = s[j-m]
  - Try removing left: check if s[i+m+1..j-m] is palindrome
  - Try removing right: check if s[i+m..j-m-1] is palindrome

**Optimization:**
- Use flat typed arrays (1D indexing: i×n+j)
- Check longest to shortest (early exit)

**Example: s="abca"**

Precompute:
- "abca": matchLen=1 (only 'a'=='a')
- First mismatch: pos 1 ('b'≠'c')
- Remove 'b': "aca" → not palindrome
- Remove 'c': "aba" → palindrome ✓

Result: 4 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Precompute DP tables: O(n²)
  - Check all substrings: O(n²) with early exit
  - Per check: O(1) using precomputed values
  - Overall: O(n²)

- Space complexity: $$O(n^2)$$
  - Two DP tables: O(n²) each
  - Flat array representation
  - Overall: O(n²)

# Code
```typescript []
const almostPalindromic = (s: string): number => {
    const n = s.length;
    
    const isPal = new Uint8Array(n * n);
    const matchLen = new Uint16Array(n * n);
    
    for (let i = n - 1; i >= 0; i--) {
        isPal[i * n + i] = 1;
        matchLen[i * n + i] = 1;
        
        if (i + 1 < n) {
            const idx = i * n + i + 1;
            if (s[i] === s[i + 1]) {
                isPal[idx] = 1;
                matchLen[idx] = 1;
            }
        }
        
        for (let j = i + 2; j < n; j++) {
            const idx = i * n + j;
            if (s[i] === s[j]) {
                const inner = (i + 1) * n + j - 1;
                isPal[idx] = isPal[inner];
                matchLen[idx] = 1 + matchLen[inner];
            }
        }
    }
    
    for (let len = n; len >= 2; len--) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            const idx = i * n + j;
            const halfLen = len >> 1;
            
            if (matchLen[idx] >= halfLen) return len;
            
            const m = matchLen[idx];
            const l = i + m;
            const r = j - m;
            
            if (isPal[(l + 1) * n + r] || isPal[l * n + r - 1]) return len;
        }
    }
    
    return 2;
};
```