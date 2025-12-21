# Character Cost Aggregation | 7 Lines | O(n log k) | 15ms

# Intuition

To make the string consist of equal characters, we must keep all occurrences of exactly one character and delete everything else. The key insight is that to minimize deletion cost, we should keep the character whose occurrences have the maximum total cost. This way, we delete the least valuable characters in terms of cost.

# Approach

**Core Strategy:**
- Aggregate the costs of all occurrences of each character
- Keep the character with the highest total cost (delete nothing of this character)
- Delete all occurrences of every other character
- The minimum deletion cost equals the sum of costs of all characters except the one with maximum total cost

**Step-by-Step Process:**

**1. Aggregate Costs by Character:**
- Create a map where each unique character maps to the sum of all its occurrence costs
- Iterate through the string with index i from 0 to n-1
- For each position i, add cost[i] to the running total for character s[i]
- Formula: `totalCost[char] = sum of cost[i] for all i where s[i] == char`
- This gives us the total cost associated with each unique character

**2. Extract and Sort Character Totals:**
- Convert the map values (character total costs) to an array
- Sort this array in descending order (highest total cost first)
- The first element represents the most "valuable" character to keep
- Remaining elements represent characters that should be deleted entirely

**3. Calculate Minimum Deletion Cost:**
- The optimal character to keep is the one with the maximum total cost (first element after sorting)
- All other characters must be deleted completely
- Use slice(1) to get all elements except the first (characters to delete)
- Sum these remaining costs using reduce
- This sum represents the minimum total deletion cost

**Why This Greedy Approach is Optimal:**

**Mathematical Justification:**
- Total cost of all characters = T
- If we keep character X with total cost C_X, deletion cost = T - C_X
- To minimize (T - C_X), we must maximize C_X
- Therefore, keep the character with maximum total cost

**Proof of Correctness:**
- We must end with exactly one character type (problem requirement)
- For each character type, deleting all others has a fixed cost
- Character with highest total cost gives the smallest deletion cost
- This is a greedy choice that leads to global optimum

**Example Walkthrough (s = "aabaac", cost = [1,2,3,4,1,10]):**

Character cost aggregation:
- 'a' appears at indices 0,1,3,4 with costs 1,2,4,1 → total = 8
- 'b' appears at index 2 with cost 3 → total = 3
- 'c' appears at index 5 with cost 10 → total = 10

Sorted totals (descending): [10, 8, 3]

Decision:
- Keep 'c' (total cost 10, highest)
- Delete all 'a's (total cost 8)
- Delete all 'b's (total cost 3)
- Minimum deletion cost = 8 + 3 = 11 ✓

**Example Walkthrough (s = "abc", cost = [10,5,8]):**
- 'a': 10, 'b': 5, 'c': 8
- Sorted: [10, 8, 5]
- Keep 'a', delete 'b' and 'c'
- Cost: 8 + 5 = 13 ✓

**Example Walkthrough (s = "zzzzz", cost = [67,67,67,67,67]):**
- Only one character 'z': total = 335
- Sorted: [335]
- Keep 'z' (already all same character)
- No other characters to delete
- Cost: 0 ✓

**Edge Cases Handled:**
- All characters already equal: No deletion needed, cost = 0
- Only one character type: Automatically handled, slice(1) returns empty array
- All unique characters: Must delete all but one, chooses highest cost to keep
- Empty reduce: Returns 0 (initial value)

# Complexity

- Time complexity: $$O(n + k \log k)$$
  - n = length of string s
  - k = number of unique characters (at most 26 for lowercase, or alphabet size)
  - Building the map: O(n) to iterate through all characters
  - Sorting k character totals: O(k log k)
  - Summing costs: O(k)
  - Overall: O(n + k log k)
  - Since k ≤ n and k is bounded by alphabet size, this simplifies to O(n) for practical purposes

- Space complexity: $$O(k)$$
  - Map stores at most k unique characters and their totals: O(k)
  - Array of costs: O(k)
  - k ≤ n, bounded by alphabet size (typically 26)
  - All other variables: O(1)
  - Overall: O(k)

# Code
```typescript []
const minCost = (s: string, cost: number[]): number => {
    const map = new Map<string, number>();
    for (let i = 0; i < cost.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + cost[i]);
    }
    const costs = Array.from(map.values()).sort((a, b) => b - a);
    return costs.slice(1).reduce((a, b) => a + b, 0);
};
```