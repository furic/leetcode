const uniformArray = (nums1: number[]): boolean => {
    const odds  = nums1.filter((v) => v % 2 !== 0);
    const evens = nums1.filter((v) => v % 2 === 0);

    const canBeAllEven = odds.length === 0;

    const canBeAllOdd  = evens.length === 0
        || (odds.length > 0 && Math.min(...odds) < Math.min(...evens));

    return canBeAllEven || canBeAllOdd;
};