# Euclidean Algorithm Optimization | 20 Lines | O(log(min(a,b))) | 0ms

# Intuition
This is essentially the Euclidean algorithm for finding GCD, but instead of just finding the GCD, we count the number of steps. The naive approach of subtracting one at a time is O(max(a,b)), but we can optimize by using division/modulo to skip multiple subtractions at once, reducing to O(log(min(a,b))).

# Approach
**Optimized Euclidean Algorithm with Step Counting:**
- Instead of single subtractions, calculate how many subtractions would occur (division)
- Use modulo to get the remainder after all those subtractions
- Count the division quotient as the number of operations
- Continue until one number becomes zero

**Step-by-Step Process:**

1. **Initialize:**
   - `operationCount = 0` - tracks total operations
   - `largerNumber = num1`, `smallerNumber = num2` - working variables

2. **Main Loop:**
   - While both numbers > 0:
   
   **Ensure larger >= smaller:**
   - If `largerNumber < smallerNumber`, swap them
   - This maintains the invariant for consistent processing

3. **Batch Subtraction:**
   - Calculate `subtractionsNeeded = ⌊larger / smaller⌋`
   - This is how many times we'd subtract smaller from larger
   - Add to operation count: `operationCount += subtractionsNeeded`

4. **Update Larger Number:**
   - `largerNumber = larger % smaller`
   - This is the remainder after all subtractions
   - Equivalent to doing those subtractions but in O(1)

5. **Continue Until Zero:**
   - Loop terminates when one number becomes 0
   - Return total operation count

**Why This Works:**

**Subtraction Sequence:**
- Original: larger - smaller - smaller - ... (k times)
- Optimized: larger % smaller (one operation, k counted)
- Example: 10 - 3 - 3 - 3 = 1 ≡ 10 % 3 = 1 (3 operations)

**Euclidean Algorithm:**
- gcd(a, b) = gcd(b, a % b)
- Process continues until one becomes 0
- Our count = number of steps in this process

**Complexity Reduction:**
- Naive: O(max(a, b)) - could subtract 1 from large number many times
- Optimized: O(log(min(a, b))) - each step reduces by at least half

**Example Walkthrough (num1 = 2, num2 = 3):**

**Iteration 1:**
- larger = 2, smaller = 3
- 2 < 3, so swap: larger = 3, smaller = 2
- subtractionsNeeded = ⌊3/2⌋ = 1
- count = 0 + 1 = 1
- larger = 3 % 2 = 1

**Iteration 2:**
- larger = 1, smaller = 2
- 1 < 2, so swap: larger = 2, smaller = 1
- subtractionsNeeded = ⌊2/1⌋ = 2
- count = 1 + 2 = 3
- larger = 2 % 1 = 0

**Termination:**
- larger = 0, loop exits
- Result: 3 ✓

**Verification step by step:**
```
Start: num1=2, num2=3
Op 1: 3 - 2 = 1 → (2, 1)
Op 2: 2 - 1 = 1 → (1, 1)
Op 3: 1 - 1 = 0 → (0, 1)
Total: 3 operations ✓
```

**Example 2 (num1 = 10, num2 = 10):**

**Iteration 1:**
- larger = 10, smaller = 10
- 10 >= 10, no swap needed
- subtractionsNeeded = ⌊10/10⌋ = 1
- count = 0 + 1 = 1
- larger = 10 % 10 = 0

**Termination:**
- larger = 0, exit
- Result: 1 ✓

**Key Insights:**

**Why Division/Modulo:**
- Division gives count of repeated subtractions
- Modulo gives final remainder
- Together: simulate many operations in O(1)

**Relationship to GCD:**
- Final non-zero value would be gcd(num1, num2)
- Our count = steps to reach that GCD
- GCD algorithms count steps similarly

**Logarithmic Complexity:**
- Each iteration reduces larger by at least half
- Fibonacci numbers give worst case
- Example: gcd(fib(n), fib(n-1)) takes n-1 steps
- Still O(log n) for input size

**Edge Cases:**

**Equal numbers:**
- num1 = num2 = k
- Single operation: k - k = 0
- Result: 1 ✓

**One is zero:**
- num1 = 0, num2 = 5
- Already at termination
- Result: 0

**One is 1:**
- num1 = 100, num2 = 1
- Single iteration: ⌊100/1⌋ = 100 operations
- Result: 100

**Coprime numbers:**
- gcd(num1, num2) = 1
- More iterations needed
- Example: gcd(13, 8) = 1 → several steps

**Powers of 2:**
- num1 = 16, num2 = 2
- Iteration 1: ⌊16/2⌋ = 8, remainder = 0
- Result: 8

**Alternative Approaches:**

**Naive simulation:**
```typescript
while (num1 > 0 && num2 > 0) {
    if (num1 >= num2) num1 -= num2;
    else num2 -= num1;
    count++;
}
```
- O(max(a,b)) time
- Simple but slow for large inputs

**Recursive GCD:**
```typescript
function countOps(a, b) {
    if (b === 0) return 0;
    return Math.floor(a/b) + countOps(b, a%b);
}
```
- Same complexity
- Functional style
- Our iterative version avoids stack overhead

**Mathematical formula:**
- For specific patterns, closed-form exists
- General case still needs iteration
- Our approach handles all cases

# Complexity
- Time complexity: $$O(\log(\min(a,b)))$$ - Euclidean algorithm complexity, each step reduces by at least half
- Space complexity: $$O(1)$$ - only using a few variables

# Code
```typescript
const countOperations = (num1: number, num2: number): number => {
    let operationCount = 0;
    let largerNumber = num1;
    let smallerNumber = num2;

    while (largerNumber > 0 && smallerNumber > 0) {
        if (largerNumber >= smallerNumber) {
            const subtractionsNeeded = Math.floor(largerNumber / smallerNumber);
            operationCount += subtractionsNeeded;
            largerNumber = largerNumber % smallerNumber;
        } else {
            [largerNumber, smallerNumber] = [smallerNumber, largerNumber];
        }
    }

    return operationCount;
};
```