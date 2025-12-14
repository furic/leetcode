export function countStableSubarrays(nums: number[], queries: number[][]): number[] {
    const n = nums.length;
    const q = queries.length;

    const prefix: number[] = new Array(n);
    prefix[0] = 1;

    let streak = 1;
    for (let i = 1; i < n; i++) {
        if (nums[i] >= nums[i - 1]) streak++;
        else streak = 1;
        prefix[i] = prefix[i - 1] + streak;
    }

    const inversion: number[] = new Array(n);
    inversion[n - 1] = n;

    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) inversion[i] = i + 1;
        else inversion[i] = inversion[i + 1];
    }

    const ans: number[] = new Array(q);
    for (let i = 0; i < q; i++) {
        const l = queries[i][0], r = queries[i][1];

        const b = inversion[l];
        if (b > r) {
            const sizeLR = r - l + 1;
            ans[i] = (sizeLR * (sizeLR + 1)) / 2;
        } else {
            const sizeLB = b - l;
            const countBR = prefix[r] - prefix[b - 1];
            ans[i] = (sizeLB * (sizeLB + 1)) / 2 + countBR;
        }
    }

    return ans;
}