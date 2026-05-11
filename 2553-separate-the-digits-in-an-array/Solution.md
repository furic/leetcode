# Digit Flatten One-Liner | 1 Line | O(d) | 2ms

# Intuition
Convert each number to its digit string, split into characters, map to numbers, then flatten all digits in order.

# Approach
- `flatMap` over `nums`: for each `n`, convert to string, split into chars, map each char back to `Number`.
- `flatMap` both maps and flattens in one step, preserving the original order.

# Complexity
- Time complexity: $$O(d)$$ where $$d$$ is the total number of digits across all numbers.

- Space complexity: $$O(d)$$ — for the output array.

# Code
```typescript []
const separateDigits = (nums: number[]): number[] =>
    nums.flatMap(n => n.toString().split('').map(Number));
```