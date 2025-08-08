# Regex One-Liner Validation | 6 Lines | O(1) | 0ms

# Intuition

Check the conditions **directly using regular expressions**:
- Length constraint,
- Character whitelist,
- At least one vowel,
- At least one consonant.

All can be checked in a **clean, chainable, one-liner**.

---

# Approach

Use:

✅ `word.length >= 3` to check length.  
✅ `/^[a-zA-Z0-9]+$/` to ensure only letters and digits.  
✅ `/[aeiouAEIOU]/` to ensure at least one vowel.  
✅ `/[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]/` to ensure at least one consonant (note `c, g` are included within the ranges).  

Combine with `&&` for immediate readability and constant-time checking.

---

# Complexity

- Time complexity:  
  $$O(1)$$  
  as regex checks are independent of input size (bounded by word length, up to a small constant).

- Space complexity:  
  $$O(1)$$  
  no extra space used beyond regex engine internals.

---

# Code

```typescript
const isValid = (word: string): boolean => 
    word.length >= 3 &&
    /^[a-zA-Z0-9]+$/.test(word) &&
    /[aeiouAEIOU]/.test(word) &&
    /[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]/.test(word);
```