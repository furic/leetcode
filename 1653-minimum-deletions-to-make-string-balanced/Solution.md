# Greedy DP with B-Count Tracking | 13 Lines | O(n) | 16ms

# Intuition

For a balanced string, all 'a's must come before all 'b's. When we encounter an 'a', we have two choices: delete all previous 'b's, or delete this 'a'. Track minimum deletions greedily.

# Approach

**DP State:**
- `minDeletions` = min deletions to balance string up to current position
- `bsSeenCount` = count of 'b's seen so far

**Transitions:**
- **See 'b'**: Increment bsSeenCount (might delete later if 'a's follow)
- **See 'a'**: Two choices:
  1. Delete all previous 'b's → cost = bsSeenCount
  2. Delete this 'a' → cost = minDeletions + 1
  - Take minimum

**Why This Works:**
- At each 'a', we decide whether it's cheaper to "fix" previous violations (delete b's) or avoid creating violations (delete this a)
- Greedy choice is optimal because we only care about total deletions

**Example: s="aababbab"**

Process:
- i=0,'a': minDel=min(0,0+1)=0, bCount=0
- i=1,'a': minDel=min(0,0+1)=0, bCount=0
- i=2,'b': bCount=1
- i=3,'a': minDel=min(1,0+1)=1, bCount=1
- i=4,'b': bCount=2
- i=5,'b': bCount=3
- i=6,'a': minDel=min(3,1+1)=2, bCount=3
- i=7,'b': bCount=4

Result: 2 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass through string
  - Constant work per character
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only two variables
  - No additional data structures

# Code
```typescript []
const minimumDeletions = (s: string): number => {
    let bsSeenCount = 0;
    let minDeletions = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            minDeletions = Math.min(bsSeenCount, minDeletions + 1);
        } else {
            bsSeenCount++;
        }
    }

    return minDeletions;
};
```