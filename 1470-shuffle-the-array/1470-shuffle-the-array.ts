function shuffle(nums: number[], n: number): number[] {
    const tmp:number[] = []
    for(let i = 0; i < n; i++){
        tmp.push(nums[i])
        tmp.push(nums[i + n])
    }
    return tmp
};