# Prefix Sum with DP | 35 Lines | O(1) query | 9ms

# Intuition
Instead of recalculating waviness for each query, we can precompute waviness for all possible numbers once and use prefix sums for O(1) range queries. Additionally, we can optimize individual waviness calculations using dynamic programming to reuse already-computed prefix waviness values.

# Approach
- **One-Time Precomputation Strategy**:
  - Use module-level cache to ensure expensive computation happens only once
  - Compute waviness for all numbers 0-100000 once during first call
  - Convert to prefix sum array for efficient range queries
  - All subsequent queries become O(1) lookups

- **Waviness Computation with DP Memoization**:
  - For each number, scan digits from right to left in 3-digit windows
  - Track three consecutive digits: left (tens), middle (units of remaining), right (last removed)
  - Check peak condition: `left < middle && right < middle`
  - Check valley condition: `left > middle && right > middle`
  - **DP Optimization**: If we've already computed waviness for the remaining prefix number, add it and stop

- **Right-to-Left Scanning Rationale**:
  - Extract rightmost digit: `remainingDigits % 10`
  - Remove rightmost digit: `remainingDigits = Math.floor(remainingDigits / 10)`
  - Middle digit becomes rightmost of new number: `remainingDigits % 10`
  - Left digit is tens place: `Math.floor(remainingDigits / 10) % 10`
  - This creates natural overlapping windows

- **DP Memoization Benefit**:
  - When computing waviness of 12345, we scan: ...1234, 123, 12
  - If waviness of 123 is already cached, we add it instead of rescanning
  - Dramatically reduces redundant digit-by-digit processing
  - Example: Computing 54321 can reuse cached waviness of 543, 54, etc.

- **Prefix Sum Conversion**:
  - After computing individual waviness values: `cache[i] = waviness(i)`
  - Convert to prefix sums: `cache[i] = cache[i-1] + cache[i]`
  - Now `cache[i]` represents total waviness from 0 to i
  - Range query `[num1, num2]` becomes: `cache[num2] - cache[num1-1]`

- **Edge Cases Handled**:
  - Numbers < 100: Explicitly set to waviness 0 (cannot form 3-digit patterns)
  - num1 = 0: Use 0 instead of `cache[-1]` for lower bound
  - Sentinel value -1: Distinguishes uncomputed from zero-waviness numbers

- **Example Walkthrough** (4848):
  - Start: remainingDigits = 4848
  - Window 1: right=8, middle=4, left=8 → 8>4 and 8>4 → valley, count=1
  - remainingDigits = 484
  - Window 2: right=4, middle=8, left=4 → 4<8 and 4<8 → peak, count=2
  - remainingDigits = 48
  - Check cache[48]: if cached, add and return; else continue
  - Result: waviness = 2

- **Why This Approach is Superior**:
  - Preprocessing once: O(100000) = constant time for any number of queries
  - Each query: O(1) via prefix sum lookup
  - DP reduces average waviness computation from O(d) to O(d') where d' < d
  - Perfect for multiple queries or repeated function calls

# Complexity
- Time complexity: $$O(n + q)$$ amortized, $$O(1)$$ per query after preprocessing
  - Preprocessing (first call only): O(n) where n = 100000
  - Each number's waviness calculation: O(d) worst case, but DP reduces average
  - Prefix sum construction: O(n)
  - Each subsequent query: O(1)
  - For q queries: O(n + q) total, amortized O(1) per query when q is large

- Space complexity: $$O(n)$$
  - Module-level cache array: O(100001) = O(n)
  - Temporary variables during computation: O(1)
  - No additional space dependent on query parameters

# Code
```typescript
const MAX_NUMBER = 100000;
const wavinessCache: number[] = new Array(MAX_NUMBER + 1);
let isCacheInitialized = false;

const totalWaviness = (num1: number, num2: number): number => {
    if (!isCacheInitialized) {
        initializeWavinessCache();
        isCacheInitialized = true;
    }

    return wavinessCache[num2] - (num1 > 0 ? wavinessCache[num1 - 1] : 0);
};

const initializeWavinessCache = (): void => {
    wavinessCache.fill(-1);

    for (let i = 0; i < 100; i++) {
        wavinessCache[i] = 0;
    }

    for (let i = 100; i <= MAX_NUMBER; i++) {
        wavinessCache[i] = calculateWaviness(i);
    }

    for (let i = 1; i <= MAX_NUMBER; i++) {
        wavinessCache[i] += wavinessCache[i - 1];
    }
};

const calculateWaviness = (number: number): number => {
    let totalPeaksAndValleys = 0;
    let remainingDigits = number;

    while (remainingDigits > 99) {
        const rightDigit = remainingDigits % 10;
        remainingDigits = Math.floor(remainingDigits / 10);
        const middleDigit = remainingDigits % 10;
        const leftDigit = Math.floor(remainingDigits / 10) % 10;

        if (isPeakOrValley(leftDigit, middleDigit, rightDigit)) {
            totalPeaksAndValleys++;
        }

        if (wavinessCache[remainingDigits] !== -1) {
            totalPeaksAndValleys += wavinessCache[remainingDigits];
            break;
        }
    }

    return totalPeaksAndValleys;
};

const isPeakOrValley = (leftDigit: number, middleDigit: number, rightDigit: number): boolean => {
    const isPeak = leftDigit < middleDigit && rightDigit < middleDigit;
    const isValley = leftDigit > middleDigit && rightDigit > middleDigit;
    return isPeak || isValley;
};
```