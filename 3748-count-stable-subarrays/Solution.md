# Prefix Sum with Inversion Tracking | 55 Lines | O(n + q) | 67ms

# Intuition
A stable subarray contains no inversions, meaning it must be non-decreasing. The challenge is answering multiple range queries efficiently. Rather than recalculating for each query, we can precompute two key pieces of information: where inversions occur and cumulative counts of stable subarrays, allowing us to answer each query in constant time.

# Approach
The solution operates in two distinct phases: preprocessing the array to build auxiliary data structures, then using these structures to answer queries efficiently.

**Phase 1: Understanding Stable Subarray Counting**

Before diving into the implementation, let's understand the fundamental counting principle. For any contiguous sequence of length n with no inversions (a non-decreasing sequence), the total number of subarrays it contains equals n×(n+1)/2. This formula comes from the fact that we can choose any starting position (n choices) and any ending position after it, giving us 1+2+3+...+n subarrays total. For example, the sequence [1,2,3] has length 3, yielding 3×4/2 = 6 subarrays: [1], [2], [3], [1,2], [2,3], and [1,2,3].

**Phase 2: Building the Cumulative Stable Count Array**

The first preprocessing step creates stableCountUpTo, which stores at each position i the total count of all stable subarrays ending at or before that position. We build this by tracking consecutive non-decreasing streaks. When we encounter nums[i] >= nums[i-1], our current streak continues and we can form one more stable subarray ending at position i for each possible starting point in the current streak. When we hit an inversion where nums[i] < nums[i-1], the streak breaks and we restart counting from 1.

The crucial insight here is that at each position, the number of new stable subarrays we can form equals the current streak length. For instance, if we have a streak of length 3 ending at position i, we can form subarrays starting at position i-2, i-1, and i itself, all ending at i. By maintaining a cumulative sum of these streak lengths, we get a prefix sum structure that lets us quickly calculate the total count of stable subarrays in any suffix of the array.

**Phase 3: Tracking Inversion Locations**

The second preprocessing step builds firstInversionAfter, which tells us for each position i, where the next inversion occurs. An inversion at position j means nums[j] < nums[j-1]. We build this array from right to left because each position needs to know about inversions to its right. If there's an immediate inversion after position i, we record it. Otherwise, we inherit the inversion location from the next position. This creates a "skip list" that lets us jump directly to where a stable sequence breaks.

**Phase 4: Answering Queries Using the Preprocessed Data**

For each query [left, right], we first check where the first inversion occurs within this range using firstInversionAfter[left]. This gives us the "break point" where the non-decreasing property first fails.

If the break point lies beyond our query range (breakPoint > right), then the entire query range is stable with no inversions. In this case, we simply apply our n×(n+1)/2 formula where n is the query range length.

The more interesting case occurs when an inversion exists within our query range. Here we split our counting into two parts. The first part covers everything before the inversion from [left, breakPoint-1]. This prefix is guaranteed to be stable, so we can again use the n×(n+1)/2 formula for its length. The second part handles everything from the break point onward [breakPoint, right]. Rather than recalculating, we leverage our precomputed prefix sums: stableCountUpTo[right] - stableCountUpTo[breakPoint-1] gives us exactly the count of stable subarrays in this suffix that start at or after the break point.

The beauty of this split approach is that it correctly handles the fact that no subarray can span across an inversion. By counting stable subarrays before the inversion and after the inversion separately, we naturally avoid counting any invalid subarrays that would include the inversion point.

**Example Walkthrough** (nums=[3,1,2], query=[0,2]):

Starting with our preprocessing, we track streaks: position 0 has a streak of 1 (just [3]), position 1 also has streak 1 (the sequence breaks since 1 < 3), and position 2 has streak 2 (continuing with [1,2]). Our stableCountUpTo becomes [1, 2, 4], representing cumulative totals. For inversions, we identify that position 0 has its first inversion at index 1 (since 1 < 3), while positions 1 and 2 have no further inversions within the array.

When we process the query [0,2], we find the first inversion after position 0 is at index 1, which is within our range. We split: the prefix [3] contributes 1 stable subarray. For the suffix starting at the break point, we calculate stableCountUpTo[2] - stableCountUpTo[0] = 4 - 1 = 3, representing the subarrays [1], [2], and [1,2]. The total is 1 + 3 = 4 stable subarrays.

# Complexity
- Time complexity: $$O(n + q)$$

The preprocessing phase requires two linear passes through the array. Building the stableCountUpTo array takes O(n) time as we examine each element once while maintaining the running streak length. Constructing the firstInversionAfter array also takes O(n) time with a single backward pass. Each query is then answered in O(1) time using array lookups and simple arithmetic, giving us O(q) for all queries combined. The total time complexity is therefore O(n + q), which is optimal since we must at least read the input.

- Space complexity: $$O(n)$$

We maintain two auxiliary arrays, stableCountUpTo and firstInversionAfter, each with n elements, contributing O(n) space. The output array containing q results adds O(q) space, but since this is required output rather than auxiliary space, the auxiliary space complexity is O(n). All other variables use constant space.

# Code
```typescript
const countStableSubarrays = (nums: number[], queries: number[][]): number[] => {
    const arrayLength = nums.length;
    const numQueries = queries.length;

    const stableCountUpTo: number[] = new Array(arrayLength);
    stableCountUpTo[0] = 1;

    let currentStreakLength = 1;
    for (let i = 1; i < arrayLength; i++) {
        if (nums[i] >= nums[i - 1]) {
            currentStreakLength++;
        } else {
            currentStreakLength = 1;
        }
        stableCountUpTo[i] = stableCountUpTo[i - 1] + currentStreakLength;
    }

    const firstInversionAfter: number[] = new Array(arrayLength);
    firstInversionAfter[arrayLength - 1] = arrayLength;

    for (let i = arrayLength - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) {
            firstInversionAfter[i] = i + 1;
        } else {
            firstInversionAfter[i] = firstInversionAfter[i + 1];
        }
    }

    const results: number[] = new Array(numQueries);
    for (let i = 0; i < numQueries; i++) {
        const [left, right] = queries[i];
        const breakPoint = firstInversionAfter[left];
        
        if (breakPoint > right) {
            const rangeLength = right - left + 1;
            results[i] = (rangeLength * (rangeLength + 1)) / 2;
        } else {
            const lengthBeforeBreak = breakPoint - left;
            const countBeforeBreak = (lengthBeforeBreak * (lengthBeforeBreak + 1)) / 2;
            const countAfterBreak = stableCountUpTo[right] - stableCountUpTo[breakPoint - 1];
            results[i] = countBeforeBreak + countAfterBreak;
        }
    }

    return results;
};
```