const countPermutations = (complexity) => {
    const MOD = 1e9 + 7;
    const n = complexity.length;
    if (n === 0) {
        return 1;
    }
    let min = complexity[0];
    for (let i = 1; i < n; i++) {
        if (min >= complexity[i]) {
            return 0;
        }
        min = Math.min(min, complexity[i]);
    }
    let ans = 1;
    for (let i = 1; i < n; i++) {
        ans = (ans * i) % MOD;
    }
    return ans;
};