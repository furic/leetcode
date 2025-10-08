const successfulPairs = (spells: number[], potions: number[], success: number): number[] => {
    const maxPotionStrength = Math.max(...potions);
    
    // Frequency array: count how many potions have each strength value
    const potionFrequency = new Array(maxPotionStrength + 1).fill(0);
    for (const potionStrength of potions) {
        potionFrequency[potionStrength]++;
    }
    
    // Build suffix sum: potionFrequency[i] = count of potions with strength >= i
    for (let strength = maxPotionStrength - 1; strength >= 0; strength--) {
        potionFrequency[strength] += potionFrequency[strength + 1];
    }
    
    // Calculate successful pairs for each spell
    const result: number[] = [];
    for (const spellStrength of spells) {
        // Find minimum potion strength needed: spell * potion >= success
        const minPotionNeeded = Math.ceil(success / spellStrength);
        
        // Count potions with strength >= minPotionNeeded
        const successfulPairCount = minPotionNeeded <= maxPotionStrength 
            ? potionFrequency[minPotionNeeded] 
            : 0;
        
        result.push(successfulPairCount);
    }
    
    return result;
};