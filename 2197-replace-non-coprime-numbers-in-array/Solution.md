# Stack-Based Merging Algorithm | 24 Lines | O(n) | 43ms

# Intuition
This problem requires repeatedly merging adjacent non-coprime numbers until no more merges are possible. The key insight is that when we merge two numbers into their LCM, the result might become non-coprime with previously processed numbers. This suggests using a stack-based approach where we can "look back" and continue merging with earlier elements when necessary.

# Approach
I'll use a stack-based algorithm with cascading merges:

1. **Stack for Result Building**: Use a stack to build the final array. The stack allows us to merge backwards when a new merged value becomes non-coprime with previous elements.

2. **GCD Calculation**: Implement the Euclidean algorithm to efficiently compute GCD(a,b). Two numbers are non-coprime when GCD > 1.

3. **Cascading Merge Process**: For each number:
   - Try to merge it with the stack top if they're non-coprime
   - If they merge, the resulting LCM might be non-coprime with the element below it
   - Continue this cascading merge until we find a coprime pair or empty the stack
   - Push the final merged value onto the stack

4. **LCM Calculation**: Use the formula LCM(a,b) = (a×b)/GCD(a,b). To avoid overflow, rewrite as (a/GCD)×b.

5. **Order Independence**: The problem states that any merge order produces the same result, so our left-to-right approach with stack-based backtracking will find the unique solution.

# Complexity
- Time complexity: $$O(n \log V)$$
  - Each element is processed once, but may trigger cascading merges
  - Each GCD calculation takes O(log V) where V is the maximum value
  - In worst case, each element could merge with all previous elements, but amortized analysis shows O(n log V)

- Space complexity: $$O(n)$$
  - Stack stores at most n elements in the worst case (when no merges occur)
  - GCD algorithm uses O(log V) space for recursion, but we use iterative version for O(1)
  - Overall space is dominated by the result stack: O(n)

# Code
```typescript []
const replaceNonCoprimes = (nums: number[]): number[] => {
    const resultStack: number[] = [];
    
    const calculateGCD = (firstNumber: number, secondNumber: number): number => {
        while (secondNumber !== 0) {
            [firstNumber, secondNumber] = [secondNumber, firstNumber % secondNumber];
        }
        return firstNumber;
    };
    
    for (let currentNumber of nums) {
        while (resultStack.length > 0) {
            const stackTop = resultStack[resultStack.length - 1];
            const greatestCommonDivisor = calculateGCD(stackTop, currentNumber);
            
            if (greatestCommonDivisor === 1) {
                break;
            }
            
            resultStack.pop();
            currentNumber = (stackTop / greatestCommonDivisor) * currentNumber;
        }
        
        resultStack.push(currentNumber);
    }
    
    return resultStack;
};
```