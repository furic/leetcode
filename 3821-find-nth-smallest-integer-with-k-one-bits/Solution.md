# Combinatorial Bit Construction | 23 Lines | O(k × log max) | 23ms

# Intuition

Numbers with exactly k ones can be enumerated in sorted order by deciding bit-by-bit whether to set each bit. Use combinatorics to count how many valid numbers exist if we skip setting a bit, allowing us to find the nth number efficiently.

# Approach

**Precompute Combinations:**
- C(i,j) = number of ways to choose j ones from i positions
- Needed to count numbers with specific bit patterns

**Greedy Bit Construction:**
- Process bits from high to low (50 down to 0)
- For each bit position:
  - Count numbers if we set this bit to 0: C(bit, onesLeft)
  - If this count < remaining n: we must set bit to 1
    - Set the bit, subtract count from remaining
    - Decrement onesLeft
  - Otherwise: skip this bit (set to 0)

**Why This Works:**
- Numbers sorted lexicographically by binary representation
- At each bit, we partition remaining numbers into two groups
- Choosing whether to set bit determines which partition contains nth number

**Example: n=4, k=2**

Start: remaining=4, onesLeft=2

Bit 50-3: All C(bit,2) too large, skip
Bit 2: C(2,2)=1 < 4? No, skip
Bit 1: C(1,2)=0 < 4? Yes, set bit 1, remaining=4-0=4, onesLeft=1
  Result: ...010

Wait, that's not right. Let me retrace:

Actually with k=2:
- Bit 1: C(1,2)=0 (can't choose 2 from 1), set bit
- Bit 0: C(0,1)=0, set bit
- Result: 11 (binary) = 3

But we want 4th number. Let me reconsider the algorithm...

The algorithm builds from MSB. For n=4, k=2:
- Try bit positions from high to low
- Bit 1: if we skip (set to 0), C(1,2)=0 numbers below
  - 0 < 4, so we SET this bit
  - remaining = 4-0 = 4, onesLeft = 1
- Bit 0: if we skip, C(0,1)=0 numbers
  - 0 < 4, so we SET this bit
  - Result: 11 = 3

This gives 3, not 9. There's an issue with my understanding.

Looking more carefully: the algorithm needs to find which bits to set. Let me trace properly for getting the 4th number with k=2 ones.

Numbers: 3(11), 5(101), 6(110), 9(1001)

Starting from bit 3 (checking if setting bit 3 to 1):
- If bit 3=0, how many k=2 numbers? C(3,2)=3
- 3 < 4, so we need bit 3=1
- remaining=4-3=1, onesLeft=1

Now bit 2 (we have 1xxx, need 1 more one):
- If bit 2=0, how many? C(2,1)=2
- 2 > 1, so we skip (bit 2=0)

Bit 1:
- If bit 1=0, C(1,1)=1
- 1 == 1, so we skip

Bit 0:
- onesLeft=1, must set
- Result: 1001 = 9 ✓

# Complexity

- Time complexity: $$O(k \times \log(\max))$$
  - Precompute combinations: O(50²) = O(1) constant
  - Bit loop: O(50) = O(log max_value)
  - Overall: O(50) = O(1)

- Space complexity: $$O(1)$$
  - Combination table: O(50²) = O(1) constant
  - Variables: O(1)

# Code
```typescript []
const nthSmallest = (n: number, k: number): number => {
    const comb = Array.from({length: 51}, () => Array(51).fill(0n));
    for (let i = 0; i <= 50; i++) {
        comb[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            comb[i][j] = comb[i - 1][j - 1] + comb[i - 1][j];
        }
    }

    let result = 0n;
    let remaining = BigInt(n);
    let onesLeft = k;
    
    for (let bit = 50; bit >= 0 && onesLeft > 0; bit--) {
        const countIfZero = comb[bit][onesLeft];
        if (countIfZero < remaining) {
            result |= (1n << BigInt(bit));
            remaining -= countIfZero;
            onesLeft--;
        }
    }
    
    return Number(result);
};
```