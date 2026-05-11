const separateDigits = (nums: number[]): number[] =>
    nums.flatMap(n => n.toString().split('').map(Number));