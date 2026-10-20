// Module-level random values per number, used to hash multisets (sum of random values)
let randomByValue: Uint32Array | null = null;
let seed = 123456789 >>> 0;

// mulberry32 PRNG
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

    // Already sorted: every divisor works
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

    // Prefix hashes of nums and sorted (to compare block multisets in O(1)),
    // plus prefix count of positions where nums differs from sorted
    const hashNums   = new Uint32Array(n + 1);
    const hashSorted = new Uint32Array(n + 1);
    const mismatches = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        hashNums[i + 1]   = hashNums[i]   + rand[nums[i]];
        hashSorted[i + 1] = hashSorted[i] + rand[sorted[i]];
        mismatches[i + 1] = mismatches[i] + (nums[i] !== sorted[i] ? 1 : 0);
    }

    // Scratch buffers for KMP, reused across blocks
    const pattern = new Int32Array(n);
    const failure = new Int32Array(n);

    // Can nums[start, start + size) be rotated into sorted[start, start + size)?
    const canRotateToSorted = (start: number, size: number): boolean => {
        if (mismatches[start + size] - mismatches[start] === 0) return true; // already matches
        if (hashNums[start + size] - hashNums[start] !== hashSorted[start + size] - hashSorted[start])
            return false; // different multiset (probabilistic check)

        // Rotation check: is the nums block a window inside sortedBlock + sortedBlock?
        for (let j = 0; j < size; j++) pattern[j] = nums[start + j];

        failure[0] = 0;
        for (let j = 1; j < size; j++) {
            let f = failure[j - 1];
            while (f > 0 && pattern[j] !== pattern[f]) f = failure[f - 1];
            failure[j] = pattern[j] === pattern[f] ? f + 1 : 0;
        }

        let matched = 0;
        const windowLen = 2 * size - 1; // doubled block minus last char is enough
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