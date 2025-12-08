# Greedy Benefit Selection | 15 Lines | O(n log n) | 124ms

# Intuition
For each task, we can calculate the benefit (or cost) of using technique 1 over technique 2. By sorting these benefits in descending order and greedily selecting the top benefits, we maximize total points while ensuring at least k tasks use technique 1.

# Approach
- **Benefit Calculation**:
  - For task i, benefit = technique1[i] - technique2[i]
  - Positive benefit: gain points by using technique 1
  - Negative benefit: lose points by using technique 1
  - Zero benefit: indifferent between techniques

- **Baseline Strategy**:
  - Start by assuming all tasks use technique 2
  - Calculate total points with this baseline
  - Then selectively switch to technique 1 where beneficial

- **Greedy Selection**:
  - Sort benefits in descending order
  - MUST switch top k tasks to technique 1 (constraint requirement)
  - This includes even negative benefits if they're in top k
  - For remaining tasks (after k), only switch if benefit is positive

- **Why Greedy Works**:
  - We want to maximize total points
  - If we must use technique 1 for k tasks, choose the k with highest benefits
  - For optional tasks, only use technique 1 if it increases total
  - Sorted order ensures we consider best options first

- **Optimization - Early Termination**:
  - After taking mandatory k benefits, iterate remaining in sorted order
  - Stop when encountering first non-positive benefit
  - Since sorted descending, all subsequent benefits are also non-positive

- **Example Walkthrough** (technique1=[5,2,10], technique2=[10,3,8], k=2):
  - benefits = [5-10, 2-3, 10-8] = [-5, -1, 2]
  - sorted = [2, -1, -5]
  - baseline (all technique2) = 10 + 3 + 8 = 21
  - must take top 2: 21 + 2 + (-1) = 22
  - remaining benefit (-5) is negative, don't take
  - result = 22 ✓

- **Edge Cases Handled**:
  - k = 0: No mandatory technique 1, only take positive benefits
  - k = n: Must use technique 1 for all tasks
  - All benefits negative: Still must take top k
  - All benefits positive: Take all tasks with technique 1

# Complexity
- Time complexity: $$O(n \log n)$$
  - Calculate benefits: O(n)
  - Sort benefits: O(n log n)
  - Sum baseline (technique2): O(n)
  - Add top k benefits: O(k)
  - Add remaining positive benefits: O(n-k)
  - Dominated by sorting: O(n log n)

- Space complexity: $$O(n)$$
  - Benefits array: O(n)
  - Sorting may use O(log n) stack space
  - Total: O(n)

# Code
```typescript
const maxPoints = (technique1: number[], technique2: number[], k: number): number => {
    const n = technique1.length;
    const benefits = technique1.map((val, i) => val - technique2[i]);
    benefits.sort((a, b) => b - a);
    
    let total = technique2.reduce((sum, val) => sum + val, 0);
    
    for (let i = 0; i < k; i++) {
        total += benefits[i];
    }
    
    for (let i = k; i < n; i++) {
        if (benefits[i] > 0) {
            total += benefits[i];
        } else {
            break;
        }
    }
    
    return total;
};
```