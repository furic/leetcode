#  16:38 BFS Jump Reachability | 10 Lines | O(n) | 0ms

# Intuition
This is a reachability problem on an implicit graph — from each index, two edges exist (forward and backward by `arr[i]`). BFS finds whether any index with value `0` is reachable from `start`.

# Approach
- BFS from `start`. For each dequeued index `idx`:
  - Skip if out of bounds or already visited.
  - Return `true` immediately if `arr[idx] === 0`.
  - Mark visited, then enqueue `idx + arr[idx]` and `idx - arr[idx]`.
- Return `false` if the queue empties with no zero found.

# Complexity
- Time complexity: $$O(n)$$ — each index is visited at most once.

- Space complexity: $$O(n)$$ — visited set and queue.

# Code
```typescript []
const canReach = (arr: number[], start: number): boolean => {
    const n = arr.length;
    const visited = new Set<number>();
    const queue: number[] = [start];

    while (queue.length) {
        const idx = queue.shift()!;

        if (idx < 0 || idx >= n || visited.has(idx)) continue;
        if (arr[idx] === 0) return true;

        visited.add(idx);
        queue.push(idx + arr[idx]);
        queue.push(idx - arr[idx]);
    }

    return false;
};
```