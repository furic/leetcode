# Single Pass Accumulation | 2 Lines | O(n) | 0ms

# Intuition
Since we only care about the final value and not intermediate states, we can treat this as a simple counting problem. Increment operations add 1, decrement operations subtract 1, regardless of whether the operator is prefix or postfix.

# Approach
**Accumulation with Pattern Matching:**
- Use reduce to accumulate the net effect of all operations
- Check if each operation is an increment (contains '++') or decrement (contains '--')
- Add or subtract 1 accordingly

**Step-by-Step Process:**

1. **Simplify the Problem:**
   - In traditional programming, `++X` vs `X++` differ in when the value is returned
   - But here we only care about the final value after all operations
   - Both `++X` and `X++` have the same effect: increment X by 1
   - Both `--X` and `X--` have the same effect: decrement X by 1

2. **Pattern Recognition:**
   - Increment operations: 'X++' or '++X'
   - Decrement operations: 'X--' or '--X'
   - Can identify by checking the operation string

3. **Reduce Accumulation:**
   - Start with initial value 0
   - For each operation:
     - If increment: add 1
     - If decrement: subtract 1
   - Return final accumulated value

**Alternative Approaches (all O(n)):**
- Count '+' minus '-' characters: `operations.join('').split('').filter(c => c === '+').length - operations.join('').split('').filter(c => c === '-').length`
- Simply check for '++': `operations.reduce((x, op) => x + (op.includes('++') ? 1 : -1), 0)`
- Count operations: `operations.filter(op => op.includes('++')).length - operations.filter(op => op.includes('--')).length`

**Why This Works:**
- The problem states X starts at 0
- Each operation independently affects X
- Order doesn't matter for final sum (addition/subtraction is commutative)
- No side effects between operations

# Complexity
- Time complexity: $$O(n)$$ where n is the number of operations
- Space complexity: $$O(1)$$ - only accumulator variable

# Code
```typescript
const finalValueAfterOperations = (operations: string[]): number =>
    operations.reduce((x, op) => x += (op === 'X++' || op === '++X') ? 1 : -1, 0);
```