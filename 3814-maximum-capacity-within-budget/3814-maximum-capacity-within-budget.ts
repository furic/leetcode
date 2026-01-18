/**
 * Finds maximum total capacity by selecting at most 2 distinct machines within budget
 * Strategy: Sort by cost, use two pointers with prefix max capacity to find optimal pairs
 * Time: O(n log n), Space: O(n)
 */
const maxCapacity = (costs: number[], capacity: number[], budget: number): number => {
    const numMachines = costs.length;
    
    // Filter machines that individually fit within budget
    // Machine must satisfy: cost < budget (strictly less than)
    const affordableMachines: Array<{ cost: number; capacity: number }> = [];
    
    for (let i = 0; i < numMachines; i++) {
        if (costs[i] < budget) {
            affordableMachines.push({ 
                cost: costs[i], 
                capacity: capacity[i] 
            });
        }
    }

    // No machines fit the budget
    if (affordableMachines.length === 0) return 0;

    // Sort by cost (ascending) to enable two-pointer technique
    affordableMachines.sort((a, b) => a.cost - b.cost);

    const numAffordable = affordableMachines.length;
    
    // Precompute prefix maximum capacity at each position
    // prefixMaxCapacity[i] = max capacity among machines [0..i]
    const prefixMaxCapacity = new Int32Array(numAffordable);
    let runningMaxCapacity = 0;

    for (let i = 0; i < numAffordable; i++) {
        runningMaxCapacity = Math.max(runningMaxCapacity, affordableMachines[i].capacity);
        prefixMaxCapacity[i] = runningMaxCapacity;
    }

    // Initialize with best single machine capacity
    let maxTotalCapacity = runningMaxCapacity;

    // Two-pointer approach to find optimal pairs
    // For each machine i, find the best valid partner with index < i
    let maxAffordableIndex = numAffordable - 1;

    for (let currentIndex = 0; currentIndex < numAffordable; currentIndex++) {
        const currentCost = affordableMachines[currentIndex].cost;
        const currentCapacity = affordableMachines[currentIndex].capacity;
        const remainingBudget = budget - currentCost;

        // Shrink pointer to exclude machines that exceed remaining budget
        // Need: partnerCost < remainingBudget (partner must fit in remaining budget)
        while (maxAffordableIndex >= 0 && 
               affordableMachines[maxAffordableIndex].cost >= remainingBudget) {
            maxAffordableIndex--;
        }

        // Find best partner among valid machines with index < currentIndex
        // This ensures: 1) distinct machines, 2) no duplicate pairs
        const bestPartnerIndex = Math.min(maxAffordableIndex, currentIndex - 1);

        if (bestPartnerIndex >= 0) {
            // prefixMaxCapacity gives us the best capacity among all valid partners
            const partnerCapacity = prefixMaxCapacity[bestPartnerIndex];
            const totalCapacity = currentCapacity + partnerCapacity;
            
            maxTotalCapacity = Math.max(maxTotalCapacity, totalCapacity);
        }
    }

    return maxTotalCapacity;
};