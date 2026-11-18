function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;

    const rows = new Array(numRows).fill('');

    let currRow = -1;
    let ascending = true;

    for (let i = 0; i < s.length; i++) {
        currRow += ascending ? 1 : -1;
        rows[currRow] += s[i];

        if (currRow === numRows - 1) {
            ascending = false;
        } else if (currRow === 0) {
            ascending = true;
        }
    }

    return rows.join('');
};