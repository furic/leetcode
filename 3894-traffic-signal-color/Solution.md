# Nested Ternary Dispatch | 4 Lines | O(1) | 0ms

# Intuition
The four possible outputs map directly to non-overlapping, mutually exclusive conditions on a single integer — a pure lookup with no loops or data structures needed.

# Approach
- **Ternary chain** — each condition is tested in sequence from most specific to least specific, short-circuiting as soon as a match is found:
  1. `timer === 0` → `"Green"` (exact match)
  2. `timer === 30` → `"Orange"` (exact match)
  3. `timer > 30 && timer <= 90` → `"Red"` (range check; `timer === 30` already excluded by step 2)
  4. Fallthrough → `"Invalid"` (covers 1–29, 31 is impossible since 31 satisfies step 3, and 91–1000)
- **Ordering matters** — `timer === 30` must be checked *before* the range `> 30`, otherwise it would never be reached. Placing exact matches first keeps the logic unambiguous.
- **No branching overhead** — since every path is an `O(1)` comparison and string return, the entire function is a single expression with no side effects, making it trivially pure and inlineable.
- **`"Invalid"` as the default** — rather than adding an explicit `timer < 0 || timer > 90` check, the final ternary arm naturally catches every value not matched by the three prior conditions, which aligns exactly with the problem's fallback requirement.

# Complexity
- Time complexity: $$O(1)$$ — a fixed number of comparisons regardless of input value.

- Space complexity: $$O(1)$$ — no allocations; only string literals are returned.

# Code
```typescript []
const trafficSignal = (timer: number): string =>
    timer === 0
        ? "Green"
        : timer === 30
          ? "Orange"
          : timer > 30 && timer <= 90
            ? "Red"
            : "Invalid";
```