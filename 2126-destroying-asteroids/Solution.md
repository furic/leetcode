# Greedy Sort Absorb Simulation | 6 Lines | O(n log n) | 92ms

# Intuition
To maximize the chance of absorbing all asteroids, always absorb the smallest ones first — this greedily builds mass as fast as possible. If at any point the current asteroid is too large to absorb, no reordering can help since we've already accumulated the maximum possible mass from all smaller asteroids.

# Approach
- Sort asteroids ascending.
- Iterate through them: if `mass < asteroid`, return `false` immediately. Otherwise absorb: `mass += asteroid`.
- Return `true` if all are absorbed.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort.

- Space complexity: $$O(\log n)$$ — sort stack.

# Code
```typescript []
const asteroidsDestroyed = (mass: number, asteroids: number[]): boolean => {
    asteroids.sort((a, b) => a - b);

    for (const asteroid of asteroids) {
        if (mass < asteroid) return false;
        mass += asteroid;
    }

    return true;
};
```