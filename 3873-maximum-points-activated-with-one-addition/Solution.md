# Union-Find Component Bridge | 26 Lines | O(n α(n)) | 132ms

# Intuition
Points sharing an x or y coordinate form connected components via the activation rule. Adding one new point can act as a bridge connecting at most two existing components (one via its x-coordinate, one via its y-coordinate). So the answer is: pick the two largest components and add 1 for the new point itself.

# Approach
- **Build components with Union-Find:** For each point `i`, check if any previous point shares its x-coordinate (via `xGroup` map) or y-coordinate (via `yGroup` map). If so, union them. Otherwise register `i` as the representative for that coordinate.
- This groups all transitively connected points — points linked through shared coordinates — into a single component.
- **Path halving** (`parent[i] = parent[parent[i]]`) is used for efficient find without a separate rank array.
- **Count component sizes:** After all unions, iterate over all points and group by their root to build a `componentSize` map.
- **Greedy selection:** Sort component sizes descending. The added point can bridge at most two components:
  - If there's only one component, the new point joins it → `sizes[0] + 1`.
  - Otherwise, bridge the two largest → `sizes[0] + sizes[1] + 1`.
- The new point always contributes `+1` regardless of whether it bridges zero, one, or two components (we want the maximum, so always bridge the top two).

# Complexity
- Time complexity: $$O(n \alpha(n))$$ — `n` union and find operations with path compression; sorting component sizes is $$O(n \log n)$$ in the worst case but typically far fewer components exist.

- Space complexity: $$O(n)$$ — parent array, coordinate maps, and component size map.

# Code
```typescript []
const maxActivated = (points: number[][]): number => {
    const n = points.length;
    const parent = new Int32Array(n).map((_, i) => i);

    const find = (i: number): number => {
        while (parent[i] !== i) {
            parent[i] = parent[parent[i]];
            i = parent[i];
        }
        return i;
    };

    const union = (i: number, j: number): void => {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) parent[rootI] = rootJ;
    };

    const xGroup = new Map<number, number>();
    const yGroup = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        const [x, y] = points[i];
        if (xGroup.has(x)) union(i, xGroup.get(x)!); else xGroup.set(x, i);
        if (yGroup.has(y)) union(i, yGroup.get(y)!); else yGroup.set(y, i);
    }

    const componentSize = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        const root = find(i);
        componentSize.set(root, (componentSize.get(root) ?? 0) + 1);
    }

    const sizes = Array.from(componentSize.values()).sort((a, b) => b - a);
    return sizes.length === 1 ? sizes[0] + 1 : sizes[0] + sizes[1] + 1;
};
```