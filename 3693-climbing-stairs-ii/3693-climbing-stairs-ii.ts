const climbStairs = (n: number, costs: number[]): number => {
    const minCostToReach = new Array(n + 1).fill(Infinity);
    minCostToReach[n] = 0;

    for (let currentStep = n; currentStep >= 0; currentStep--) {
        for (let jumpSize = 1; jumpSize <= 3; jumpSize++) {
            const previousStep = currentStep - jumpSize;
            if (previousStep < 0) break;
            
            const jumpCost = costs[currentStep - 1] + jumpSize * jumpSize;
            minCostToReach[previousStep] = Math.min(
                minCostToReach[previousStep], 
                minCostToReach[currentStep] + jumpCost
            );
        }
    }

    return minCostToReach[0];
};