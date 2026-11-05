const findTheDistanceValue = (arr1: number[], arr2: number[], d: number): number => {
    let count = 0;

    for (const a of arr1) {
        let isFarFromAll = true;
        for (const b of arr2) {
            if (Math.abs(a - b) <= d) {
                isFarFromAll = false;
                break;
            }
        }
        if (isFarFromAll) count++;
    }

    return count;
};