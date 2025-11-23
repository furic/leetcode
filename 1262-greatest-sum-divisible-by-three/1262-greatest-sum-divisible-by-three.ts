var maxSumDivThree = function (nums) {
    const v = [[], [], []];
    for (const num of nums) {
        v[num % 3].push(num);
    }
    v[1].sort((a, b) => b - a);
    v[2].sort((a, b) => b - a);

    let ans = 0;
    const lb = v[1].length;
    const lc = v[2].length;
    for (let cntb = lb - 2; cntb <= lb; ++cntb) {
        if (cntb >= 0) {
            for (let cntc = lc - 2; cntc <= lc; ++cntc) {
                if (cntc >= 0 && (cntb - cntc) % 3 === 0) {
                    ans = Math.max(
                        ans,
                        getSum(v[1], 0, cntb) + getSum(v[2], 0, cntc),
                    );
                }
            }
        }
    }
    return ans + getSum(v[0], 0, v[0].length);
};

const getSum = (list, start, end) => {
    let sum = 0;
    for (let i = start; i < end; ++i) {
        sum += list[i];
    }
    return sum;
};