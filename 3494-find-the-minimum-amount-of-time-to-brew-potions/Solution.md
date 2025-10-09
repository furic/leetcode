# Sequential Pipeline Simulation | 28 Lines | O(n × m) | 407ms

# Intuition
This is a pipeline scheduling problem where potions must flow through wizards sequentially. Each potion must wait for both: the previous potion to reach the next wizard, and for the current wizard to finish their previous task. The key is tracking when each wizard becomes available.

# Approach
**Pipeline Flow Simulation:**
- Process potions one at a time in order
- For each potion, simulate it passing through all wizards sequentially
- Track when each wizard finishes their current work to determine earliest start times

**Step-by-Step Process:**

1. **Initialize Wizard Availability:**
   - Create array `wizardFinishTimes` to track when each wizard finishes their current potion
   - Initially all wizards are free at time 0

2. **Process Each Potion Sequentially:**
   - For each potion, calculate when it flows through the entire wizard pipeline

3. **Calculate Potion Flow Through Wizards:**
   - Start with `potionStartTime = 0` for the current potion
   - For each wizard in order:
     - Wizard can start when: `max(their previous finish time, when potion arrives)`
     - Processing time = `skill[wizard] × mana[potion]`
     - Update `potionStartTime` to when this wizard finishes (becomes arrival time for next wizard)

4. **Update Wizard Finish Times:**
   - After simulating the potion through all wizards, we know when the last wizard finishes
   - Set last wizard's finish time to the calculated end time
   - Work backwards to calculate when each earlier wizard finished:
     - `wizardFinishTimes[i] = wizardFinishTimes[i+1] - processingTime[i+1]`
   - This backtracking reconstructs when each wizard in the chain actually finished

5. **Return Result:**
   - The last wizard's final finish time is when all potions complete

**Why Backtracking Works:**
- After calculating the potion's complete flow through all wizards, we know the absolute finish time
- Each wizard must have finished exactly one processing duration before the next wizard
- Working backwards gives us the exact times each wizard was done with this potion
- These times determine availability constraints for the next potion

**Synchronization Key:**
- A wizard cannot start until: `max(their availability, potion arrival)`
- This ensures proper handoff timing in the pipeline

# Complexity
- Time complexity: $$O(n \times m)$$ where n is number of wizards and m is number of potions
- Space complexity: $$O(n)$$ for tracking wizard finish times

# Code
```typescript
const minTime = (skill: number[], mana: number[]): number => {
    const wizardCount = skill.length;
    const potionCount = mana.length;
    
    const wizardFinishTimes: number[] = new Array(wizardCount).fill(0);

    for (let potionIndex = 0; potionIndex < potionCount; potionIndex++) {
        const currentPotionMana = mana[potionIndex];
        let potionStartTime = 0;

        for (let wizardIndex = 0; wizardIndex < wizardCount; wizardIndex++) {
            potionStartTime = Math.max(potionStartTime, wizardFinishTimes[wizardIndex]);
            
            const processingTime = skill[wizardIndex] * currentPotionMana;
            
            potionStartTime += processingTime;
        }

        wizardFinishTimes[wizardCount - 1] = potionStartTime;
        
        for (let wizardIndex = wizardCount - 2; wizardIndex >= 0; wizardIndex--) {
            const nextWizardProcessingTime = skill[wizardIndex + 1] * currentPotionMana;
            wizardFinishTimes[wizardIndex] = wizardFinishTimes[wizardIndex + 1] - nextWizardProcessingTime;
        }
    }

    return wizardFinishTimes[wizardCount - 1];
};
```