const kMirror = (k: number, n: number): number => {
    let totalSum = 0;
    let count = n;

    // Create a base-10 palindrome from a half part (odd/even flag)
    const createPalindrome = (half: number, isOdd: boolean): number => {
        let result = half;
        let x = isOdd ? Math.floor(half / 10) : half;

        while (x > 0) {
            result = result * 10 + (x % 10);
            x = Math.floor(x / 10);
        }
        return result;
    };

    // Check if a number is a palindrome in base-k
    const isKBasePalindrome = (num: number, base: number): boolean => {
        const digits: number[] = [];
        while (num > 0) {
            digits.push(num % base);
            num = Math.floor(num / base);
        }

        for (let i = 0, j = digits.length - 1; i < j; i++, j--) {
            if (digits[i] !== digits[j]) return false;
        }
        return true;
    };

    // Try increasing half-lengths to generate full palindromes
    for (let len = 1; count > 0; len *= 10) {
        for (let i = len; i < len * 10 && count > 0; i++) {
            const p = createPalindrome(i, true);
            if (isKBasePalindrome(p, k)) {
                totalSum += p;
                count--;
            }
        }

        for (let i = len; i < len * 10 && count > 0; i++) {
            const p = createPalindrome(i, false);
            if (isKBasePalindrome(p, k)) {
                totalSum += p;
                count--;
            }
        }
    }

    return totalSum;
};