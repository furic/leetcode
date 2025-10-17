# Prefix/Suffix State DP | 107 Lines | O(n) | 24ms

# Intuition
We can change at most one character, then partition greedily by taking longest prefixes with ≤k distinct characters. To find the optimal change position, we need to understand how changing each position affects the total partitions. This requires knowing the partition structure both before and after each position.

# Approach
**Bidirectional State Precomputation:**
- Precompute partition information from left (prefix) and right (suffix) for every position
- For each possible change position, calculate how it affects total partitions
- The key insight is that changing a character can either merge or split partitions

**Step-by-Step Process:**

1. **Build Left State (Prefix Analysis):**
   - For each position i, compute state [partitionCount, characterMask, distinctCount] for s[0...i-1]
   - Track current partition's characters using a bitmask
   - When adding a new character exceeds k distinct chars, start a new partition
   - Store cumulative state before each position

2. **Build Right State (Suffix Analysis):**
   - Similar to left state but process from right to left for s[i+1...n-1]
   - This gives us partition structure after each position
   - Process backwards to maintain correct prefix semantics

3. **State Components:**
   - `partitionCount`: Number of complete partitions up to/from this point
   - `characterMask`: Bitmask of characters in current incomplete partition
   - `distinctCount`: Number of distinct characters in current partition

4. **Evaluate Each Change Position:**
   - Base calculation: `totalPartitions = leftPartitions + rightPartitions + 2`
     - "+2" accounts for: 1 partition containing the changed character + 1 for boundary adjustments
   - Combine left and right character masks to see overlap

5. **Change Impact Analysis:**

   **Case 1: Both adjacent partitions are full (k distinct chars)**
   - If we change to a new character (not in combined mask), it forces a separate partition
   - This adds +1 partition: `totalPartitions++`
   - Example: "aaabbb" k=1 → changing middle creates "aaa|X|bbb" (3 partitions instead of 2)

   **Case 2: Can merge partitions**
   - If combined distinct count + 1 (for changed char) ≤ k, partitions can merge
   - This saves 1 partition: `totalPartitions--`
   - Example: "ab" k=2 → changing 'b' to 'a' gives "aa" (1 partition instead of 2)

6. **Optimization Check:**
   - Track maximum partitions across all possible change positions
   - Also consider not changing anything (base partition count)

**Why Bidirectional Preprocessing:**
- Changing position i affects partitions both before and after
- Left state captures all prefix decisions independent of the change
- Right state captures all suffix decisions independent of the change
- Combining them gives complete picture for any change position

**Bitmask Usage:**
- Each of 26 lowercase letters maps to one bit (a=bit 0, b=bit 1, ...)
- Bitmask allows O(1) character set operations
- `countSetBits(mask)` gives distinct character count

**Edge Cases:**
- If k ≥ 26 or k ≥ distinct chars in s, answer is 1 (entire string is one partition)
- Changing to same character as current has no effect
- Must consider not changing at all as a valid option

# Complexity
- Time complexity: $$O(n)$$ where n is string length - two O(n) passes for state building, one O(n) pass for evaluation
- Space complexity: $$O(n)$$ for left and right state arrays

# Code
```typescript
const maxPartitionsAfterOperations = (s: string, k: number): number => {
    const stringLength = s.length;
    
    const leftState: number[][] = Array(stringLength)
        .fill(0)
        .map(() => Array(3).fill(0));
    
    const rightState: number[][] = Array(stringLength)
        .fill(0)
        .map(() => Array(3).fill(0));

    let partitionCount = 0;
    let characterMask = 0;
    let distinctCharCount = 0;
    
    for (let index = 0; index < stringLength - 1; index++) {
        const charBit = 1 << (s.charCodeAt(index) - 97);
        
        if (!(characterMask & charBit)) {
            distinctCharCount++;
            
            if (distinctCharCount <= k) {
                characterMask |= charBit;
            } else {
                partitionCount++;
                characterMask = charBit;
                distinctCharCount = 1;
            }
        }
        
        leftState[index + 1][0] = partitionCount;
        leftState[index + 1][1] = characterMask;
        leftState[index + 1][2] = distinctCharCount;
    }

    partitionCount = 0;
    characterMask = 0;
    distinctCharCount = 0;
    
    for (let index = stringLength - 1; index > 0; index--) {
        const charBit = 1 << (s.charCodeAt(index) - 97);
        
        if (!(characterMask & charBit)) {
            distinctCharCount++;
            
            if (distinctCharCount <= k) {
                characterMask |= charBit;
            } else {
                partitionCount++;
                characterMask = charBit;
                distinctCharCount = 1;
            }
        }
        
        rightState[index - 1][0] = partitionCount;
        rightState[index - 1][1] = characterMask;
        rightState[index - 1][2] = distinctCharCount;
    }

    let maxPartitions = 0;
    
    for (let changeIndex = 0; changeIndex < stringLength; changeIndex++) {
        let totalPartitions = leftState[changeIndex][0] + rightState[changeIndex][0] + 2;
        
        const combinedMask = leftState[changeIndex][1] | rightState[changeIndex][1];
        let combinedDistinctCount = countSetBits(combinedMask);
        
        const leftPartitionFull = leftState[changeIndex][2] === k;
        const rightPartitionFull = rightState[changeIndex][2] === k;
        const canAddNewChar = combinedDistinctCount < 26;
        
        if (leftPartitionFull && rightPartitionFull && canAddNewChar) {
            totalPartitions++;
        } else if (Math.min(combinedDistinctCount + 1, 26) <= k) {
            totalPartitions--;
        }
        
        maxPartitions = Math.max(maxPartitions, totalPartitions);
    }
    
    return maxPartitions;
};

const countSetBits = (num: number): number => {
    let count = 0;
    while (num) {
        num = num & (num - 1);
        count++;
    }
    return count;
};
```