# Cantor's Diagonal Construction | 1 Line | O(n) | 0ms

# Intuition
This is a direct application of Cantor's diagonal argument: construct a string that differs from every string in `nums` at exactly one guaranteed position — the diagonal. The result cannot match any string in the list by construction.

# Approach
- For each index `i`, look at `nums[i][i]` — the diagonal character of the `i`-th string.
- Flip it: `'0'` → `'1'`, `'1'` → `'0'`.
- Join all `n` flipped characters into the result string.
- **Why it works:** The resulting string differs from `nums[0]` at position `0`, from `nums[1]` at position `1`, and so on. No matter which string in `nums` you compare against, there is always at least one index where they disagree — the diagonal position `i`. Therefore the result is guaranteed to be absent from `nums`.
- This works because `nums` has exactly `n` strings of length `n`, so the diagonal covers every string in the array.

# Complexity
- Time complexity: $$O(n)$$ — one character read and flip per string.

- Space complexity: $$O(n)$$ — for the output string.

# Code
```typescript []
const findDifferentBinaryString = (nums: string[]): string =>
    nums.map((str, i) => str[i] === '0' ? '1' : '0').join('');
```