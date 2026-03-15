function firstUniqueEven(nums: number[]): number {
  const cnt = new Map<number, number>();
  for (const x of nums) cnt.set(x, (cnt.get(x) ?? 0) + 1);
  return nums.find(x => x % 2 === 0 && cnt.get(x) === 1) ?? -1;
}