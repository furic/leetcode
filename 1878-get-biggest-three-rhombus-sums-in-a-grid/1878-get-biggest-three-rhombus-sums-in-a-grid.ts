const getBiggestThree = (grid: number[][]): number[] => {
    const rows = grid.length;
    const cols = grid[0].length;

    // Track top-3 distinct values
    const top3 = [0, 0, 0];
    const insertTop3 = (x: number): void => {
        if (x > top3[0]) {
            [top3[2], top3[1], top3[0]] = [top3[1], top3[0], x];
        } else if (x !== top3[0] && x > top3[1]) {
            [top3[2], top3[1]] = [top3[1], x];
        } else if (x !== top3[0] && x !== top3[1] && x > top3[2]) {
            top3[2] = x;
        }
    };

    // Prefix sums along both diagonals for O(1) rhombus border queries
    const diagDown = Array.from({ length: rows + 1 }, () => new Array(cols + 2).fill(0)); // top-left → bottom-right
    const diagUp   = Array.from({ length: rows + 1 }, () => new Array(cols + 2).fill(0)); // top-right → bottom-left

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            diagDown[i][j] = diagDown[i - 1][j - 1] + grid[i - 1][j - 1];
            diagUp[i][j]   = diagUp[i - 1][j + 1]   + grid[i - 1][j - 1];
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            insertTop3(grid[i][j]); // Single cell = rhombus of size 0

            for (let k = i + 2; k < rows; k += 2) {
                const topR    = i,                          topC    = j;
                const botR    = k,                          botC    = j;
                const leftR   = Math.floor((i + k) / 2),   leftC   = j - Math.floor((k - i) / 2);
                const rightR  = Math.floor((i + k) / 2),   rightC  = j + Math.floor((k - i) / 2);

                if (leftC < 0 || rightC >= cols) break;

                const rhombusSum =
                    (diagUp[leftR + 1][leftC + 1]  - diagUp[topR][topC + 2])    +  // top → left
                    (diagDown[rightR + 1][rightC + 1] - diagDown[topR][topC])    +  // top → right
                    (diagDown[botR + 1][botC + 1]   - diagDown[leftR][leftC])    +  // left → bottom
                    (diagUp[botR + 1][botC + 1]     - diagUp[rightR][rightC + 2])-  // right → bottom
                    (grid[topR][topC] + grid[botR][botC] + grid[leftR][leftC] + grid[rightR][rightC]); // corners counted twice

                insertTop3(rhombusSum);
            }
        }
    }

    return top3.filter(x => x !== 0);
};