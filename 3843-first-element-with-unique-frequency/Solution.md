# Frequency Map + Reverse Grouping | 28 Lines | O(n) | 119ms

# Intuition

Count frequencies, then group numbers by their frequencies. A number has unique frequency if it's the only one with that count. Scan original array left-to-right to find first such element.

# Approach

**Four-Phase Algorithm:**

1. **Count Frequencies**: Build map number→count
2. **Group by Frequency**: Invert to frequency→[numbers with that count]
3. **Identify Unique**: Find frequencies where only 1 number has that count
4. **Scan Original**: Return first element with unique frequency

**Key Insight:**
- Must scan original array to maintain left-to-right order
- Set lookup is O(1) for checking unique frequency

**Example: nums=[20,20,10,30,30,30]**

Phase 1 - Count:
- {20:2, 10:1, 30:3}

Phase 2 - Group:
- {1:[10], 2:[20], 3:[30]}

Phase 3 - Unique:
- All frequencies have exactly 1 number → {10,20,30}

Phase 4 - Scan:
- First in original: 20 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Count frequencies: O(n)
  - Group by frequency: O(unique numbers) ≤ O(n)
  - Find unique: O(unique frequencies) ≤ O(n)
  - Scan original: O(n)
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Frequency map: O(unique numbers) ≤ O(n)
  - Reverse grouping: O(n)
  - Unique set: O(unique numbers) ≤ O(n)
  - Overall: O(n)

# Code
```typescript []
const firstUniqueFreq = (nums: number[]): number => {
    const numberFrequency = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        numberFrequency.set(nums[i], (numberFrequency.get(nums[i]) || 0) + 1);
    }
    
    const frequencyToNumbers = new Map<number, number[]>();
    for (const [number, frequency] of numberFrequency.entries()) {
        if (!frequencyToNumbers.has(frequency)) frequencyToNumbers.set(frequency, []);
        frequencyToNumbers.get(frequency).push(number);
    }
    
    const numbersWithUniqueFreq = new Set<number>();
    for (const [frequency, numbersWithFreq] of frequencyToNumbers.entries()) {
        if (numbersWithFreq.length === 1) numbersWithUniqueFreq.add(numbersWithFreq[0]);
    }
    
    for (let i = 0; i < nums.length; i++) {
        if (numbersWithUniqueFreq.has(nums[i])) return nums[i];
    }
    
    return -1;
};
```