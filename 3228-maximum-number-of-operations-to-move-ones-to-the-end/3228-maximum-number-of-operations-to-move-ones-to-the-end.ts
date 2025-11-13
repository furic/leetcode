const maxOperations = (s: string): number => {
    let onesCount = 0;
    let totalOperations = 0;
    let index = 0;

    while (index < s.length) {
        if (s[index] === '0') {
            // Skip consecutive zeros - they form a single "gap"
            // All 1's to the left will need to move past this entire gap
            while (index + 1 < s.length && s[index + 1] === '0') {
                index++;
            }
            
            // Each 1 encountered so far needs to move past this gap
            totalOperations += onesCount;
        } else {
            // Found a 1, increment count
            onesCount++;
        }
        
        index++;
    }

    return totalOperations;
};