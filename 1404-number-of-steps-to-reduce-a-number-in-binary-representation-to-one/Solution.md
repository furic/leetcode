# LSB Carry Simulation | 12 Lines | O(n) | 0ms

# Intuition
Instead of simulating arithmetic on the actual number, we can process bits directly from the least significant bit (LSB) to the second-most significant bit. Dividing by 2 is just shifting right (consuming one bit), and adding 1 propagates a carry leftward through consecutive `1` bits — exactly like binary addition.

# Approach
- Iterate from the LSB (`i = s.length - 1`) up to (but not including) the leading `1` at index `0`.
- Track a `carry` (initially `0`) to simulate the effect of a previous "add 1" operation rippling left.
- At each bit, compute `effectiveBit = s[i] + carry`:
  - **`effectiveBit === 1` (odd):** The number is odd, so we add `1` (generates a carry into the next bit) then divide by `2`. This costs **2 steps** and sets `carry = 1`.
  - **`effectiveBit === 0 or 2` (even):** The number is even, so we just divide by `2`. This costs **1 step**. Carry resets to `0` if `effectiveBit === 0`, or stays `1` if it was `2` (both bits were `1` — carry continues propagating).
- After processing all bits up to the leading `1`, if `carry === 1`, the carry needs to merge into the leading `1`, requiring one final addition step (which turns `1` + carry into `10`, but that's the terminal addition that reaches a power of 2 — then we'd continue dividing, but since we've already accounted for all bits below the leading `1`, this +1 step is the only remaining action).
- Return `steps + carry`.

# Complexity
- Time complexity: $$O(n)$$ — single pass over the string.

- Space complexity: $$O(1)$$ — only two integer variables.

# Code
```typescript []
const numSteps = (s: string): number => {
    let steps = 0;
    let carry = 0;

    for (let i = s.length - 1; i > 0; i--) {
        const effectiveBit = +s[i] + carry;

        if (effectiveBit === 1) {
            steps += 2;
            carry = 1;
        } else {
            steps += 1;
        }
    }

    return steps + carry;
};
```