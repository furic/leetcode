# Two-Pass Constraint Propagation + Pair Peak | 24 Lines | O(m log m) | 95ms

# Intuition
Each restriction caps the height at one building. We need to propagate these caps both left-to-right (from the starting height 0) and right-to-left (from later restrictions backward), then find the maximum achievable peak between each consecutive pair of anchors.

# Approach
- **Sort restrictions** by building id ascending.
- **Forward pass:** For each restriction, cap its height by what's reachable from the previous anchor: `min(r[1], r[0] - prevId + prevHeight)`. This enforces the height-difference-of-1 constraint coming from the left.
- **Backward pass:** For each restriction (right to left), cap by what's reachable from the right neighbour: `min(r[i][1], r[i+1][1] + r[i+1][0] - r[i][0])`.
- **Peak between pairs:** Between two anchors `(id0, h0)` and `(id1, h1)`, the maximum achievable height is `max(h0, h1) + floor((gap) / 2)` where `gap = (id1 - id0) - |h1 - h0|` — the "slack" distance after accounting for the height difference.
- **Tail segment:** From the last restriction to building `n`, the max height is `last.height + (n - last.id)`.
- Return the overall maximum.

# Complexity
- Time complexity: $$O(m \log m)$$ — sorting the restrictions; two linear passes and one pair scan are all $$O(m)$$.

- Space complexity: $$O(1)$$ extra — sorting in-place; restrictions are mutated in place.

# Code
```typescript []
const maxBuilding = (n: number, restrictions: number[][]): number => {
    if (restrictions.length === 0) return n - 1;

    restrictions.sort((a, b) => a[0] - b[0]);

    let prevId = 1, prevHeight = 0;
    for (const r of restrictions) {
        r[1] = Math.min(r[1], r[0] - prevId + prevHeight);
        prevId = r[0];
        prevHeight = r[1];
    }

    for (let i = restrictions.length - 2; i >= 0; i--) {
        restrictions[i][1] = Math.min(
            restrictions[i][1],
            restrictions[i + 1][1] + restrictions[i + 1][0] - restrictions[i][0]
        );
    }

    const last = restrictions[restrictions.length - 1];
    let maxHeight = n - last[0] + last[1];

    prevId = 1;
    prevHeight = 0;
    for (const [id, height] of restrictions) {
        const gap  = id - prevId - Math.abs(height - prevHeight);
        const peak = Math.max(height, prevHeight) + Math.floor(gap / 2);
        maxHeight  = Math.max(maxHeight, peak);
        prevId     = id;
        prevHeight = height;
    }

    return maxHeight;
};
```