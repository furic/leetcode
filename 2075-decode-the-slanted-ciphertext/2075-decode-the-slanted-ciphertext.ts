const decodeCiphertext = (encodedText: string, rows: number): string => {
    if (rows === 1) return encodedText;

    const cols = Math.floor(encodedText.length / rows);
    const decoded: string[] = [];

    // Each diagonal starts at column c, reading top-left to bottom-right
    for (let startCol = 0; startCol < cols; startCol++) {
        let r = 0, c = startCol;
        while (r < rows && c < cols) {
            decoded.push(encodedText[r * cols + c]);
            r++;
            c++;
        }
    }

    return decoded.join('').replace(/\s+$/, '');
};