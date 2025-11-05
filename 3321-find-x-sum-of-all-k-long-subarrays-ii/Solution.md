# Dual Set with Red-Black Tree | 450 Lines | O(n log k) | 588ms

# Intuition
The naive approach of processing each window independently requires O(n × k log k) time due to repeated sorting. We can optimize by maintaining a sliding window with two ordered sets: one tracking the top x most frequent elements (for quick x-sum calculation) and another tracking remaining elements. As the window slides, we incrementally update these sets rather than recomputing from scratch.

# Approach
**Sliding Window with Dual Ordered Sets:**
- Maintain two red-black tree-based ordered sets sorted by (frequency, value)
- `topXElements`: stores exactly x most frequent elements
- `remainingElements`: stores all other elements
- Track `topXSum` incrementally for O(1) answer queries
- As window slides, add/remove elements and rebalance sets

**Step-by-Step Process:**

1. **Data Structures:**
   - `frequencyMap`: tracks current frequency of each value
   - `topXElements`: ordered set of top x elements by (freq, value)
   - `remainingElements`: ordered set of non-top elements
   - `topXSum`: running sum of value × frequency for top x elements

2. **Red-Black Tree Implementation:**
   - Self-balancing BST for O(log n) insert/delete/min/max
   - Custom comparator: sort by frequency desc, then value desc
   - Maintains order for efficient min/max queries

3. **Add Element to Window:**
   - Get current frequency from map
   - If element exists, remove old (value, freq) pair from whichever set contains it
   - Increment frequency, insert new (value, freq+1) pair into `remainingElements`
   - Call `rebalance()` to maintain top x invariant

4. **Remove Element from Window:**
   - Get current frequency from map
   - Remove (value, freq) pair from whichever set contains it
   - If frequency > 1, insert (value, freq-1) into `remainingElements`
   - Otherwise, remove from frequency map entirely
   - Call `rebalance()` to maintain top x invariant

5. **Rebalance Operation:**
   **Phase 1 - Remove excess from top:**
   - While `topXElements.size > x`: move minimum element to remaining

   **Phase 2 - Fill top if undersized:**
   - While `topXElements.size < x` and `remainingElements` not empty:
     - Move maximum element from remaining to top

   **Phase 3 - Swap if better candidates exist:**
   - While minimum in top < maximum in remaining (by comparator):
     - Swap them
     - Update `topXSum` accordingly
   - This ensures top x contains the x best elements

6. **Sliding Window Processing:**
   - Add `nums[i]` to window
   - If `i >= k`, remove `nums[i-k]` from window (slide left boundary)
   - If `i >= k-1`, record `topXSum` as result

7. **Return Results:**
   - Array of x-sums for all windows

**Why This Works:**

**Incremental Updates:**
- Frequency changes are localized to one element at a time
- O(log k) to remove/insert in ordered sets
- Rebalance maintains O(x) comparisons and O(x log k) swaps worst case

**Top X Invariant:**
- After rebalance, `topXElements` contains exactly the x elements that rank highest by (frequency, value)
- `topXSum` accurately reflects sum of these elements' contributions

**Red-Black Tree Properties:**
- Guaranteed O(log n) height
- Min/max queries in O(log n)
- Self-balancing maintains efficiency

**Example Walkthrough (nums = [1,1,2,2,3,4,2,3], k = 6, x = 2):**

**Initial window [1,1,2,2,3,4]:**
- Add elements one by one, maintaining sets
- After all additions: frequencies {1:2, 2:2, 3:1, 4:1}
- Rebalance determines top 2: (2,2) and (1,2)
- topXSum = 2×2 + 1×2 = 6 ✓

**Slide to [1,2,2,3,4,2]:**
- Remove 1: frequency 2→1
- Add 2: frequency 2→3
- Rebalance: top 2 becomes (2,3) and (4,1)
- topXSum = 2×3 + 4×1 = 10 ✓

**Key Insights:**

**Why Two Sets:**
- Separate top x from others for efficient min/max queries
- Rebalance swaps elements between sets as needed
- Maintains invariant without full re-sorting

