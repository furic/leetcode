function champagneTower(poured: number, query_row: number, query_glass: number): number {
    let row: number[] = [poured];

    for (let r = 1; r <= query_row; r++) {
        const next = new Array(r + 1).fill(0);
        for (let c = 0; c < r; c++) {
            if (row[c] > 1) {
                const overflow = (row[c] - 1) / 2;
                next[c] += overflow;
                next[c + 1] += overflow;
            }
        }
        row = next;
    }

    return Math.min(1, row[query_glass]);
}