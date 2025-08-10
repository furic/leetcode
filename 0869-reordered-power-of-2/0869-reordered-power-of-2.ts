const reorderedPowerOf2 = (n: number): boolean => {
    const countDigits = x => x.toString().split('').sort().join('');
    const target = countDigits(n);
    const limit = 1e9;
    for (let i = 0; i < 31; i++) {
        if (countDigits(1 << i) === target) return true;
    }
    return false;
};