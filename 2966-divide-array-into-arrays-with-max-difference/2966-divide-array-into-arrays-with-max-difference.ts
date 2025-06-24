const divideArray = (nums: number[], k: number): number[][] => {
  const count = Array(Math.max(...nums) + 1).fill(0);
  nums.forEach(num => count[num]++);

  const res: number[][] = [];
  let c = 0;

  for (let i = 0; i < nums.length; i += 3) {
    const group: number[] = [];
    while (c < count.length && group.length < 3) {
      if (count[c]-- > 0) group.push(c);
      else c++;
    }
    if (group.length < 3 || group[2] - group[0] > k) return [];
    res.push(group);
  }

  return res;
};