function largestSubmatrix(matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        matrix[i][j] += matrix[i - 1][j];
      }
    }
  }

  let maxArea = 0;

  for (let i = 0; i < m; i++) {
    const row = [...matrix[i]].sort((a, b) => b - a);

    for (let j = 0; j < n; j++) {
      maxArea = Math.max(maxArea, row[j] * (j + 1));
    }
  }

  return maxArea;
}