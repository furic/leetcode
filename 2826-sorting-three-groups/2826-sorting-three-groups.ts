function minimumOperations(nums: number[]) {
  let [a, b, c] = [0, 0, 0];
  for (let n of nums) {
    switch (n) {
      case 1:
        a++;
        break;
      case 2:
        b = Math.max(a, b) + 1;
        break;
      case 3:
        c = Math.max(a, b, c) + 1;
        break;
    }
  }
  return nums.length - Math.max(a, b, c);
}
