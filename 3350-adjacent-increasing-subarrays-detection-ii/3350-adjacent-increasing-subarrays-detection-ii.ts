const maxIncreasingSubarrays = (nums: number[]): number => {
    let currentSegmentLength = 1;
    let previousSegmentLength = 0;
    let maxSubarrayLength = 0;

    for (let index = 1; index < nums.length; index++) {
        if (nums[index] > nums[index - 1]) {
            // Continue current increasing segment
            currentSegmentLength++;
        } else {
            // Current segment breaks, start new segment
            previousSegmentLength = currentSegmentLength;
            currentSegmentLength = 1;
        }

        // Two ways to have adjacent k-length increasing subarrays:
        // 1. Use tail of previous segment and head of current segment
        const adjacentSegmentsLength = Math.min(previousSegmentLength, currentSegmentLength);
        
        // 2. Split current segment into two equal halves
        const halfCurrentSegmentLength = Math.floor(currentSegmentLength / 2);

        maxSubarrayLength = Math.max(
            maxSubarrayLength,
            adjacentSegmentsLength,
            halfCurrentSegmentLength
        );
    }

    return maxSubarrayLength;
};