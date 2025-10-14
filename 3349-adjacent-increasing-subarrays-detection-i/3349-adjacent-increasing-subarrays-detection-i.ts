const hasIncreasingSubarrays = (nums: number[], k: number): boolean => {
    // Edge case: k=1 means any two adjacent elements work
    if (k === 1) {
        return true;
    }

    const validIncreasingSegments: number[][] = [];
    let segmentStartIndex = 0;

    for (let currentIndex = 1; currentIndex <= nums.length; currentIndex++) {
        const currentValue = nums[currentIndex] ?? -Infinity;
        const previousValue = nums[currentIndex - 1];
        const isStillIncreasing = currentValue > previousValue;

        if (isStillIncreasing) {
            continue;
        }

        // Found end of increasing segment
        const segmentLength = currentIndex - segmentStartIndex;

        // Case 1: Single segment contains both k-length subarrays
        if (segmentLength >= 2 * k) {
            return true;
        }

        // Skip single elements (not a valid segment)
        if (segmentStartIndex === currentIndex - 1) {
            segmentStartIndex = currentIndex;
            continue;
        }

        // Case 2: Check if current segment is adjacent to a previous valid segment
        if (validIncreasingSegments.length > 0) {
            const previousSegment = validIncreasingSegments.at(-1)!;
            const previousSegmentEnd = previousSegment[1];
            const segmentsAreAdjacent = previousSegmentEnd === segmentStartIndex - 1;

            if (segmentsAreAdjacent && segmentLength >= k) {
                return true;
            }
        }

        // Store this segment if it's long enough to be useful
        if (segmentLength >= k) {
            validIncreasingSegments.push([segmentStartIndex, currentIndex - 1]);
        }

        segmentStartIndex = currentIndex;
    }

    return false;
};