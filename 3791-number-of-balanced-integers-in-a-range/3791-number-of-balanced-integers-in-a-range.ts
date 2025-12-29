const countBalanced = (low: number, high: number): number => {
    const count = (num: number): number => {
        if (num < 10) return 0;
        
        const digits = num.toString().split('').map(Number);
        const n = digits.length;
        const memo = new Map<string, number>();
        
        const dp = (pos: number, diff: number, tight: boolean, placed: number): number => {
            if (pos === n) {
                return placed >= 2 && diff === 0 ? 1 : 0;
            }
            
            const key = `${pos},${diff},${tight ? 1 : 0},${placed}`;
            if (memo.has(key)) return memo.get(key)!;
            
            const limit = tight ? digits[pos] : 9;
            let result = 0;
            
            for (let d = 0; d <= limit; d++) {
                if (placed === 0 && d === 0) {
                    // Leading zero - don't count as placed
                    result += dp(pos + 1, diff, tight && d === limit, 0);
                } else {
                    const newPlaced = placed + 1;
                    // Odd position adds, even position subtracts
                    const newDiff = newPlaced % 2 === 1 ? diff + d : diff - d;
                    result += dp(pos + 1, newDiff, tight && d === limit, newPlaced);
                }
            }
            
            memo.set(key, result);
            return result;
        };
        
        return dp(0, 0, true, 0);
    };
    
    return count(high) - count(low - 1);
};