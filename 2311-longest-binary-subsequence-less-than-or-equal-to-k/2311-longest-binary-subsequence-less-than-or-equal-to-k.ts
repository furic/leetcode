const longestSubsequence = (s: string, k: number): number => {
    let sum = 0;
    let count = 0;
    const maxBits = Math.floor(Math.log2(k)) + 1;

    for (let i = 0; i < s.length; i++) {
        const ch = s[s.length - 1 - i]; // iterate from right to left

        if (ch === '1') {
            // Only include '1' if its bit position doesn't make the total exceed k
            if (i < maxBits && sum + (1 << i) <= k) {
                sum += 1 << i;
                count++;
            }
        } else {
            // Always safe to include '0'
            count++;
        }
    }

    return count;
};