function decodeCiphertext(encodedText: string, rows: number): string {
    if (rows === 1) return encodedText;

    const n = encodedText.length;
    const cols = Math.floor(n / rows);
    let res = [];

    for (let c = 0; c < cols; c++) {
        let r = 0, j = c;
        while (r < rows && j < cols) {
            res.push(encodedText[r * cols + j]);
            r++;
            j++;
        }
    }

    return res.join('').replace(/\s+$/, '');
};