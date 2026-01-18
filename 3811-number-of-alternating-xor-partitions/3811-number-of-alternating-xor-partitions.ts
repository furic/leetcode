function alternatingXOR(nums: number[], target1: number, target2: number): number {
    const MOD = 1e9 + 7;
    const n = nums.length;
    
    // Compute prefix XOR
    const prefixXOR = [0];
    for (let i = 0; i < n; i++) {
        prefixXOR.push(prefixXOR[i] ^ nums[i]);
    }
    
    // Map: prefixXOR value -> {dp1: sum, dp2: sum}
    const dpSums = new Map<number, {dp1: number, dp2: number}>();
    dpSums.set(0, {dp1: 0, dp2: 0}); // Base case: j=0
    
    let result = 0;
    
    for (let i = 1; i <= n; i++) {
        const currentXOR = prefixXOR[i];
        let dp1 = 0, dp2 = 0;
        
        // Block XOR = target1
        const neededXOR1 = currentXOR ^ target1;
        if (neededXOR1 === 0) dp1 = 1; // First block
        if (dpSums.has(neededXOR1)) {
            dp1 = (dp1 + dpSums.get(neededXOR1).dp2) % MOD;
        }
        
        // Block XOR = target2
        const neededXOR2 = currentXOR ^ target2;
        if (dpSums.has(neededXOR2)) {
            dp2 = (dp2 + dpSums.get(neededXOR2).dp1) % MOD;
        }
        
        // Update map
        if (!dpSums.has(currentXOR)) {
            dpSums.set(currentXOR, {dp1: 0, dp2: 0});
        }
        const current = dpSums.get(currentXOR);
        current.dp1 = (current.dp1 + dp1) % MOD;
        current.dp2 = (current.dp2 + dp2) % MOD;
        
        if (i === n) result = (dp1 + dp2) % MOD;
    }
    
    return result;
}