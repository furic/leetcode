const isPalindrome = (x: number): boolean => {
    const s = x.toString().split('');
    const n = s.length;
    for (let i = 0; i < n / 2; i++) {
        if (s[i] !== s[n - i - 1]) return false;
    }
    return true;
};