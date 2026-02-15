# Set Toggle with Sort | 8 Lines | O(n log n) | 2ms

# Intuition

Use a Set to track toggle state. Adding a bulb turns it on, removing turns it off. Bulbs appearing odd times remain on (in set), even times remain off (removed). Convert to sorted array.

# Approach

**Set-Based Toggle:**
1. Process each bulb sequentially
2. If bulb in set: remove (toggle off)
3. If bulb not in set: add (toggle on)
4. Convert final set to sorted array

**Why Set Works:**
- Set maintains "currently on" bulbs
- Duplicate operations cancel (second toggle removes)
- Final set = bulbs toggled odd number of times

**Example: bulbs=[10,30,20,10]**

Process:
- 10: add → {10}
- 30: add → {10,30}
- 20: add → {10,20,30}
- 10: remove → {20,30}

Sort: [20,30] ✓

# Complexity

- Time complexity: $$O(n \log n)$$
  - Process n bulbs: O(n)
  - Set operations: O(1) average per bulb
  - Sort final set: O(k log k) where k ≤ n
  - Overall: O(n log n)

- Space complexity: $$O(n)$$
  - Set: O(k) where k ≤ min(n, 100) unique bulbs
  - Result array: O(k)
  - Overall: O(n) worst case

# Code
```typescript []
const toggleLightBulbs = (bulbs: number[]): number[] =>
    Array.from(
        bulbs.reduce(
            (set, bulb) =>
                set.has(bulb) ? (set.delete(bulb), set) : set.add(bulb),
            new Set<number>()
        )
    ).sort((a, b) => a - b);
```