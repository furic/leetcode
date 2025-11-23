# Direct Range Iteration | 27 Lines | O(n×d) | 88ms

# Intuition
The problem requires calculating waviness for each number in a range by identifying peaks and valleys in their digit sequences. The straightforward approach is to iterate through each number, examine its digits, and count peaks and valleys.

# Approach
- **Overall Strategy - Brute Force Iteration**:
  - Iterate through every number from num1 to num2 (inclusive)
  - For each number, convert to digit array and calculate its waviness
  - Sum all waviness values to get the total

- **Number to Digits Conversion**:
  - Convert number to string, split into characters
  - Map each character to integer digit
  - Results in array of digits: [d₀, d₁, d₂, ..., dₙ]

- **Waviness Calculation for Single Number**:
  - Skip numbers with fewer than 3 digits (waviness = 0 by definition)
  - Initialize waviness counter for current number
  - Iterate through middle digits only (indices 1 to length-2)
  - First and last digits cannot be peaks/valleys

- **Peak Detection**:
  - A digit at index i is a peak if:
  - digits[i] > digits[i-1] (strictly greater than left neighbor)
  - AND digits[i] > digits[i+1] (strictly greater than right neighbor)
  - Example: In "121", middle digit 2 > 1 and 2 > 1, so it's a peak

- **Valley Detection**:
  - A digit at index i is a valley if:
  - digits[i] < digits[i-1] (strictly less than left neighbor)
  - AND digits[i] < digits[i+1] (strictly less than right neighbor)
  - Example: In "202", middle digit 0 < 2 and 0 < 2, so it's a valley

- **Accumulation**:
  - For each peak or valley found, increment the number's waviness
  - Add the number's total waviness to the running total
  - Continue to next number in range

- **Edge Cases Handled**:
  - Numbers < 100 (fewer than 3 digits): automatically skipped, contribute 0
  - Single-digit middle sections: correctly evaluated with strict inequalities
  - Numbers with multiple peaks/valleys: all counted (e.g., 4848 has 2)
  - Equal consecutive digits: not peaks or valleys (strict inequality requirement)

- **Example Walkthrough** (120-130):
  - 120: digits=[1,2,0], check index 1: 2>1 and 2>0 → peak, waviness=1
  - 121: digits=[1,2,1], check index 1: 2>1 and 2>1 → peak, waviness=1
  - 122: digits=[1,2,2], check index 1: 2>1 but not 2>2 → not peak, waviness=0
  - ...
  - 130: digits=[1,3,0], check index 1: 3>1 and 3>0 → peak, waviness=1
  - Total: 1+1+1 = 3

# Complexity
- Time complexity: $$O((num2-num1) \times d)$$ where d is the average number of digits
  - Iterate through (num2 - num1 + 1) numbers: O(n) where n = range size
  - For each number:
    - Convert to string and split: O(d) where d = number of digits
    - Check each middle digit: O(d)
  - Total: O(n × d)
  - For typical inputs, d = O(log num2)

- Space complexity: $$O(d)$$
  - Digits array for current number: O(d)
  - All other variables: O(1)
  - No accumulation of data across iterations

# Code
```typescript
function totalWaviness(num1: number, num2: number): number {
    let total = 0;
    
    for (let num = num1; num <= num2; num++) {
        const digits = num.toString().split('').map(Number);
        
        if (digits.length < 3) continue;
        
        let waviness = 0;
        
        for (let i = 1; i < digits.length - 1; i++) {
            const curr = digits[i];
            const prev = digits[i - 1];
            const next = digits[i + 1];
            
            if (curr > prev && curr > next) {
                waviness++;
            } else if (curr < prev && curr < next) {
                waviness++;
            }
        }
        
        total += waviness;
    }
    
    return total;
}
```