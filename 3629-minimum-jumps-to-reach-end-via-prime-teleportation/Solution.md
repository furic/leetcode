# Sieve BFS Prime Teleportation | 28 Lines | O(V log V + n) | 402ms

# Intuition
This is a shortest-path problem on an implicit graph. Adjacent steps connect neighbouring indices (cost 1), and prime teleportation creates long-range edges between indices sharing a prime factor. BFS from the end gives minimum jumps from any start.

# Approach
- **Sieve precomputation (module level):** Use a linear sieve to compute all prime factors for every number up to `10^6`. Each composite gets its prime factors enumerated when we process its prime divisors.
- **Build `primeToIndices`:** For each index `i`, if `nums[i]` is prime, register `i` in a map keyed by that prime. This lets us find all teleportation destinations for any prime encountered at a node.
- **BFS from `n - 1`:** Run backward BFS. For each dequeued index `i`:
  - Enqueue unvisited neighbours `i - 1` and `i + 1` (adjacent steps).
  - For each prime factor of `nums[i]`, look up `primeToIndices[prime]` and enqueue all unvisited destination indices. Immediately clear the prime's entry to avoid re-processing the same group — this is critical to prevent O(n²) blowup when many nodes share a factor.
- Return `steps` the moment index `0` is dequeued.
- **Why BFS from the end:** Symmetric — any path from 0 to n-1 is also a valid reverse path.

# Complexity
- Time complexity: $$O(V \log \log V + n)$$ where $$V = 10^6$$ — sieve is $$O(V \log \log V)$$; BFS visits each index and each prime-group at most once, giving $$O(n)$$ for the main algorithm.

- Space complexity: $$O(V + n)$$ — sieve storage plus BFS structures.

# Code
```typescript []
const MAX_VAL = 1_000_001;

const primeFactors: number[][] = Array.from({ length: MAX_VAL }, () => []);
for (let p = 2; p < MAX_VAL; p++) {
    if (primeFactors[p].length === 0) {
        for (let multiple = p; multiple < MAX_VAL; multiple += p) {
            primeFactors[multiple].push(p);
        }
    }
}

const minJumps = (nums: number[]): number => {
    const n = nums.length;

    const primeToIndices = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (primeFactors[val].length === 1 && primeFactors[val][0] === val) {
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

            if (i > 0     && !visited[i - 1]) { visited[i - 1] = true; nextQueue.push(i - 1); }
            if (i < n - 1 && !visited[i + 1]) { visited[i + 1] = true; nextQueue.push(i + 1); }

            for (const prime of primeFactors[nums[i]]) {
                const targets = primeToIndices.get(prime);
                if (targets) {
                    for (const j of targets) {
                        if (!visited[j]) { visited[j] = true; nextQueue.push(j); }
                    }
                    primeToIndices.set(prime, []);
                }
            }
        }

        queue = nextQueue;
        steps++;
    }
};
```