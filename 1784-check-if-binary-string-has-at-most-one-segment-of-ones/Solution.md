# Single Substring Check | 1 Line | O(n) | 0ms

# Intuition
A binary string has more than one contiguous segment of ones if and only if a `'1'` appears after a `'0'` somewhere — i.e., the pattern `"01"` exists. If `"01"` never appears, all ones are grouped together at the front.

# Approach
- Since `s` has no leading zeros and starts with `'1'`, the string looks like `1...10...01...1` if there are multiple one-segments.
- The transition from a zero-segment back into a one-segment is always marked by the substring `"01"`.
- So the check reduces to: does `"01"` appear anywhere in `s`? If yes, there are multiple one-segments → return `false`. If no → return `true`.
- `String.includes` scans left to right and short-circuits on first match, making this as efficient as a manual loop.

# Complexity
- Time complexity: $$O(n)$$ — `includes` performs a linear scan.

- Space complexity: $$O(1)$$ — no extra storage.

# Code
```typescript []
const checkOnesSegment = (s: string) => !s.includes('01');
```