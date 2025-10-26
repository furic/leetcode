# Brute Force Prefix/Suffix | 23 Lines | O(n²) | 935ms

# Intuition
We have two types of operations: reverse first k characters or reverse last k characters. Since we must perform exactly one operation and want the lexicographically smallest result, we should try all possible values of k for both operation types and pick the best outcome.

# Approach
**Exhaustive Search with Comparison:**
- Try all possible prefix reversals (k from 1 to n)
- Try all possible suffix reversals (k from 1 to n)
- Track the lexicographically smallest result across all candidates
- Return the minimum

**Step-by-Step Process:**

1. **Initialize:**
   - Start with `smallest = s` (original string as baseline)
   - This handles edge cases where no operation improves the string

2. **Try All Prefix Reversals:**
   - For k from 1 to n:
     - Reverse first k characters: `s[0..k-1]`
     - Keep remaining characters: `s[k..n-1]`
     - Create candidate: `reverse(s[0..k-1]) + s[k..n-1]`
     - Update smallest if candidate is better

3. **Try All Suffix Reversals:**
   - For k from 1 to n:
     - Keep first characters: `s[0..n-k-1]`
     - Reverse last k characters: `s[n-k..n-1]`
     - Create candidate: `s[0..n-k-1] + reverse(s[n-k..n-1])`
     - Update smallest if candidate is better

4. **Return Result:**
   - After trying all 2n possible operations, return the smallest string found

**Why This Works:**

**Complete Coverage:**
- We try every valid k value (1 to n) for both operation types
- This guarantees we find the optimal solution
- Total of 2n candidates checked

**Lexicographic Comparison:**
- JavaScript string comparison (`<`) naturally handles lexicographic ordering
- Compares character by character from left to right
- Earlier alphabetic characters take precedence

**Example Walkthrough (s = "dcab"):**

**Prefix Reversals:**
- k=1: reverse("d") + "cab" = "dcab"
- k=2: reverse("dc") + "ab" = "cdab"
- k=3: reverse("dca") + "b" = "acdb" ✓ (best so far)
- k=4: reverse("dcab") = "bacd"

**Suffix Reversals:**
- k=1: "dca" + reverse("b") = "dcab"
- k=2: "dc" + reverse("ab") = "dcba"
- k=3: "d" + reverse("cab") = "dbac"
- k=4: reverse("dcab") = "bacd"

**Result:** "acdb" (from prefix reversal with k=3)

**Example 2 (s = "abba"):**

**Prefix Reversals:**
- k=1: "abba"
- k=2: "baba"
- k=3: "bbaa"
- k=4: "abba"

**Suffix Reversals:**
- k=1: "abba"
- k=2: "abab"
- k=3: "aabb" ✓ (best)
- k=4: "abba"

**Result:** "aabb" (from suffix reversal with k=3)

**Optimization Opportunities (Not Implemented):**
- Could track best k value instead of regenerating strings
- Could early terminate if we find a string starting with 'a'
- Could use more efficient string building (StringBuilder pattern)
- For this problem size, brute force is acceptable

**Edge Cases:**
- Already sorted string: Original might be optimal
- All same characters: All operations yield same result
- Length 1: Reversing gives same string
- Reverse of s is better: k=n will find it

**Why Not Greedy:**
- Can't determine optimal k without checking
- Local improvements don't guarantee global optimum
- Example: "ba" → reverse all gives "ab" (optimal), but greedy might reverse just first char to "ba" (no improvement)

# Complexity
- Time complexity: $$O(n^2)$$ - 2n iterations, each creating O(n) string operations (slice, reverse, join)
- Space complexity: $$O(n)$$ - storing candidate strings

# Code
```typescript
const lexSmallest = (s: string): string => {
    const n = s.length;
    let smallest = s;
    
    for (let k = 1; k <= n; k++) {
        const candidate = s.slice(0, k).split('').reverse().join('') + s.slice(k);
        if (candidate < smallest) {
            smallest = candidate;
        }
    }
    
    for (let k = 1; k <= n; k++) {
        const candidate = s.slice(0, n - k) + s.slice(n - k).split('').reverse().join('');
        if (candidate < smallest) {
            smallest = candidate;
        }
    }
    
    return smallest;
};
```