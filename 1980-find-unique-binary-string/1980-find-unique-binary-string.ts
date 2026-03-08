// Cantor's diagonal: flip the i-th bit of the i-th string,
// guaranteeing the result differs from every string in nums at least at position i
const findDifferentBinaryString = (nums: string[]): string =>
    nums.map((str, i) => str[i] === '0' ? '1' : '0').join('');