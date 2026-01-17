function largestSquareArea(bottomLeft: number[][], topRight: number[][]): number {
    const n = bottomLeft.length;
    let maxSquare = 0;

    for (let i = 0; i < n - 1; i++) {
        for(let j = i + 1; j < n; j++){
            const min_x = Math.max(bottomLeft[i][0], bottomLeft[j][0]); 
            const max_x = Math.min(topRight[i][0], topRight[j][0]);     
            const min_y = Math.max(bottomLeft[i][1], bottomLeft[j][1]); 
            const max_y = Math.min(topRight[i][1], topRight[j][1]);
            
            if (min_x < max_x && min_y < max_y) {
                const square = Math.min(max_x - min_x, max_y - min_y);
                maxSquare = Math.max(maxSquare, square ** 2);
            }
        }

    }

    return maxSquare;
};