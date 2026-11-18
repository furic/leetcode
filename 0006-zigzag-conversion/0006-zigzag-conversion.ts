const convert = (s: string, numRows: number): string => {
    if (numRows === 1) return s;

    const cycleLen = 2 * (numRows - 1); // distance between consecutive top-row characters
    let result = '';

    for (let row = 0; row < numRows; row++) {
        const isMiddleRow = row > 0 && row < numRows - 1;
        const diagonalGap = cycleLen - 2 * row; // distance from the down-stroke char to the up-stroke char

        for (let idx = row; idx < s.length; idx += cycleLen) {
            result += s[idx];

            // Middle rows have an extra character on the diagonal between two vertical strokes
            if (isMiddleRow && idx + diagonalGap < s.length) result += s[idx + diagonalGap];
        }
    }

    return result;
};