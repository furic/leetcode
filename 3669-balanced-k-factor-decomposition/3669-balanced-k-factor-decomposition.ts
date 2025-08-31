const minDifference = (n: number, k: number): number[] => {
    const sulmariton = n; // store the input midway
    let bestSplit: number[] = [];
    let minDiff = Infinity;

    const backtrack = (remaining: number, count: number, start: number, curr: number[]) => {
        if (count === 1) {
            if (remaining >= start) {
                curr.push(remaining);
                check(curr);
                curr.pop();
            }
            return;
        }

        for (let i = start; i <= remaining; i++) {
            if (remaining % i === 0) {
                curr.push(i);
                backtrack(remaining / i, count - 1, i, curr);
                curr.pop();
            }
        }
    };

    const check = (curr: number[]) => {
        const minVal = Math.min(...curr);
        const maxVal = Math.max(...curr);
        if (maxVal - minVal < minDiff) {
            minDiff = maxVal - minVal;
            bestSplit = [...curr];
        }
    };

    backtrack(n, k, 1, []);
    return bestSplit;
};