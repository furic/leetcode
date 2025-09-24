# Long Division with Cycle Detection | 26 Lines | O(n) | 1ms

# Intuition
Converting a fraction to decimal requires simulating long division. The key insight is that if we encounter the same remainder twice during division, we've found a repeating cycle. We need to track where each remainder first appeared to determine where to place the parentheses around the repeating part.

# Approach
I'll simulate long division with remainder tracking:

1. **Handle Special Cases**: Check for zero numerator and determine the sign of the result.

2. **Integer Part**: Calculate the integer part using floor division and handle the remainder.

3. **Decimal Part with Cycle Detection**: 
   - Use a hash map to track when each remainder first appears
   - For each step of long division:
     - If remainder is 0, division terminates (non-repeating)
     - If remainder was seen before, we found a cycle
     - Otherwise, continue division and record the remainder's position

4. **Cycle Formatting**: When a cycle is detected:
   - Split the decimal part at the cycle start position  
   - Wrap the repeating part in parentheses
   - Concatenate non-repeating part + "(" + repeating part + ")"

5. **Long Division Process**: Multiply remainder by 10, divide by denominator, record the digit, and update remainder.

# Complexity
- Time complexity: $$O(d)$$
  - d is the length of the decimal representation
  - Each remainder is processed once until cycle detection or termination
  - Hash map operations are O(1) on average

- Space complexity: $$O(d)$$
  - Hash map stores at most d remainder positions
  - Result array stores d decimal digits
  - Space proportional to the length of decimal representation

# Code
```typescript []
const fractionToDecimal = (numerator: number, denominator: number): string => {
    if (numerator === 0) return "0";
    
    const resultSign = (numerator < 0) !== (denominator < 0) ? "-" : "";
    const absoluteNumerator = Math.abs(numerator);
    const absoluteDenominator = Math.abs(denominator);
    
    const decimalParts: string[] = [resultSign + Math.floor(absoluteNumerator / absoluteDenominator).toString()];
    let remainder = absoluteNumerator % absoluteDenominator;
    
    if (remainder === 0) return decimalParts.join("");
    
    decimalParts.push(".");
    const remainderPositions = new Map<number, number>();
    
    while (remainder !== 0) {
        if (remainderPositions.has(remainder)) {
            const cycleStartPosition = remainderPositions.get(remainder)!;
            return decimalParts.slice(0, cycleStartPosition).join("") + 
                   "(" + decimalParts.slice(cycleStartPosition).join("") + ")";
        }
        
        remainderPositions.set(remainder, decimalParts.length);
        remainder *= 10;
        decimalParts.push(Math.floor(remainder / absoluteDenominator).toString());
        remainder %= absoluteDenominator;
    }
    
    return decimalParts.join("");
};
```