# Cumulative Sum with Binary Search | 25 Lines | O(n log n) | 92ms

# Intuition
Instead of computing score(j) for each starting position separately, we can count how many times each room contributes a point across all starting positions. For each room i, we find which starting positions j (where j ≤ i) allow us to earn a point at room i.

# Approach
- **Problem Reframing**:
  - Total score = sum over all rooms i of: (count of valid starting positions for room i)
  - Room i contributes to score(j) if we start at j ≤ i and have enough health at room i

- **Health Calculation**:
  - Starting from room j with initial health hp
  - Damage taken reaching room i: damage[j] + damage[j+1] + ... + damage[i]
  - Remaining health at room i: hp - (damage[j] + ... + damage[i])
  - Earn point if: remaining health ≥ requirement[i]

- **Using Cumulative Sums**:
  - Define cumDamage[i] = sum of damage[0..i-1]
  - Damage from room j to i: cumDamage[i+1] - cumDamage[j]
  - Remaining health: hp - (cumDamage[i+1] - cumDamage[j])
  - Condition: hp - cumDamage[i+1] + cumDamage[j] ≥ requirement[i]
  - Rearrange: cumDamage[j] ≥ cumDamage[i+1] + requirement[i] - hp

- **Finding Valid Starting Positions**:
  - For room i, need cumDamage[j] ≥ threshold where threshold = cumDamage[i+1] + requirement[i] - hp
  - Since cumDamage is non-decreasing, binary search for first valid j
  - Valid positions: j from firstValid to i (inclusive)

- **Binary Search Details**:
  - Search range: [0, i] (can only start at or before room i)
  - Find leftmost j where cumDamage[j] ≥ threshold
  - Count valid positions: i - firstValid + 1

- **Example Walkthrough** (hp=11, damage=[3,6,7], requirement=[4,2,5]):
  - cumDamage = [0, 3, 9, 16]
  - Room 0 (i=0): threshold = 3+4-11 = -4, firstValid=0, count=1
  - Room 1 (i=1): threshold = 9+2-11 = 0, firstValid=0, count=2
  - Room 2 (i=2): threshold = 16+5-11 = 10, no valid positions (all cumDamage < 10)
  - Total: 1 + 2 + 0 = 3 ✓

- **Edge Cases Handled**:
  - High damage rooms: threshold may be > all cumDamage values
  - Negative thresholds: all starting positions valid
  - Starting from last room: only considers that single room

# Complexity
- Time complexity: $$O(n \log n)$$
  - Build cumulative sum: O(n)
  - For each of n rooms: binary search over at most n positions: O(log n)
  - Total: O(n log n)

- Space complexity: $$O(n)$$
  - Cumulative damage array: O(n)
  - Binary search uses O(1) extra space
  - Total: O(n)

# Code
```typescript
const totalScore = (hp: number, damage: number[], requirement: number[]): number => {
    const n = damage.length;
    const cumDamage = new Array(n + 1);
    cumDamage[0] = 0;
    for (let i = 0; i < n; i++) {
        cumDamage[i + 1] = cumDamage[i] + damage[i];
    }
    
    let totalScore = 0;
    
    for (let i = 0; i < n; i++) {
        const threshold = cumDamage[i + 1] + requirement[i] - hp;
        let left = 0, right = i;
        let firstValid = i + 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (cumDamage[mid] >= threshold) {
                firstValid = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (firstValid <= i) {
            totalScore += i - firstValid + 1;
        }
    }
    
    return totalScore;
};
```