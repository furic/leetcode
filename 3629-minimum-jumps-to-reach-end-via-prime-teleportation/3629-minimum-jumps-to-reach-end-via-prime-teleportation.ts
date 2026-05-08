const MAX_VAL = 1_000_001;

// Precompute prime factors for each number (only stores primes, not composites)
const primeFactors: number[][] = Array.from({ length: MAX_VAL }, () => []);
for (let p = 2; p < MAX_VAL; p++) {
    if (primeFactors[p].length === 0) { // p is prime
        for (let multiple = p; multiple < MAX_VAL; multiple += p) {
            primeFactors[multiple].push(p);
        }
    }
}

const minJumps = (nums: number[]): number => {
    const n = nums.length;

    // Map each prime to indices where nums[i] equals that prime (direct teleport targets)
    const primeToIndices = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (primeFactors[val].length === 1 && primeFactors[val][0] === val) { // val is prime
            if (!primeToIndices.has(val)) primeToIndices.set(val, []);
            primeToIndices.get(val)!.push(i);
        }
    }

    const visited = new Array(n).fill(false);
    visited[n - 1] = true;
    let queue = [n - 1];
    let steps = 0;

    while (true) {
        const nextQueue: number[] = [];

        for (const i of queue) {
            if (i === 0) return steps;

            // Adjacent steps
            if (i > 0     && !visited[i - 1]) { visited[i - 1] = true; nextQueue.push(i - 1); }
            if (i < n - 1 && !visited[i + 1]) { visited[i + 1] = true; nextQueue.push(i + 1); }

            // Prime teleportation: jump to all indices sharing a prime factor
            for (const prime of primeFactors[nums[i]]) {
                const targets = primeToIndices.get(prime);
                if (targets) {
                    for (const j of targets) {
                        if (!visited[j]) { visited[j] = true; nextQueue.push(j); }
                    }
                    primeToIndices.set(prime, []); // Clear to avoid revisiting
                }
            }
        }

        queue = nextQueue;
        steps++;
    }
};