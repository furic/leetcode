# Rotation Reflection Pattern Check | 22 Lines | O(n) | 3ms

# Intuition
Reverse and rotate-left generate only the rotations and reflections of the array, so just 2n arrangements are reachable from the sorted array. If `nums` is neither a rotation of `[0..n-1]` nor a rotation of `[n-1..0]`, the answer is `-1`. Otherwise the answer is the cheapest way to undo that rotation, with or without a reverse.

# Approach
- **Trivial case:** if `n <= 1`, the array is already sorted, so return `0`.
- **Case A: rotated sorted array.**
  - `nums` is `[0..n-1]` rotated left by `shift`, which means `nums[i] === (nums[0] + i) % n` for every `i`, with `shift = nums[0]`.
  - If `shift === 0`, the array is already sorted, so the cost is `0`.
  - Option 1: rotate left `n - shift` more times to complete the cycle, for a cost of `n - shift`.
  - Option 2: reverse, rotate left `shift` times, then reverse again. This undoes the rotation in the opposite direction, for a cost of `shift + 2`.
  - Take the minimum of the two.
- **Case B: rotated reversed array.**
  - `nums` is `[n-1..0]` rotated, which means `nums[i] === (nums[0] - i) mod n` for every `i`. Use `((x % n) + n) % n` to keep the modulo non-negative.
  - Set `shift = n - 1 - nums[0]`.
  - One reverse is always required to flip the orientation.
  - The rotation can be done before or after the reverse, in either direction, so the rotation cost is `min(shift, n - shift)`.
  - The total cost is `min(shift, n - shift) + 1`.
- **Combine:** keep the smaller cost across both cases. For `n = 2` both patterns can match, and taking the minimum handles it.
- **Impossible:** if neither pattern matches, return `-1`.

# Complexity
- Time complexity: $$O(n)$$, since there are two linear pattern checks.

- Space complexity: $$O(1)$$, since only scalar variables are used.

# Code
```typescript []
const minOperations = (nums: number[]): number => {
    const n = nums.length;
    if (n <= 1) return 0;

    let minOps = Infinity;

    let isRotatedSorted = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== (nums[0] + i) % n) { isRotatedSorted = false; break; }
    }
    if (isRotatedSorted) {
        const shift = nums[0];
        minOps = shift === 0 ? 0 : Math.min(n - shift, shift + 2);
    }

    let isRotatedReversed = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== ((nums[0] - i) % n + n) % n) { isRotatedReversed = false; break; }
    }
    if (isRotatedReversed) {
        const shift = n - 1 - nums[0];
        minOps = Math.min(minOps, Math.min(shift, n - shift) + 1);
    }

    return minOps === Infinity ? -1 : minOps;
};
```