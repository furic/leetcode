function sumZero(n: number): number[] {
    let ans: number[] = [];
    for (let i = 1; i <= Math.floor(n / 2); i++) {
        ans.push(i, -i);
    }
    if (n % 2 === 1) {
        ans.push(0);
    }
    return ans;
}