const longestPalindrome = (s: string, t: string): number => {
    const isPalindrome = (str: string) => str === str.split('').reverse().join('');

    let maxLength = 1; // At least a single character can always be a palindrome

    for (let i = 0; i <= s.length; i++) {
        for (let j = i; j <= s.length; j++) {
            let subS = s.slice(i, j);
            for (let x = 0; x <= t.length; x++) {
                for (let y = x; y <= t.length; y++) {
                    let subT = t.slice(x, y);
                    let combined = subS + subT;
                    if (isPalindrome(combined)) {
                        maxLength = Math.max(maxLength, combined.length);
                    }
                }
            }
        }
    }

    return maxLength;
};