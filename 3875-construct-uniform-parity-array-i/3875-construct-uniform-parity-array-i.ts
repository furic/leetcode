const uniformArray = (nums1: number[]): boolean => {
    const oddCount = nums1.filter((v) => v % 2 !== 0).length;

    const canBeAllEven = oddCount === 0 || oddCount >= 2;
    const canBeAllOdd  = oddCount >= 1;

    return canBeAllEven || canBeAllOdd;
};