const threeConsecutiveOdds = (arr: number[]): boolean => {
    let oddCount = 0;
    for (let num of arr) {
        oddCount = num % 2 === 0 ? 0 : oddCount + 1;
        if (oddCount === 3) return true;
    }
    return false;
};