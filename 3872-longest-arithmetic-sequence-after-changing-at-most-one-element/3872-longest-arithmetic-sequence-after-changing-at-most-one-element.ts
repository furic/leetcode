const longestArithmetic = (nums: number[]): number => {
    const n = nums.length;
    let maxLength = 3;

    // Scans left-to-right: extends arithmetic runs and tries one replacement at each break point.
    // Running reversed handles the case where the replacement is at the run's left edge.
    const scan = () => {
        for (let start = 1; start < n; ) {
            const diff = nums[start] - nums[start - 1];

            // Extend the run as far as the common difference holds
            let runEnd = start + 1;
            while (runEnd < n && nums[runEnd] - nums[runEnd - 1] === diff) runEnd++;

            maxLength = Math.max(maxLength, runEnd - (start - 1));

            // Try replacing nums[runEnd] to continue the same run
            if (runEnd < n) {
                const savedValue = nums[runEnd];
                nums[runEnd] = nums[runEnd - 1] + diff;

                const replacedIdx = runEnd;
                runEnd++;
                while (runEnd < n && nums[runEnd] - nums[runEnd - 1] === diff) runEnd++;

                maxLength = Math.max(maxLength, runEnd - (start - 1));
                nums[replacedIdx] = savedValue; // Restore before continuing
                runEnd = replacedIdx;
            }

            start = runEnd;
        }
    };

    scan();
    nums.reverse();
    scan();
    nums.reverse(); // Restore original order

    return maxLength;
};