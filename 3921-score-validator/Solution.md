# Event Switch Simulation | 8 Lines | O(n) | 1ms

# Intuition
A straightforward simulation — process events left to right, update score and counter per the rules, and stop early when counter hits 10.

# Approach
- Iterate through `events`, breaking immediately when `counter === 10`.
- Use a `switch` to dispatch each event type: `'W'` increments counter; `'WD'` and `'NB'` add 1 to score; numeric strings add their parsed value.
- Return `[score, counter]`.

# Complexity
- Time complexity: $$O(n)$$ — at most one pass through all events.

- Space complexity: $$O(1)$$ — two scalar variables.

# Code
```typescript []
const scoreValidator = (events: string[]): number[] => {
    let score = 0;
    let counter = 0;

    for (const event of events) {
        if (counter === 10) break;

        switch (event) {
            case 'W':  counter++;  break;
            case 'WD':
            case 'NB': score += 1; break;
            default:   score += Number(event);
        }
    }

    return [score, counter];
};
```