# Sliding Window with BIT | 40 Lines | O(n log n) |

# Intuition
Instead of recalculating inversions from scratch for each window, we can use a sliding window approach with a Binary Indexed Tree (BIT/Fenwick Tree) to efficiently update the inversion count as we add and remove elements.

# Approach
- **Coordinate Compression**:
  - Map unique values to range [1, size] for BIT indexing
  - Preserves relative ordering while keeping indices small
  - Required since values can be large but we need array indices

- **Binary Indexed Tree (Fenwick Tree)**:
  - Supports O(log n) updates and range queries
  - Used to count how many elements with certain values exist in current window
  - query(i) returns count of elements with compressed value ≤ i

- **Initial Window Inversions**:
  - Process first k elements left to right
  - For each element, count larger elements already seen
  - Use: inversions with nums[i] = (total elements so far) - (elements ≤ nums[i])
  - Formula: query(size) - query(c) where c is compressed value

- **Sliding Window Updates**:
  - Move window right by removing leftmost element and adding rightmost
  - When removing element at index i:
    - Remove from BIT first: update(c, -1)
    - It had inversions with smaller elements to its right
    - Lost inversions = query(c-1) (count of smaller elements in window)
    - Subtract from total
  - When adding element at index i+k:
    - Count inversions with larger elements already in window
    - Gained inversions = query(size) - query(c)
    - Add to total
    - Add to BIT: update(c, 1)

- **Why This Order Matters**:
  - Remove from BIT before counting lost inversions
  - This ensures we count inversions with elements still in window
  - Add to BIT after counting gained inversions
  - This ensures we don't count self-inversions

- **Example Walkthrough** ([3,1,2,5,4], k=3):
  - Compressed: {1:1, 2:2, 3:3, 4:4, 5:5}
  - Window [3,1,2]:
    - Add 3: inversions = 0
    - Add 1: inversions = 1 (1 < 3)
    - Add 2: inversions = 2 (2 < 3)
  - Slide to [1,2,5]:
    - Remove 3: lost = 2 (both 1,2 are smaller), inversions = 0
    - Add 5: gained = 0 (no larger elements), inversions = 0
  - Slide to [2,5,4]:
    - Remove 1: lost = 0, inversions = 0
    - Add 4: gained = 1 (4 < 5), inversions = 1
  - Minimum = 0 ✓

# Complexity
- Time complexity: $$O(n \log n)$$
  - Coordinate compression (sort + deduplicate): O(n log n)
  - Initial window inversion count: O(k log n)
  - Sliding window: O(n-k) iterations × O(log n) per BIT operation = O(n log n)
  - Total: O(n log n)

- Space complexity: $$O(n)$$
  - Compressed value map: O(n)
  - Binary Indexed Tree: O(n)
  - Sorted unique values: O(n)
  - Total: O(n)

# Code
```typescript
const minInversionCount = (nums: number[], k: number): number => {
    const n = nums.length;
    if (k === 1) return 0;
    
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sorted.forEach((v, i) => compress.set(v, i + 1));
    
    const size = sorted.length;
    const tree = new Array(size + 1).fill(0);
    
    const update = (i: number, delta: number) => {
        for (; i <= size; i += i & (-i)) tree[i] += delta;
    };
    
    const query = (i: number): number => {
        let sum = 0;
        for (; i > 0; i -= i & (-i)) sum += tree[i];
        return sum;
    };
    
    let inversions = 0;
    for (let i = 0; i < k; i++) {
        const c = compress.get(nums[i])!;
        inversions += query(size) - query(c);
        update(c, 1);
    }
    
    let minInversions = inversions;
    
    for (let i = 0; i + k < n; i++) {
        const removeVal = nums[i];
        const addVal = nums[i + k];
        const removeC = compress.get(removeVal)!;
        const addC = compress.get(addVal)!;
        
        update(removeC, -1);
        const inversionsLost = query(removeC - 1);
        inversions -= inversionsLost;
        
        const inversionsGained = query(size) - query(addC);
        inversions += inversionsGained;
        
        update(addC, 1);
        
        minInversions = Math.min(minInversions, inversions);
    }
    
    return minInversions;
};
```