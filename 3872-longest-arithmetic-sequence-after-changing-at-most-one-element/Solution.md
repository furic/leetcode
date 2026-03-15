# Greedy Run Extension + Reverse Pass | 28 Lines | O(n) | 25ms

# Intuition
An arithmetic subarray with at most one replacement either has the replaced element somewhere in the middle/end of the run, or at its left edge. A left-to-right scan handles the first case naturally; reversing the array and scanning again turns every left-edge replacement into a right-edge one — covering both cases symmetrically.

# Approach
- **`scan()` — greedy left-to-right pass:**
  - For each `start`, determine `diff = nums[start] - nums[start - 1]` and extend the run rightward as far as the same difference holds (`runEnd`).
  - Record the natural run length: `runEnd - (start - 1)`.
  - **Try one replacement at `runEnd`:** Temporarily overwrite `nums[runEnd]` with `nums[runEnd - 1] + diff` (the value that would continue the arithmetic run), then extend further.
  - Record the extended length after replacement. Restore `nums[runEnd]` before moving on.
  - Advance `start = runEnd` (unmodified) to continue from the next unprocessed segment.
- **Two-direction coverage:**
  - Forward `scan()` catches replacements at the run's right side or interior.
  - Reverse the array, run `scan()` again, then reverse back. This catches replacements at the run's left edge, which appear as right-edge cases in the reversed view.
- `maxLength` is initialised to `3` — the minimum non-trivial answer (any 3 elements can always form an arithmetic sequence with one replacement if needed).
- In-place mutation and restoration keeps space O(1) and avoids copying.

# Complexity
- Time complexity: $$O(n)$$ — each element is processed at most a constant number of times across both scan passes.

- Space complexity: $$O(1)$$ — only scalar variables; the reversal and restoration are in-place.

# Code
```typescript []
const longestArithmetic = (nums: number[]): number => {
    const n = nums.length;
    let maxLength = 3;

    const scan = () => {
        for (let start = 1; start < n; ) {
            const diff = nums[start] - nums[start - 1];

            let runEnd = start + 1;
            while (runEnd < n && nums[runEnd] - nums[runEnd - 1] === diff) runEnd++;

            maxLength = Math.max(maxLength, runEnd - (start - 1));

            if (runEnd < n) {
                const savedValue = nums[runEnd];
                nums[runEnd] = nums[runEnd - 1] + diff;

                const replacedIdx = runEnd;
                runEnd++;
                while (runEnd < n && nums[runEnd] - nums[runEnd - 1] === diff) runEnd++;

                maxLength = Math.max(maxLength, runEnd - (start - 1));
                nums[replacedIdx] = savedValue;
                runEnd = replacedIdx;
            }

            start = runEnd;
        }
    };

    scan();
    nums.reverse();
    scan();
    nums.reverse();

    return maxLength;
};
```