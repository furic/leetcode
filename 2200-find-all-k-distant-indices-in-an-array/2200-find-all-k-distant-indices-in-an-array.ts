const findKDistantIndices = (nums: number[], key: number, k: number): number[] =>
  nums.map((_, i) => i).filter(i => nums.some((val, j) => val === key && Math.abs(i - j) <= k));