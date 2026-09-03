const uniformArray = (nums1: number[]): boolean => {
    let minOdd = Infinity, minEven = Infinity;

    for (const x of nums1) {
        if (x & 1) minOdd  = Math.min(minOdd,  x);
        else        minEven = Math.min(minEven, x);
    }

    if (minOdd === Infinity || minEven === Infinity) return true;
    return minOdd < minEven;
};