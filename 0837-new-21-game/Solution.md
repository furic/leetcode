# Sliding Window Probability | 31 Lines | O(n) | 1ms

# Intuition
This is a dynamic programming problem involving probability calculations. Alice draws cards until she reaches k or more points, and we need to find the probability she ends with ≤ n points. The key insight is that each score has a probability of being reached, and from scores < k, Alice continues drawing with uniform probability distribution. We can calculate these probabilities incrementally while maintaining a sliding window of "active" scores from which Alice can still draw.

# Approach
I'll use dynamic programming with a sliding window optimization:

1. **Base Cases**: Handle edge cases where Alice is guaranteed to win (k=0 or minimum possible final score ≤ n).

2. **DP State**: `dp[i]` = probability of reaching exactly score i. We start with `dp[0] = 1.0`.

3. **Sliding Window**: Maintain `activeProbabilitySum` = sum of probabilities for scores from which Alice can still draw (scores < k within the last maxPts range).

4. **Transition**: For each score i, the probability is `activeProbabilitySum / maxPts` because Alice draws uniformly from [1, maxPts].

5. **Score Classification**:
   - If score < k: Alice continues drawing, so add this probability to the active sum
   - If score ≥ k: Alice stops, so add to final result if score ≤ n

6. **Space Optimization**: Use a circular buffer of size maxPts instead of storing all probabilities, since we only need the last maxPts values for the sliding window.

# Complexity
- Time complexity: $$O(n)$$
  - We iterate through scores from 1 to n exactly once
  - Each iteration performs constant-time operations (addition, division, array access)
  - No nested loops or recursive calls

- Space complexity: $$O(\min(n, \text{maxPts}))$$
  - Circular buffer of size maxPts for space optimization
  - Without optimization, it would be O(n), but we only store maxPts values
  - Additional variables use O(1) space

# Code
```typescript []
const new21Game = (n: number, k: number, maxPts: number): number => {
    if (k === 0 || n >= k - 1 + maxPts) return 1.0;

    const probabilityAtScore = new Array(maxPts).fill(0.0);
    probabilityAtScore[0] = 1.0;

    let activeProbabilitySum = 1.0;
    
    let targetProbability = 0.0;

    for (let currentScore = 1; currentScore <= n; currentScore++) {
        const probabilityOfCurrentScore = activeProbabilitySum / maxPts;

        if (currentScore < k) {
            activeProbabilitySum += probabilityOfCurrentScore;
        } else {
            targetProbability += probabilityOfCurrentScore;
        }

        if (currentScore >= maxPts) {
            activeProbabilitySum -= probabilityAtScore[currentScore % maxPts];
        }

        probabilityAtScore[currentScore % maxPts] = probabilityOfCurrentScore;
    }

    return targetProbability;
};
```