# Parity Chain Count | 21 Lines | O(n) | 3ms

# Intuition

Since the condition requires:
$$(sub[0] + sub[1]) \% 2 = (sub[1] + sub[2]) \% 2 = \ldots$$

this means **the *sum* parity of adjacent pairs is fixed**.

There are two possibilities:
- All adjacent sums are **even** ⇒ adjacent elements have the same parity.
- All adjacent sums are **odd** ⇒ adjacent elements have alternating parity.

Thus, we only need to compute:
✅ The longest **same parity subsequence** (all even or all odd).  
✅ The longest **alternating parity subsequence**.

Take the maximum among these.

---

# Approach

- Count:
  - Total **odd** numbers.
  - Total **even** numbers.
- For **alternating parity**:
  - The maximum possible length is:
    - `2 * min(oddCount, evenCount) + (1 if there is an extra of that parity)`  
      so it can be `2 * min(odd, even) + 1` if allowed.

- Return the **maximum** of:
  - `oddCount`, `evenCount` (all same parity).
  - Longest valid alternating parity length.

---

# Complexity

- Time complexity:  
  $$O(n)$$  
  One pass to count, one formula to compute.

- Space complexity:  
  $$O(1)$$  
  Constant counters only.

---

# Code

```typescript
const maximumLength = (nums: number[]): number => {
    let odd = 0, even = 0;
    for (const num of nums) {
        if (num % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }
    const alternating = odd === even ? odd + even : 2 * Math.min(odd, even) + 1;
    return Math.max(odd, even, alternating);
};
```