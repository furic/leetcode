# Binary Reflection Sort | 15 Lines | O(n log n) | 17ms

# Intuition
To sort by binary reflections, we need to compute the reflection for each number, then sort based on these values. A functional pipeline approach with map-sort-map elegantly transforms the data, sorts it, and extracts the result.

# Approach
- **Three-Step Pipeline**:
  - Transform: Enrich each number with its binary reflection
  - Sort: Order by reflection value (with tiebreaker on original value)
  - Extract: Map back to just the original numbers

- **Computing Binary Reflection**:
  - Convert number to binary string: `num.toString(2)`
  - Reverse the binary digits: `split("").reverse().join("")`
  - Parse as binary back to decimal: `parseInt(reversed, 2)`
  - Leading zeros automatically ignored when parsing

- **Enrichment Phase (First Map)**:
  - Create object pairing each number with its reflection
  - Structure: `{num: original, reflection: computed}`
  - Preserves original value for tiebreaking and final extraction

- **Sorting Logic**:
  - Primary key: reflection value (ascending)
  - Secondary key: original number (ascending) for ties
  - Comparison: `a.reflection === b.reflection ? a.num - b.num : a.reflection - b.reflection`

- **Extraction Phase (Second Map)**:
  - After sorting, we only need the original numbers
  - Map each object back to just its `num` property
  - Returns final sorted array

- **Example Walkthrough** ([3,6,5,8]):
  - 3 → binary: "11" → reversed: "11" → decimal: 3
  - 6 → binary: "110" → reversed: "011" → decimal: 3
  - 5 → binary: "101" → reversed: "101" → decimal: 5
  - 8 → binary: "1000" → reversed: "0001" → decimal: 1
  - Enriched: [{num:3, reflection:3}, {num:6, reflection:3}, {num:5, reflection:5}, {num:8, reflection:1}]
  - After sort: [{num:8, reflection:1}, {num:3, reflection:3}, {num:6, reflection:3}, {num:5, reflection:5}]
  - Note: 3 and 6 both have reflection 3, so sorted by original value (3 < 6)
  - Extracted: [8, 3, 6, 5] ✓

- **Why This Pattern Works**:
  - Separates concerns: computation, sorting, extraction
  - Immutable transformations (functional style)
  - Clear, readable pipeline
  - No manual index management or mutation

# Complexity
- Time complexity: $$O(n \log n)$$
  - First map (compute reflections): O(n × d) where d = average binary length ≈ O(n log m) where m = max value
  - Sort: O(n log n) comparisons
  - Second map (extract): O(n)
  - Dominated by sorting: O(n log n)

- Space complexity: $$O(n)$$
  - Enriched array with objects: O(n)
  - Sorting may use O(log n) stack space
  - Final output array: O(n)
  - Total: O(n)

# Code
```typescript
const sortByReflection = (nums: number[]): number[] =>
    nums
        .map((num) => ({
            num,
            reflection: parseInt(
                num.toString(2).split("").reverse().join(""),
                2
            ),
        }))
        .sort((a, b) =>
            a.reflection === b.reflection
                ? a.num - b.num
                : a.reflection - b.reflection
        )
        .map((item) => item.num);
```