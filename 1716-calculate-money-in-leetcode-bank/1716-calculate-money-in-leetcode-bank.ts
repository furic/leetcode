const totalMoney = (days: number): number => {
    const completeWeeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    
    // Helper: Sum of integers from 1 to n using formula n(n+1)/2
    const triangularSum = (n: number): number => (n * (n + 1)) >> 1;
    
    // Mathematical formula derivation:
    // - If we sum all days as 1+2+3+...+days, we get triangularSum(days)
    // - But we're double-counting the weekly increments
    // - Need to subtract: 7 * (0+1+2+...+(completeWeeks-1)) = 7 * triangularSum(completeWeeks-1)
    // - Also subtract: 6 * completeWeeks * remainingDays (adjusts for partial week)
    
    const naiveSum = triangularSum(days);
    const weeklyOvercount = 42 * triangularSum(completeWeeks - 1);
    const partialWeekAdjustment = 6 * completeWeeks * remainingDays;
    
    return naiveSum - weeklyOvercount - partialWeekAdjustment;
};