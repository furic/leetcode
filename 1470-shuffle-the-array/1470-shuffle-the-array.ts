function shuffle(nums: number[], n: number): number[] {
    const array = [];
    let i = 0;
    while(i<n)
    {
        array.push(nums[i]);
        array.push(nums[i+n]);
        i++;
    }
    return array;
};