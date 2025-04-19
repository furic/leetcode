const numSubarrayProductLessThanK = (nums: number[], k: number): number => {
    const n = nums.length;
    let start = 0, end = 0;
    let product = 1;
    let answer = 0;
    while (end < n) {
        product *= nums[end];
        while (product >= k && start <= end) {
            product /= nums[start];
            start++;
        }
        answer += end - start + 1;
        end++;
    }
    return answer;
};