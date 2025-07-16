const maximumLength = (nums: number[]): number => {
    const evens = nums.map((n) => n % 2 === 0);
    const oddCount = evens.filter((even) => even).length;
    const evenCount = evens.filter((even) => !even).length;
    let alterCount = 1;
    let lastEven = evens[0];
    for (let i = 1; i < evens.length; i++) {
        if (evens[i] !== lastEven) {
            lastEven = evens[i];
            alterCount++;
        }
    }
    return Math.max(oddCount, evenCount, alterCount);
};