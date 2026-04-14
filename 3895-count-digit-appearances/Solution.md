# Reduce + Digit Extraction | 10 Lines | O(N·D) | 3ms

# Intuition
Each number needs to be broken down digit-by-digit to count occurrences of the target digit. A simple modulo-and-divide loop extracts each digit from right to left, which pairs naturally with a `reduce` accumulator over the array.

# Approach
- **Outer reduction** — `Array.reduce` accumulates a running `totalCount` across all numbers, starting at `0`. This avoids a separate sum step and keeps the logic in one expression.
- **Inner digit extraction loop** — for each number, repeatedly:
  - Take `remaining % 10` to inspect the **rightmost digit**.
  - If it equals `digit`, increment `totalCount`.
  - Integer-divide `remaining` by `10` to **shift right**, discarding the digit just checked.
  - Stop when `remaining` reaches `0` (all digits consumed).
- **Why not string conversion?** The modulo approach avoids string allocation entirely — relevant when `nums.length` is up to `1000` and values up to `1e6` (up to 7 digits each). It also handles the problem purely numerically.
- **Edge case — digit `0`**: If `nums[i]` itself is `0` that can't appear per constraints (`nums[i] >= 1`), so the loop body always executes at least once for every element. Leading zeros are never a concern since integer representation has none. The loop correctly terminates after the last non-zero digit, so a `0` digit target is still counted whenever it appears mid-number (e.g. `102` contributes one `0`).
- **Complexity per element** — the while loop runs exactly **D** times where D = number of digits = `⌊log₁₀(nums[i])⌋ + 1`. For `nums[i] ≤ 1e6`, D ≤ 7, making this effectively constant per element.

# Complexity
- Time complexity: $$O(N \cdot D)$$ — N elements each taking O(D) digit extractions; with D ≤ 7 this is essentially $$O(N)$$.

- Space complexity: $$O(1)$$ — only scalar variables are used; no auxiliary data structures.

# Code
```typescript []
const countDigitOccurrences = (nums: number[], digit: number): number =>
    nums.reduce((totalCount, num) => {
        let remaining = num;
        while (remaining) {
            if (remaining % 10 === digit) totalCount++;
            remaining = Math.floor(remaining / 10);
        }
        return totalCount;
    }, 0);
```