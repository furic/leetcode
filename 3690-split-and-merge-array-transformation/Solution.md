# BFS State Space Search | 35 Lines | O(n!) | 138ms

# Intuition
This problem requires transforming one array into another through split-and-merge operations. Since we need the minimum number of operations, this is a shortest path problem in a state space where each state is a permutation of the array. BFS is ideal for finding the shortest path, as it explores states level by level, guaranteeing we find the minimum number of operations.

# Approach
I'll use BFS to explore the state space of array configurations:

1. **State Representation**: Represent each array configuration as a string (join with delimiter) for efficient hashing and duplicate detection.

2. **BFS Queue**: Use a queue to explore states level by level, where each level represents one additional operation. Store both the current array state and the number of steps taken.

3. **Operation Generation**: For each state, generate all possible next states by:
   - Trying all possible subarray positions (left, right)
   - Removing the subarray and trying all insertion positions
   - Each combination creates a new candidate state

4. **Visited Tracking**: Use a Set to track visited states and avoid processing the same configuration multiple times, preventing infinite loops and redundant work.

5. **Early Termination**: Return immediately when we find the target configuration, as BFS guarantees this is the minimum number of steps.

The algorithm exhaustively explores all reachable configurations in order of increasing operations until finding the target.

# Complexity
- Time complexity: $$O(n!)$$
  - In worst case, we may need to explore O(n!) different permutations
  - For each state, generating all possible operations takes O(n³) time
  - String operations for hashing add O(n) overhead
  - Overall exponential/factorial in array size

- Space complexity: $$O(n! \cdot n)$$
  - Queue can store up to O(n!) states in worst case
  - Each state stores an array of size n
  - Visited set also stores O(n!) string keys of length O(n)
  - Overall space is dominated by state storage

# Code
```typescript []
const minSplitMerge = (nums1: number[], nums2: number[]): number => {
    const n = nums1.length;

    const targetKey = nums2.join(",");
    const startKey = nums1.join(",");
    if (startKey === targetKey) return 0;

    const queue: [number[], number][] = [[nums1, 0]];
    const visited = new Set<string>([startKey]);

    while (queue.length > 0) {
        const [currentArr, steps] = queue.shift()!;

        for (let left = 0; left < n; left++) {
            for (let right = left; right < n; right++) {
                const block = currentArr.slice(left, right + 1);
                const remaining = [
                    ...currentArr.slice(0, left),
                    ...currentArr.slice(right + 1),
                ];

                for (let pos = 0; pos <= remaining.length; pos++) {
                    const nextArr = [
                        ...remaining.slice(0, pos),
                        ...block,
                        ...remaining.slice(pos),
                    ];

                    const nextKey = nextArr.join(",");
                    if (nextKey === targetKey) {
                        return steps + 1;
                    }

                    if (!visited.has(nextKey)) {
                        visited.add(nextKey);
                        queue.push([nextArr, steps + 1]);
                    }
                }
            }
        }
    }

    return 0;
};
```