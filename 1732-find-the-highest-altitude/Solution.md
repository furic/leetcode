# Prefix Sum Running Maximum | 6 Lines | O(n) | 0ms

# Intuition
The altitude at each point is the prefix sum of `gain`. The highest altitude is the running maximum of those prefix sums, initialised at `0` (the starting altitude).

# Approach
- Maintain `altitude` as the running prefix sum and `maxAltitude` starting at `0`.
- For each gain value, update both. Return `maxAltitude`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const largestAltitude = (gain: number[]): number => {
    let maxAltitude = 0;
    let altitude = 0;

    for (const g of gain) {
        altitude += g;
        maxAltitude = Math.max(maxAltitude, altitude);
    }

    return maxAltitude;
};
```