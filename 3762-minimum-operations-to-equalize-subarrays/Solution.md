# Mo's Algorithm with BIT Median | 85 Lines | O((n+q)√n log n) | 525ms

# Intuition
Two elements can be made equal using ±k operations only if they have the same remainder mod k. When feasible, the problem reduces to finding the minimum total distance to make all "quotient values" (nums[i]/k) equal, which is minimized when targeting the median.

# Approach
- **Feasibility Condition**:
  - Elements a and b can become equal iff `a % k === b % k`
  - Precompute remainder for each element: `remainder[i] = ((nums[i] % k) + k) % k`
  - Track segment IDs: consecutive elements with same remainder share an ID
  - Query [l, r] is impossible if any element has different remainder (segmentId[r] > l)

- **Problem Transformation**:
  - When all remainders match, we can adjust by multiples of k
  - Define m-value: `mValues[i] = floor(nums[i] / k)` (the "level" of each element)
  - Making elements equal means making all m-values equal
  - Cost = sum of |mValues[i] - target| for all i in range
  - Optimal target = median (minimizes sum of absolute deviations)

- **Coordinate Compression**:
  - M-values can be large but we only need relative ordering
  - Compress unique m-values to range [1, size]
  - Store decompression map for retrieving actual median value

- **Binary Indexed Trees (BIT)**:
  - `countTree`: Count of elements at each compressed m-value
  - `sumTree`: Sum of m-values at each compressed position
  - Support O(log n) updates and prefix queries

- **Mo's Algorithm for Range Queries**:
  - Sort queries by block of left endpoint, then by right endpoint
  - Use zigzag ordering (alternating right endpoint direction) for optimization
  - Maintain current range [curL, curR] and incrementally add/remove elements
  - Amortized O((n+q)√n) pointer movements total

- **Median Finding via Binary Search**:
  - Median position = (count + 1) / 2
  - Binary search on compressed values to find where prefix count ≥ median position
  - Use countTree to get prefix counts in O(log n)

- **Cost Calculation**:
  - Split elements into left (≤ median) and right (> median)
  - Left cost: median × leftCount - leftSum
  - Right cost: rightSum - median × rightCount
  - Total: sum of absolute differences to median

- **Example Walkthrough** ([1,4,7], k=3, query [0,2]):
  - Remainders: [1%3, 4%3, 7%3] = [1, 1, 1] ✓ (all same)
  - M-values: [0, 1, 2]
  - Median = 1 (middle value)
  - Cost = |0-1| + |1-1| + |2-1| = 1 + 0 + 1 = 2

- **Why Mo's Algorithm**:
  - Multiple range queries on same array
  - Need dynamic median with add/remove operations
  - BIT enables O(log n) median queries
  - Total: O((n+q)√n × log n)

# Complexity
- Time complexity: $$O((n+q)\sqrt{n} \log n)$$
  - Preprocessing: O(n log n) for sorting and compression
  - Mo's algorithm: O((n+q)√n) pointer movements
  - Each add/remove: O(log n) BIT updates
  - Each answer computation: O(log² n) for binary search + BIT queries
  - Total: O((n+q)√n log n)

- Space complexity: $$O(n + q)$$
  - Arrays for remainder, mValues, segmentId, compressed: O(n)
  - BIT trees: O(n)
  - Sorted queries and results: O(q)
  - Total: O(n + q)

# Code
```typescript
const minOperations = (nums: number[], k: number, queries: number[][]): number[] => {
    const n = nums.length;
    const q = queries.length;

    const remainder = nums.map(x => ((x % k) + k) % k);
    const mValues = nums.map(x => Math.floor(x / k));

    const segmentId = new Array(n);
    segmentId[0] = 0;
    for (let i = 1; i < n; i++) {
        segmentId[i] = remainder[i] === remainder[i - 1] ? segmentId[i - 1] : i;
    }

    const sortedM = [...new Set(mValues)].sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sortedM.forEach((v, i) => compress.set(v, i + 1));
    const compressed = mValues.map(m => compress.get(m)!);
    const decompress = [0, ...sortedM];
    const size = sortedM.length;

    const countTree = new Array(size + 2).fill(0);
    const sumTree = new Array(size + 2).fill(0);

    const update = (tree: number[], i: number, delta: number) => {
        for (; i <= size; i += i & -i) tree[i] += delta;
    };

    const query = (tree: number[], i: number): number => {
        let sum = 0;
        for (; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    };

    let totalCount = 0, totalSum = 0;

    const add = (idx: number) => {
        update(countTree, compressed[idx], 1);
        update(sumTree, compressed[idx], mValues[idx]);
        totalCount++;
        totalSum += mValues[idx];
    };

    const remove = (idx: number) => {
        update(countTree, compressed[idx], -1);
        update(sumTree, compressed[idx], -mValues[idx]);
        totalCount--;
        totalSum -= mValues[idx];
    };

    const computeAnswer = (): number => {
        if (totalCount === 0) return 0;
        const medianPos = Math.floor((totalCount + 1) / 2);
        let lo = 1, hi = size;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            query(countTree, mid) >= medianPos ? hi = mid : lo = mid + 1;
        }
        const median = decompress[lo];
        const leftCount = query(countTree, lo);
        const leftSum = query(sumTree, lo);
        const rightCount = totalCount - leftCount;
        const rightSum = totalSum - leftSum;
        return median * leftCount - leftSum + rightSum - median * rightCount;
    };

    const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
    const sortedQueries = queries.map((qr, i) => ({ l: qr[0], r: qr[1], idx: i }));
    sortedQueries.sort((a, b) => {
        const blockA = Math.floor(a.l / blockSize);
        const blockB = Math.floor(b.l / blockSize);
        if (blockA !== blockB) return blockA - blockB;
        return blockA % 2 === 0 ? a.r - b.r : b.r - a.r;
    });

    const result = new Array(q);
    let curL = 0, curR = -1;

    for (const { l, r, idx } of sortedQueries) {
        if (segmentId[r] > l) {
            result[idx] = -1;
            continue;
        }
        while (curR < r) add(++curR);
        while (curL > l) add(--curL);
        while (curR > r) remove(curR--);
        while (curL < l) remove(curL++);
        result[idx] = computeAnswer();
    }

    return result;
};
```