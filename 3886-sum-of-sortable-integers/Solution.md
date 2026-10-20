# Multiset Hash + KMP Rotation | 74 Lines | O(n log n + n·d(n)) | 43ms

# Intuition
If `nums` can be sorted by rotating blocks of size `k`, every block must end up exactly equal to the matching block of the globally sorted array. So for each divisor `k` of `n`, check that every block of `nums` is a cyclic rotation of the corresponding block in `sorted`. Rotation checks are made cheap with two filters: a hash comparison to reject blocks with the wrong elements, then KMP to confirm the rotation.

# Approach
- **Setup:**
  - Build `sorted`, a sorted copy of `nums`.
  - Collect all divisors of `n` in `O(√n)`.
  - If `nums` is already sorted, every divisor works, so return the sum of all divisors.
- **Multiset hashing:**
  - Assign each value a random 32-bit number (`rand[v]`), generated once with a mulberry32 PRNG.
  - Build prefix sums `hashNums` and `hashSorted` over those random values.
  - A block of `nums` and the same block of `sorted` have the same multiset (with very high probability) iff their prefix-hash differences match. This gives an `O(1)` reject test per block.
- **Mismatch prefix count:**
  - `mismatches[i]` counts positions where `nums` differs from `sorted`.
  - If a block has zero mismatches, it is already in place and needs no rotation.
- **`canRotateToSorted(start, size)`:**
  - Return `true` if the block has no mismatches.
  - Return `false` if the hashes differ.
  - Otherwise, copy the `nums` block into `pattern` and build its KMP failure table.
  - Scan the sorted block doubled (`windowLen = 2 * size - 1`, since the last character of the doubled string can't start a new rotation).
  - If the whole pattern matches, the `nums` block is a rotation of the sorted block.
- **Per divisor:**
  - Check every block of size `k`.
  - If all blocks pass, add `k` to the answer.
- Scratch buffers (`pattern`, `failure`) are allocated once and reused across blocks and divisors.

# Complexity
- Time complexity: $$O(n \log n + n \cdot d(n))$$ where $$d(n) \leq 128$$ is the number of divisors of `n` — sorting costs $$O(n \log n)$$, and for each divisor the blocks together cost $$O(n)$$ (hash check is $$O(1)$$, KMP is linear in block size). The random table is a one-time $$O(V)$$ initialisation with $$V = 10^5$$.

- Space complexity: $$O(n + V)$$ — prefix arrays, KMP buffers and the sorted copy are $$O(n)$$; the random table is $$O(V)$$.

# Code
```typescript []
let randomByValue: Uint32Array | null = null;
let seed = 123456789 >>> 0;

const nextRandom = (): number => {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
};

const sortableIntegers = (nums: number[]): number => {
    const n = nums.length;
    const sorted = nums.slice().sort((a, b) => a - b);

    const divisors: number[] = [];
    for (let d = 1; d * d <= n; d++) {
        if (n % d === 0) {
            divisors.push(d);
            if (d * d !== n) divisors.push(n / d);
        }
    }

    let alreadySorted = true;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== sorted[i]) { alreadySorted = false; break; }
    }
    if (alreadySorted) {
        let total = 0;
        for (const d of divisors) total += d;
        return total;
    }

    if (randomByValue === null) {
        randomByValue = new Uint32Array(100001);
        for (let v = 1; v <= 100000; v++) randomByValue[v] = nextRandom();
    }
    const rand = randomByValue;

    const hashNums   = new Uint32Array(n + 1);
    const hashSorted = new Uint32Array(n + 1);
    const mismatches = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        hashNums[i + 1]   = hashNums[i]   + rand[nums[i]];
        hashSorted[i + 1] = hashSorted[i] + rand[sorted[i]];
        mismatches[i + 1] = mismatches[i] + (nums[i] !== sorted[i] ? 1 : 0);
    }

    const pattern = new Int32Array(n);
    const failure = new Int32Array(n);

    const canRotateToSorted = (start: number, size: number): boolean => {
        if (mismatches[start + size] - mismatches[start] === 0) return true;
        if (hashNums[start + size] - hashNums[start] !== hashSorted[start + size] - hashSorted[start])
            return false;

        for (let j = 0; j < size; j++) pattern[j] = nums[start + j];

        failure[0] = 0;
        for (let j = 1; j < size; j++) {
            let f = failure[j - 1];
            while (f > 0 && pattern[j] !== pattern[f]) f = failure[f - 1];
            failure[j] = pattern[j] === pattern[f] ? f + 1 : 0;
        }

        let matched = 0;
        const windowLen = 2 * size - 1;
        for (let j = 0; j < windowLen; j++) {
            const ch = sorted[start + (j < size ? j : j - size)];
            while (matched > 0 && ch !== pattern[matched]) matched = failure[matched - 1];
            if (ch === pattern[matched]) matched++;
            if (matched === size) return true;
        }
        return false;
    };

    let answer = 0;
    for (const size of divisors) {
        let ok = true;
        for (let start = 0; start < n; start += size) {
            if (!canRotateToSorted(start, size)) { ok = false; break; }
        }
        if (ok) answer += size;
    }

    return answer;
};
```