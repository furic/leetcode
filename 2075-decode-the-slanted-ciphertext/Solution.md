# Diagonal Traversal Column Decode | 12 Lines | O(n) | 24ms

# Intuition
The encoding writes text along diagonals of a matrix, then reads row-by-row. Decoding reverses this: read column-by-column in diagonal order (each diagonal starting at a different column of row 0), which reconstructs the original left-to-right sequence.

# Approach
- Handle the trivial `rows === 1` case immediately — encoding is a no-op.
- Compute `cols = encodedText.length / rows` — the matrix dimensions.
- For each starting column `startCol` from `0` to `cols - 1`, follow the diagonal downward-right: `(r, c) = (0, startCol), (1, startCol+1), ...` until `r` or `c` goes out of bounds.
  - Each cell maps to flat index `r * cols + c` in `encodedText`.
  - Push the character at that index to `decoded`.
- Join and strip trailing spaces with `replace(/\s+$/, '')` — the matrix may have been padded with spaces to fill the last diagonal.
- This traversal visits each cell exactly once in the correct diagonal order.

# Complexity
- Time complexity: $$O(n)$$ where $$n$$ = `encodedText.length` — every cell is visited exactly once.

- Space complexity: $$O(n)$$ — for the `decoded` output array.

# Code
```typescript []
const decodeCiphertext = (encodedText: string, rows: number): string => {
    if (rows === 1) return encodedText;

    const cols = Math.floor(encodedText.length / rows);
    const decoded: string[] = [];

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
```