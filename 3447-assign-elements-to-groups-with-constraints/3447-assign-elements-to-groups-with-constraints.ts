function assignElements(groups: number[], elements: number[]): number[] {
    const maxGroupValue = Math.max(...groups);
    const MOD = 100001;  // Since groups[i] <= 10^5
    const smallestElementIndex = new Array(MOD).fill(-1);

    // Precompute the smallest index for divisibility
    for (let j = 0; j < elements.length; j++) {
        const elem = elements[j];
        if (smallestElementIndex[elem] !== -1) continue;  // Already assigned a smaller index

        // Mark all multiples of elem with the smallest index
        for (let multiple = elem; multiple <= maxGroupValue; multiple += elem) {
            if (smallestElementIndex[multiple] === -1) {
                smallestElementIndex[multiple] = j;
            }
        }
    }

    // Assign elements to groups based on precomputed divisibility
    return groups.map(group => smallestElementIndex[group]);
};