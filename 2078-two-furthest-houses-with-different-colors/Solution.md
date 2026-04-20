# Two Endpoint Outward Scans | 10 Lines | O(n) | 0ms

# Intuition
The maximum distance pair must include either the leftmost or rightmost house. If it included neither, we could extend one end outward to get a larger distance. So we only need two scans: one anchored at the left end, one at the right end.

# Approach
- **Scan 1:** Starting from the rightmost house, find the first house (scanning leftward) whose color differs from `colors[0]`. The distance is that index `j`.
- **Scan 2:** Starting from the leftmost house, find the first house (scanning rightward) whose color differs from `colors[n-1]`. The distance is `n - 1 - i`.
- Return the maximum of the two candidates.
- The `break` in each scan is correct — we want the farthest valid house from each anchor, and since we scan from the far end inward, the first match is the farthest.

# Complexity
- Time complexity: $$O(n)$$ — two linear scans, each at most `n` steps.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const maxDistance = (colors: number[]): number => {
    const n = colors.length;
    let maxDist = 0;

    for (let j = n - 1; j > 0; j--) {
        if (colors[j] !== colors[0]) {
            maxDist = j;
            break;
        }
    }

    for (let i = 0; i < n - 1; i++) {
        if (colors[i] !== colors[n - 1]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;
        }
    }

    return maxDist;
};
```