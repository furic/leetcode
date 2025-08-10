const reorderedPowerOf2 = (n: number): boolean => {
    const countDigits = x => x.toString().split('').sort().join('');
    const target = countDigits(n);
    const limit = 1e9;
    let i = 1;
    while (i <= limit) {
        if (countDigits(i) === target) return true;
        i <<= 1;
    }
    return false;
};