# Nested Loop Square Root | 12 Lines | O(n²) | 3ms

# Intuition
A Pythagorean triple satisfies a² + b² = c². By enumerating all pairs (a, b) where a < b, we can compute c = √(a² + b²) and check if it's an integer within bounds. Each valid mathematical triple (a, b, c) represents two answer triples: (a, b, c) and (b, a, c).

# Approach
- **Pair Enumeration Strategy**:
  - Outer loop: iterate a from 1 to n-1
  - Inner loop: iterate b from a+1 to n
  - Starting b at a+1 avoids duplicate pairs (a, b) and (b, a)
  - This ensures each unique mathematical triple is found exactly once

- **Hypotenuse Calculation**:
  - For each pair (a, b), compute c = √(a² + b²)
  - Use Math.sqrt() for floating-point calculation
  - Check if result is an integer using Number.isInteger()
  - Verify c ≤ n (must be within bounds)

- **Early Termination Optimization**:
  - If c > n for current (a, b), all larger b values will also exceed n
  - Break inner loop immediately to save computation
  - This works because c increases monotonically with b when a is fixed

- **Double Counting**:
  - Problem asks for ordered triples where order of a and b matters
  - Mathematical triple (3, 4, 5) yields two answer triples: (3, 4, 5) and (4, 3, 5)
  - Count each valid triple twice: tripleCount += 2
  - Our loop structure finds each unique unordered pair once

- **Why This Avoids Duplicates**:
  - Loop constraint b > a ensures we never see (b, a) when we process (a, b)
  - Each unique set {a, b, c} is discovered exactly once
  - Multiplying by 2 accounts for both orderings

- **Example Walkthrough** (n=5):
  - a=1: No valid b produces integer c ≤ 5
  - a=2: No valid b produces integer c ≤ 5
  - a=3, b=4: c = √(9+16) = 5, integer! Count += 2
  - a=4: No valid b (would need b=3 but b > a)
  - Total: 2 triples (3,4,5) and (4,3,5) ✓

- **Example Walkthrough** (n=10):
  - a=3, b=4: c=5 ✓, count=2
  - a=6, b=8: c=10 ✓, count=4
  - Total: 4 triples ✓

- **Edge Cases Handled**:
  - n < 3: No valid triples (smallest is 3,4,5)
  - Large n: early break prevents unnecessary iterations
  - Non-Pythagorean pairs: Number.isInteger() filters them out

# Complexity
- Time complexity: $$O(n^2)$$
  - Outer loop: O(n) iterations
  - Inner loop: O(n) iterations per outer iteration in worst case
  - Early break optimization reduces average case
  - Square root and integer check: O(1)
  - Total: O(n²)

- Space complexity: $$O(1)$$
  - Only constant variables used (counters, hypotenuse)
  - No additional data structures
  - Total: O(1)

# Code
```typescript
const countTriples = (n: number): number => {
    let tripleCount = 0;

    for (let a = 1; a < n; a++) {
        for (let b = a + 1; b <= n; b++) {
            const hypotenuse = Math.sqrt(a * a + b * b);

            if (hypotenuse > n) break;

            if (Number.isInteger(hypotenuse)) {
                tripleCount += 2;
            }
        }
    }

    return tripleCount;
};
```