# Single Pass Left-to-Right | 18 Lines | O(n) | 2ms

# Intuition
Roman numerals follow a pattern where symbols are generally read left-to-right with their values added together. The key insight is handling the subtraction cases (like IV = 4, IX = 9) where a smaller symbol precedes a larger one. We can detect these cases by looking ahead to the next symbol and applying subtraction when the current symbol is smaller than the next one.

# Approach
I'll use a single-pass algorithm with lookahead for subtraction detection:

1. **Symbol Value Mapping**: Create a lookup table for each Roman symbol and its corresponding integer value.

2. **Left-to-Right Processing**: Iterate through each character in the string from left to right.

3. **Subtraction Rule Detection**: For each symbol, check if the next symbol has a higher value:
   - If yes: This is a subtraction case (like IV, IX, XL, etc.), so subtract the current value
   - If no: This is a normal additive case, so add the current value

4. **Lookahead Safety**: When checking the next symbol, ensure we don't go out of bounds by checking if position + 1 exists.

5. **Accumulate Result**: Keep a running total that increases or decreases based on whether we're in an additive or subtractive case.

This approach naturally handles all Roman numeral patterns in a single pass without needing to preprocess or identify specific subtraction pairs.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the string examining each character once
  - Constant-time lookups in the symbol value map
  - Each character processed in constant time

- Space complexity: $$O(1)$$
  - Fixed-size lookup table with 7 Roman symbols
  - Only using constant extra variables for tracking position and total
  - Space usage doesn't scale with input size

# Code
```typescript []
const romanToInt = (s: string): number => {
    const romanSymbolValues: Record<string, number> = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let totalValue = 0;

    for (let position = 0; position < s.length; position++) {
        const currentSymbolValue = romanSymbolValues[s[position]];
        const nextSymbolValue = romanSymbolValues[s[position + 1]];

        if (nextSymbolValue && currentSymbolValue < nextSymbolValue) {
            totalValue -= currentSymbolValue;
        } else {
            totalValue += currentSymbolValue;
        }
    }

    return totalValue;
};
```