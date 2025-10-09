const minTime = (skill: number[], mana: number[]): number => {
    const wizardCount = skill.length;
    const potionCount = mana.length;
    
    // Track when each wizard finishes their current potion
    const wizardFinishTimes: number[] = new Array(wizardCount).fill(0);

    // Process each potion sequentially
    for (let potionIndex = 0; potionIndex < potionCount; potionIndex++) {
        const currentPotionMana = mana[potionIndex];
        let potionStartTime = 0;

        // Calculate when each wizard processes this potion
        for (let wizardIndex = 0; wizardIndex < wizardCount; wizardIndex++) {
            // Wizard must wait for: max(their previous finish time, when potion arrives)
            potionStartTime = Math.max(potionStartTime, wizardFinishTimes[wizardIndex]);
            
            // Calculate processing time for this wizard-potion combination
            const processingTime = skill[wizardIndex] * currentPotionMana;
            
            // Update when this wizard finishes
            potionStartTime += processingTime;
        }

        // After last wizard finishes, update all wizard finish times
        wizardFinishTimes[wizardCount - 1] = potionStartTime;
        
        // Work backwards to update earlier wizards' finish times
        for (let wizardIndex = wizardCount - 2; wizardIndex >= 0; wizardIndex--) {
            const nextWizardProcessingTime = skill[wizardIndex + 1] * currentPotionMana;
            wizardFinishTimes[wizardIndex] = wizardFinishTimes[wizardIndex + 1] - nextWizardProcessingTime;
        }
    }

    // The last wizard's finish time is when all potions are complete
    return wizardFinishTimes[wizardCount - 1];
};