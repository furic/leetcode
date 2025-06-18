const divideArray = (nums: number[], k: number): number[][] => {
    // nums.sort((a, b) => a - b);
    // const ans = [];
    // for (let i = 0; i < nums.length; i += 3) {
    //     if (nums[i + 2] - nums[i] > k) {
    //         return [];
    //     }
    //     ans.push([nums[i], nums[i + 1], nums[i + 2]]);
    // }
    // return ans;
    const n = nums.length;
    const freq: number[] = new Array(100001).fill(0);
    let xMax = 0;

    for (const x of nums) {
        freq[x]++;
        xMax = Math.max(x, xMax);
    }

    const ans: number[][] = new Array(n / 3);
    const vec3: number[] = new Array(3);
    let count = 0;
    let vec_m = 0;
    let i = 0;

    for (let x = 1; x <= xMax; x++) {
        while (freq[x] > 0) {
            freq[x]--;
            if (count % 3 === 0) {
                vec_m = x;
            }
            if (x > vec_m + k) {
                return [];
            }
            vec3[count] = x;

            if (count % 3 === 2) {
                ans[i++] = [...vec3]; // copy to avoid mutation
                count = -1;
            }
            count++;
        }
    }

    return ans;
};