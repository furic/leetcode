# Left-to-Right Gap Counting | 16 Lines | O(n) | 7ms

# Intuition
The key insight is that we're counting how many times each '1' needs to "jump over" gaps of '0's. Each '1' will move past all gaps to its right, and consecutive '0's form a single gap that requires one operation to cross.

# Approach
- **Core Strategy**: Traverse the string left-to-right, counting '1's and tracking operations needed
- **Gap Recognition**: When we encounter '0's, we treat consecutive '0's as a single gap
  - Example: "000" is one gap, not three separate gaps
  - A '1' crosses this entire gap in a single operation
- **Operation Counting**: For each gap encountered:
  - All '1's we've seen so far (to the left) will eventually need to cross this gap
  - Add the current count of '1's to total operations
  - This represents each '1' performing one operation to cross this gap
- **Why This Works**: 
  - We count from the perspective of gaps rather than individual '1's
  - Each gap contributes `onesCount` operations (one per '1' that must cross it)
  - Moving left-to-right ensures we count each '1' crossing each gap exactly once
- **Handling Consecutive Zeros**:
  - Use nested while loop to skip through consecutive '0's
  - Only add operations once per gap (not once per '0')
  - This prevents overcounting operations
- **Edge Cases**:
  - Trailing '1's: Don't contribute operations (no gaps to their right)
  - Leading '0's: No '1's to move yet, so contribute 0 operations
  - String with no '0's: Returns 0 (no operations possible)

# Complexity
- Time complexity: $$O(n)$$
  - Each character visited at most once despite nested while loop
  - Inner loop only advances index forward, never revisits

- Space complexity: $$O(1)$$
  - Only three integer variables used regardless of input size

# Code
```typescript
const maxOperations = (s: string): number => {
    let onesCount = 0;
    let totalOperations = 0;
    let index = 0;
    
    while (index < s.length) {
        if (s[index] === '0') {
            while (index + 1 < s.length && s[index + 1] === '0') {
                index++;
            }
            totalOperations += onesCount;
        } else {
            onesCount++;
        }
        index++;
    }
    
    return totalOperations;
};
```