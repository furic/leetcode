const countPermutations = (complexity) => {
    const MOD = 1000000007;
    const n = complexity.length;
    if (n === 0) {
        return 1;
    }
    let min_val = complexity[0];
    for (let i = 1; i < n; i++) {
        if (min_val >= complexity[i]) {
            return 0;
        }
        min_val = Math.min(min_val, complexity[i]);
    }
    let ans = 1;
    for (let i = 1; i < n; i++) {
        ans = (ans * i) % MOD;
    }
    return ans;
};