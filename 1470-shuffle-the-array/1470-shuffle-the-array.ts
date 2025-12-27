/**
 * Interleaves two halves of an array into alternating elements
 * Given [x1,x2,...,xn,y1,y2,...,yn], returns [x1,y1,x2,y2,...,xn,yn]
 */
const shuffle = (nums: number[], n: number): number[] =>
    nums.slice(0, n).flatMap((x, i) => [x, nums[i + n]]);