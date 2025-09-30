function triangularSum(nums: number[]): number {
    let size: number = nums.length;
    while (size !== 1) {
      for (let i = 0; i < size - 1; i++) {
        nums[i] = (nums[i] + nums[i + 1]) % 10;
      }
      size--;
    }
    return nums[0];

};