const missingMultiple = (nums: number[], k: number): number => {
    const seen = new Set(nums);
    let multiple = 1;
    while (seen.has(k * multiple)) multiple++;
    return k * multiple;
};