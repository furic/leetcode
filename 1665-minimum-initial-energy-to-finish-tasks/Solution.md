# Greedy Slack Sort + Energy Simulation | 6 Lines | O(n log n) | 38ms

# Intuition
Tasks with a larger gap between `minimum` and `actual` (more "slack") are easier to satisfy — they give back relatively more energy after completion. Tasks with less slack are bottlenecks and should be done last when our energy is highest. Sorting by slack ascending (least slack last) minimizes the required starting energy.

# Approach
- Sort tasks by `minimum - actual` ascending — tasks with tight requirements go last.
- Simulate forward: maintain `energy` (the minimum required to have reached this point). For each task, the required energy after completing it is `max(energy + actual, minimum)` — either we had enough to keep going, or we need at least `minimum` to start this task.
- The final `energy` value is the minimum required starting energy.

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by the sort.

- Space complexity: $$O(1)$$ — in-place sort and scalar accumulator.

# Code
```typescript []
const minimumEffort = (tasks: number[][]): number => {
    tasks.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));

    let energy = 0;
    for (const [actual, minimum] of tasks)
        energy = Math.max(energy + actual, minimum);

    return energy;
};
```