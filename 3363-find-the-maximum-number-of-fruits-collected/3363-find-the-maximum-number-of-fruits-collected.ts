function maxCollectedFruits(fruits: number[][]): number {
    let n = fruits.length;
    let totalsum = 0, half = Math.ceil((n - 1) / 2);
    //top left goes diagonically to bottom right
    for (let i = 0; i < n; i++) {
        totalsum += fruits[i][i];
    }
    //bottom left triangle
    function updateFromLeftPaths(i, j) {
        let maxFromLeft = 0;
        if (i - 1 >= n - j) {
            maxFromLeft = fruits[i - 1][j - 1];
        }
        if (i >= n - j) {
            maxFromLeft = Math.max(maxFromLeft, fruits[i][j - 1]);
        }
        if (i + 1 >= n - j && i + 1 < n) {
            maxFromLeft = Math.max(maxFromLeft, fruits[i + 1][j - 1]);
        }
        fruits[i][j] += maxFromLeft;
    }
    for (let j = 1; j <= half - 1; j++) {
        for (let i = n - 1; i >= n - j - 1; i--) {
            updateFromLeftPaths(i, j);
        }
    }
    for (let j = half; j <= n - 2; j++) {
        for (let i = n - 1; i >= j + 1; i--) {
            updateFromLeftPaths(i, j);
        }
    }
    //fruits[n-1][n-2] has max for topLeftKid
    totalsum += fruits[n - 1][n - 2];

    //top right
    function updateFromTopPaths(i, j) {
        let maxFromTop = 0;
        if (j - 1 >= n - i) {
            maxFromTop = fruits[i - 1][j - 1];
        }
        if (j >= n - i) {
            maxFromTop = Math.max(maxFromTop, fruits[i - 1][j]);
        }
        if (j + 1 >= n - i && j + 1 < n) {
            maxFromTop = Math.max(maxFromTop, fruits[i - 1][j + 1]);
        }
        fruits[i][j] += maxFromTop;
    }
    for (let i = 1; i <= half - 1; i++) {
        for (let j = n - 1; j >= n - i - 1; j--) {
            updateFromTopPaths(i, j);
        }
    }
    for (let i = half; i <= n - 2; i++) {
        for (let j = n - 1; j >= i + 1; j--) {
            updateFromTopPaths(i, j);
        }
    }
    //fruits[n-2][n-1] has totalfruits for topright kid
    totalsum += fruits[n - 2][n - 1];
    return totalsum;
};