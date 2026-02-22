# Greedy Bit Pairing | 18 Lines | O(n) | 89ms

# Intuition
XOR produces `1` only when two bits differ. To maximize the result, we want as many `1`s as possible, starting from the most significant bit. Since we can freely rearrange `t`, this becomes a greedy assignment problem — for each bit position in `s` (left to right), pair it with the opposite bit from `t` if one is still available.

# Approach
- Count the available `1`s and `0`s in `t` using `availableOnes` and `availableZeros`.
- Iterate through `s` from left to right (most significant to least significant bit):
  - XOR yields `1` when bits **differ**, so:
    - If `s[i] === '0'`, we need a `'1'` from `t` to produce a `1`.
    - If `s[i] === '1'`, we need a `'0'` from `t` to produce a `1`.
  - If the desired opposite bit is still available (`canProduceOne`), consume it and assign `'1'` to the result.
  - Otherwise, consume the same bit (producing XOR `0`) — no choice remains.
- Join and return the result array as a string.
- Greedy correctness holds because higher-order bits contribute more to the integer value, and we never need to "save" a bit for a later position — a `1` now is always worth more than a `1` later.

# Complexity
- Time complexity: $$O(n)$$ — one pass to count `t`'s bits, one pass to assign result bits.

- Space complexity: $$O(n)$$ — for the result array.

# Code
```typescript []
const maximumXor = (s: string, t: string): string => {
    let availableOnes = 0;
    let availableZeros = 0;

    for (let i = 0; i < t.length; i++) {
        if (t[i] === '1') availableOnes++;
        else availableZeros++;
    }

    const result = new Array(s.length);

    for (let i = 0; i < s.length; i++) {
        const sBit = s[i];
        const canProduceOne = sBit === '0' ? availableOnes > 0 : availableZeros > 0;

        if (canProduceOne) {
            sBit === '0' ? availableOnes-- : availableZeros--;
            result[i] = '1';
        } else {
            sBit === '0' ? availableZeros-- : availableOnes--;
            result[i] = '0';
        }
    }

    return result.join('');
};
```