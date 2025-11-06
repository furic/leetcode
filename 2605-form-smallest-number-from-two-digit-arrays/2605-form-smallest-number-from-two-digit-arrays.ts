const minNumber = (nums1: number[], nums2: number[]): number => {
    // Convert to sets for O(1) lookup
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    
    // Find common digits (if any exist, smallest is the answer)
    const commonDigits: number[] = [];
    for (const digit of set1) {
        if (set2.has(digit)) {
            commonDigits.push(digit);
        }
    }
    
    // If common digit exists, return the smallest one
    if (commonDigits.length > 0) {
        return Math.min(...commonDigits);
    }
    
    // No common digits - need to form 2-digit number
    // Format: min(nums1) + min(nums2) or min(nums2) + min(nums1)
    const minDigit1 = Math.min(...nums1);
    const minDigit2 = Math.min(...nums2);
    
    // Form smallest 2-digit number by putting smaller digit first
    if (minDigit1 < minDigit2) {
        return minDigit1 * 10 + minDigit2;
    } else {
        return minDigit2 * 10 + minDigit1;
    }
};