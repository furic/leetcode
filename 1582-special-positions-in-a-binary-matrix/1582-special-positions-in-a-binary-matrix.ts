const numSpecial = (mat: number[][]): number => {
    const rowCount = mat.length;
    const colCount = mat[0].length;
    const rowOnes = new Array(rowCount).fill(0);
    const colOnes = new Array(colCount).fill(0);

    for (let i = 0; i < rowCount; i++)
        for (let j = 0; j < colCount; j++)
            if (mat[i][j] === 1) { rowOnes[i]++; colOnes[j]++; }

    let specialCount = 0;
    for (let i = 0; i < rowCount; i++)
        for (let j = 0; j < colCount; j++)
            if (mat[i][j] === 1 && rowOnes[i] === 1 && colOnes[j] === 1) specialCount++;

    return specialCount;
};