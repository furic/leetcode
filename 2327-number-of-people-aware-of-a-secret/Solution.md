#  Dynamic Programming Secret Sharing | 24 Lines | O(n) | 1ms

# Intuition
This is a simulation problem where we need to track the lifecycle of secret knowledge: people learn the secret, become eligible to share it after a delay period, and eventually forget it. The key insight is to track how many new people learn the secret each day and maintain a count of active sharers (people who can currently share but haven't forgotten yet). The final answer is the sum of people who learned the secret in the last `forget-1` days.

# Approach
I'll use dynamic programming to simulate the daily secret sharing process:

1. **State Tracking**: Maintain an array `newPeoplePerDay[i]` representing how many people learned the secret on day i.

2. **Active Sharers Management**: Track the number of people who can currently share the secret. This includes people who:
   - Learned the secret at least `delay` days ago (eligible to share)
   - Learned the secret less than `forget` days ago (still remember)

3. **Daily Simulation**: For each day from 2 to n:
   - Add new sharers: people who learned the secret `delay` days ago become eligible
   - Remove forgotten sharers: people who learned the secret `forget` days ago lose the ability to share
   - Each active sharer tells exactly one new person

4. **Final Count**: Sum up people who learned the secret in the last `forget-1` days, as these are the people who still remember on day n.

5. **Modular Arithmetic**: Apply modulo operations to handle large numbers and prevent overflow.

# Complexity
- Time complexity: $$O(n)$$
  - Main simulation loop runs n-1 times
  - Each iteration performs constant-time operations (addition, subtraction, modulo)
  - Final counting loop runs at most `forget-1` times, which is O(forget) ≤ O(n)

- Space complexity: $$O(n)$$
  - Array `newPeoplePerDay` stores values for n+1 days
  - All other variables use constant space
  - No additional data structures that scale beyond the input size

# Code
```typescript []
const peopleAwareOfSecret = (n: number, delay: number, forget: number): number => {
    const MODULO = 1_000_000_007;
    const newPeoplePerDay = new Array(n + 1).fill(0);

    newPeoplePerDay[1] = 1;
    let activeSharers = 0;

    for (let currentDay = 2; currentDay <= n; currentDay++) {
        if (currentDay - delay >= 1) {
            activeSharers = (activeSharers + newPeoplePerDay[currentDay - delay]) % MODULO;
        }

        if (currentDay - forget >= 1) {
            activeSharers = (activeSharers - newPeoplePerDay[currentDay - forget] + MODULO) % MODULO;
        }

        newPeoplePerDay[currentDay] = activeSharers;
    }

    let totalWhoRemember = 0;
    for (let dayLearned = n - forget + 1; dayLearned <= n; dayLearned++) {
        totalWhoRemember = (totalWhoRemember + newPeoplePerDay[dayLearned]) % MODULO;
    }

    return totalWhoRemember;
};
```