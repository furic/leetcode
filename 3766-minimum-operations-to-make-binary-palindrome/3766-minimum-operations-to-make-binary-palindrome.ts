const minOperations = (nums: number[]): number[] => {
    const isBinaryPalindrome = (n: number): boolean => {
        const binary = n.toString(2);
        return binary === binary.split('').reverse().join('');
    };
    
    const findMinOps = (num: number): number => {
        if (isBinaryPalindrome(num)) return 0;
        
        let dist = 1;
        while (true) {
            // Check lower neighbor (if valid)
            if (num - dist > 0 && isBinaryPalindrome(num - dist)) {
                return dist;
            }
            // Check upper neighbor
            if (isBinaryPalindrome(num + dist)) {
                return dist;
            }
            dist++;
        }
    };
    
    return nums.map(findMinOps);
};