**Comparator Design:**
- Primary: frequency descending (most frequent first)
- Secondary: value descending (tie-breaker)
- Matches problem's "more frequent" definition exactly

**Rebalance Phases:**
- Phase 1 & 2: ensure size = x
- Phase 3: ensure quality (best x elements)
- Together maintain correctness

**Complexity Analysis:**

**Per Window Transition:**
- Add/remove element: O(log k) for set operations
- Rebalance: O(x log k) worst case (x swaps, each O(log k))
- Since x ≤ k, amortized O(log k) per element

**Total:**
- n windows × O(log k) per transition = O(n log k)
- Massive improvement over O(n k log k) naive approach

**Edge Cases:**

**Distinct elements < x:**
- `topXElements` never fills to x
- `topXSum` = sum of all elements in window

**All same frequency:**
- Tiebreaker (value desc) determines top x
- Larger values preferred

**x = k:**
- All elements in top x
- topXSum = window sum

**Single element repeated:**
- Only one distinct element
- Always in top x

**Large k, small x:**
- Most elements in `remainingElements`
- Frequent rebalancing needed

# Complexity
- Time complexity: $$O(n \log k)$$ where n is array length and k is window size - each element added/removed once with O(log k) set operations
- Space complexity: $$O(k)$$ for the two ordered sets storing window elements

# Code
```typescript
const findXSum = (nums: number[], k: number, x: number): number[] => {
    const frequencyMap = new Map<number, number>();
    const topXElements = new OrderedSet();
    const remainingElements = new OrderedSet();
    let topXSum = 0;
    const result: number[] = [];

    const rebalance = (): void => {
        while (topXElements.size > x) {
            const minElement = topXElements.getMin();
            if (!minElement) break;
            const [value, frequency] = minElement;
            topXElements.delete(value, frequency);
            topXSum -= value * frequency;
            remainingElements.insert(value, frequency);
        }

        while (topXElements.size < x && remainingElements.size > 0) {
            const maxElement = remainingElements.getMax();
            if (!maxElement) break;
            const [value, frequency] = maxElement;
            remainingElements.delete(value, frequency);
            topXElements.insert(value, frequency);
            topXSum += value * frequency;
        }

        while (topXElements.size > 0 && remainingElements.size > 0) {
            const minInTop = topXElements.getMin()!;
            const maxInRemaining = remainingElements.getMax()!;
            
            if (OrderedSet.compare(maxInRemaining, minInTop) > 0) {
                topXElements.delete(minInTop[0], minInTop[1]);
                remainingElements.delete(maxInRemaining[0], maxInRemaining[1]);
                
                topXSum -= minInTop[0] * minInTop[1];
                topXSum += maxInRemaining[0] * maxInRemaining[1];
                
                topXElements.insert(maxInRemaining[0], maxInRemaining[1]);
                remainingElements.insert(minInTop[0], minInTop[1]);
            } else {
                break;
            }
        }
    };

    const addElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value) ?? 0;
        
        if (currentFrequency > 0) {
            if (!remainingElements.delete(value, currentFrequency)) {
                if (topXElements.delete(value, currentFrequency)) {
                    topXSum -= value * currentFrequency;
                }
            }
        }
        
        const newFrequency = currentFrequency + 1;
        frequencyMap.set(value, newFrequency);
        remainingElements.insert(value, newFrequency);
        rebalance();
    };

    const removeElement = (value: number): void => {
        const currentFrequency = frequencyMap.get(value)!;
        
        if (!remainingElements.delete(value, currentFrequency)) {
            if (topXElements.delete(value, currentFrequency)) {
                topXSum -= value * currentFrequency;
            }
        }
        
        if (currentFrequency - 1 > 0) {
            frequencyMap.set(value, currentFrequency - 1);
            remainingElements.insert(value, currentFrequency - 1);
        } else {
            frequencyMap.delete(value);
        }
        
        rebalance();
    };

    for (let index = 0; index < nums.length; index++) {
        addElement(nums[index]);
        
        if (index >= k) {
            removeElement(nums[index - k]);
        }
        
        if (index >= k - 1) {
            result.push(topXSum);
        }
    }

    return result;
};

// [Red-Black Tree and OrderedSet implementation as provided in document]
```