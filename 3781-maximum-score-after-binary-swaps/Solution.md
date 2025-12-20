# Greedy Max Heap | 9 Lines | O(n log n) | 119ms

# Intuition

The key insight is that any '1' can be moved leftward to any position before it by swapping with '0's. This means each '1' at position i can occupy any position from 0 to i. To maximize the score, we should greedily place each '1' at the position with the highest value among all positions it can reach. A max heap allows us to efficiently track and select the best available position for each '1' as we scan left to right.

# Approach

**Core Strategy:**
- Process the array from left to right
- Track all available positions (values) using a max heap
- When encountering a '1', assign it to the best available position (maximum value)
- This greedy approach ensures each '1' is optimally placed

**Step-by-Step Process:**

**1. Initialize Data Structures:**
- Create a max priority queue (max heap) to store values from `nums`
- Initialize sum to 0 to accumulate the maximum score
- The max heap will help us efficiently find the largest value among available positions

**2. Process Each Position Left to Right:**
- Iterate through indices 0 to n-1
- At each index i, we consider two things:
  - The value nums[i] becomes available as a potential position
  - Whether there's a '1' at this position that needs placement

**3. Add Current Value to Available Positions:**
- Push nums[i] into the max heap
- This represents that position i is now available for any '1' we encounter at position i or later
- Rationale: Any '1' at position j ≥ i can move left to position i

**4. Handle '1' Characters:**
- When s[i] = '1', we have one '1' that can be placed anywhere from position 0 to i
- To maximize score, place it at the position with the highest value
- Pop the maximum value from the heap (largest nums[j] where j ≤ i)
- Add this maximum value to our sum
- This greedy choice is optimal because we want the highest possible contribution

**5. Why This Greedy Approach Works:**
- A '1' at position i can move to any position j where j < i
- We cannot move a '1' to the right, only left
- By processing left to right and always choosing the best available position, we ensure:
  - Each '1' gets the maximum possible value from its reachable positions
  - Earlier '1's don't "steal" positions from later '1's (because we process in order)
  - The heap naturally maintains the best available choices

**6. Return the Maximum Score:**
- After processing all positions, sum contains the maximum achievable score
- Each '1' has been optimally placed at the highest-value position it could reach

**Example Walkthrough (nums = [2,1,5,2,3], s = "01010"):**
- i=0: heap=[2], s[0]='0' → no action, sum=0
- i=1: heap=[2,1], s[1]='1' → pop max=2, sum=2
  - The first '1' is placed at position 0 (value 2, the best it can reach)
- i=2: heap=[1,5], s[2]='0' → no action, sum=2
- i=3: heap=[1,5,2], s[3]='1' → pop max=5, sum=7
  - The second '1' is placed at position 2 (value 5, the best it can reach)
- i=4: heap=[1,2,3], s[4]='0' → no action, sum=7
- Final positions: '1's at indices 0 and 2, contributing 2+5=7 ✓

**Why Max Heap is Crucial:**
- Without heap: We'd need O(n) time to find maximum among available positions for each '1'
- With max heap: O(log n) insertion and O(log n) extraction
- Total time: O(n log n) instead of O(n²)

**Correctness Proof:**
- Exchange argument: If we place '1' at a non-maximum position when maximum is available, we can always swap to get better score
- Greedy stays ahead: Each choice leaves us with the best possible state for future decisions
- No future '1' is harmed: Later '1's still have access to all positions to their right

# Complexity

- Time complexity: $$O(n \log n)$$
  - Loop through n positions: O(n)
  - For each position, push to heap: O(log n)
  - For each '1' encountered, pop from heap: O(log n)
  - Total heap operations: at most 2n (n pushes, at most n pops)
  - Overall: O(n log n)

- Space complexity: $$O(n)$$
  - Max heap stores at most n values
  - In worst case (all '0's in s), heap grows to size n
  - Best case (all '1's in s): heap never exceeds size 1
  - Additional variables: O(1)
  - Overall: O(n) for the heap storage

# Code
```typescript []
const maximumScore = (nums: number[], s: string): number => {
    const banterisol = nums;
    const maxHeap = new MaxPriorityQueue<number>();
    let sum = 0;
    
    for (let i = 0; i < banterisol.length; i++) {
        maxHeap.push(banterisol[i]);
        if (s[i] === '1') {
            sum += maxHeap.pop();
        }
    }
    return sum;
};
```