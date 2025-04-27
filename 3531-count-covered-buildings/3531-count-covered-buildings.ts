const countCoveredBuildings = (n: number, buildings: number[][]): number => {
    const rowMap = new Map<number, number[]>(); // row -> list of columns
    const colMap = new Map<number, number[]>(); // column -> list of rows

    for (const [x, y] of buildings) {
        if (!rowMap.has(x)) rowMap.set(x, []);
        if (!colMap.has(y)) colMap.set(y, []);
        rowMap.get(x)!.push(y);
        colMap.get(y)!.push(x);
    }

    // Sort each row and column for binary search later
    for (const [_, cols] of rowMap) cols.sort((a, b) => a - b);
    for (const [_, rows] of colMap) rows.sort((a, b) => a - b);

    let count = 0;

    const binarySearchIndex = (arr: number[], target: number): number => {
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1; // should never happen
    };

    for (const [row, col] of buildings) {
        const cols = rowMap.get(row)!;
        const rows = colMap.get(col)!;
        const colIdx = binarySearchIndex(cols, col);
        const rowIdx = binarySearchIndex(rows, row);

        const hasLeft = colIdx > 0;
        const hasRight = colIdx < cols.length - 1;
        const hasUp = rowIdx > 0;
        const hasDown = rowIdx < rows.length - 1;

        if (hasLeft && hasRight && hasUp && hasDown) {
            count++;
        }
    }

    return count;
};