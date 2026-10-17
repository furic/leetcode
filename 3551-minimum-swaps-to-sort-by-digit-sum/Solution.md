# Digit Sum Sort Permutation Cycle Count | 24 Lines | O(n log n) | 402ms

# Intuition
Once the target sorted order is known, the array is a permutation of it, and the minimum number of swaps to realise a permutation is `n - (number of cycles)`. Each cycle of length `L` needs exactly `L - 1` swaps. Because all values are distinct, the target position of every element is unambiguous.

# Approach
- Compute the digit sum of every element.
- Sort the original indices by `(digitSum, value)`. `sortedOrder[pos]` is the index of the element that belongs at position `pos`.
- Invert this into `targetPos[i]`, the position where the element currently at index `i` must end up.
- Walk the permutation: for each unvisited index, follow `targetPos` until the cycle closes, marking nodes visited and counting one cycle.
- Return `n - cycles`.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort; digit sums and cycle detection are linear.

- Space complexity: $$O(n)$$ — digit sums, index orderings, and the visited array.

# Code
```typescript []
const minSwaps = (nums: number[]): number => {
    const n = nums.length;

    const digitSum: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let x = nums[i]; x > 0; x = Math.floor(x / 10)) sum += x % 10;
        digitSum[i] = sum;
    }

    const sortedOrder: number[] = Array.from({ length: n }, (_, i) => i);
    sortedOrder.sort((a, b) =>
        digitSum[a] !== digitSum[b] ? digitSum[a] - digitSum[b] : nums[a] - nums[b]
    );

    const targetPos: number[] = new Array(n);
    for (let pos = 0; pos < n; pos++) targetPos[sortedOrder[pos]] = pos;

    const visited: boolean[] = new Array(n).fill(false);
    let cycles = 0;
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        cycles++;
        for (let j = i; !visited[j]; j = targetPos[j]) visited[j] = true;
    }

    return n - cycles;
};
```