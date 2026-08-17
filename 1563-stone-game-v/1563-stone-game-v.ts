const stoneGameV = (stoneValue: number[]): number => {
    const n = stoneValue.length;
    const makeGrid = () => Array.from({ length: n }, () => new Array(n).fill(0));

    // f[l][r]    = max score Alice can get from subarray [l, r]
    // maxL[l][r] = max of (rangeSum + f[l][r]) over all right endpoints — used for left-half picks
    // maxR[l][r] = max of (rangeSum + f[l][r]) over all left endpoints  — used for right-half picks
    const f    = makeGrid();
    const maxL = makeGrid();
    const maxR = makeGrid();

    for (let l = n - 1; l >= 0; l--) {
        maxL[l][l] = maxR[l][l] = stoneValue[l];
        let total = stoneValue[l];
        let leftSum = 0;
        let split = l - 1; // rightmost index where leftSum <= total/2

        for (let r = l + 1; r < n; r++) {
            total += stoneValue[r];

            // Advance split pointer while left half sum stays <= half of total
            while (split + 1 < r && (leftSum + stoneValue[split + 1]) * 2 <= total) {
                leftSum += stoneValue[++split];
            }

            // Alice picks the left half: [l, split]
            if (l <= split)           f[l][r] = Math.max(f[l][r], maxL[l][split]);
            // Alice picks the right half: [split+2, r] (strictly more than half)
            if (split + 1 < r)        f[l][r] = Math.max(f[l][r], maxR[split + 2][r]);
            // Equal split: Alice can pick either side; pick right [split+1, r]
            if (leftSum * 2 === total) f[l][r] = Math.max(f[l][r], maxR[split + 1][r]);

            maxL[l][r] = Math.max(maxL[l][r - 1], total + f[l][r]);
            maxR[l][r] = Math.max(maxR[l + 1][r], total + f[l][r]);
        }
    }

    return f[0][n - 1];
};