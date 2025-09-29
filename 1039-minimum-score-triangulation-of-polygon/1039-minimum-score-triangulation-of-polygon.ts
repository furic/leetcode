function minScoreTriangulation(values: number[]): number {
    let vertexCount = values.length;
    let minScore = Array.from({ length: vertexCount }, () => Array(vertexCount).fill(0));

    for (let gap = 2; gap < vertexCount; gap++) {
        for (let start = 0; start + gap < vertexCount; start++) {
            let end = start + gap;
            let currentMinScore = Infinity;

            for (let mid = start + 1; mid < end; mid++) {
                let triangleScore =
                    minScore[start][mid] +
                    minScore[mid][end] +
                    values[start] * values[mid] * values[end];
                currentMinScore = Math.min(currentMinScore, triangleScore);
            }
            minScore[start][end] = currentMinScore;
        }
    }
    return minScore[0][vertexCount - 1];
};