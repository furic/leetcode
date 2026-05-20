const findThePrefixCommonArray = (A: number[], B: number[]): number[] => {
    const n = A.length;
    const freq = new Array(n + 1).fill(0);
    const result: number[] = [];
    let commonCount = 0;

    for (let i = 0; i < n; i++) {
        if (++freq[A[i]] === 2) commonCount++;
        if (++freq[B[i]] === 2) commonCount++;
        result.push(commonCount);
    }

    return result;
};