/**
 * Finds the smallest team that covers all required skills
 * Uses bitmask DP to track skill coverage and team composition
 * Strategy: Represent skills as bits, find minimum set cover through all skill combinations
 */
const smallestSufficientTeam = (req_skills: string[], people: string[][]): number[] => {
    const numSkills = req_skills.length;
    const numPeople = people.length;
    
    // Map each skill name to a bit position (0 to numSkills-1)
    const skillToIndex = new Map<string, number>();
    for (let i = 0; i < numSkills; i++) {
        skillToIndex.set(req_skills[i], i);
    }
    
    // Convert each person's skills to a bitmask
    // personSkillMask[i] = bitmask where bit j is set if person i has skill j
    const personSkillMask: number[] = new Array(numPeople).fill(0);
    for (let personIndex = 0; personIndex < numPeople; personIndex++) {
        for (const skill of people[personIndex]) {
            const skillBit = skillToIndex.get(skill)!;
            personSkillMask[personIndex] |= (1 << skillBit);
        }
    }
    
    // DP arrays for all possible skill coverage states (2^numSkills states)
    const INFINITY = 1 << 30;
    const totalStates = 1 << numSkills;
    
    // minTeamSize[skillMask] = minimum number of people needed to achieve skillMask coverage
    const minTeamSize: number[] = new Array(totalStates).fill(INFINITY);
    
    // lastPersonAdded[skillMask] = index of last person added to achieve skillMask
    const lastPersonAdded: number[] = new Array(totalStates).fill(0);
    
    // previousState[skillMask] = the skill coverage state before adding lastPersonAdded
    const previousState: number[] = new Array(totalStates).fill(0);
    
    // Base case: 0 people needed for 0 skills
    minTeamSize[0] = 0;
    
    // Try all possible skill coverage states
    for (let currentMask = 0; currentMask < totalStates; currentMask++) {
        // Skip unreachable states
        if (minTeamSize[currentMask] === INFINITY) {
            continue;
        }
        
        // Try adding each person to current state
        for (let personIndex = 0; personIndex < numPeople; personIndex++) {
            // New skill coverage after adding this person
            const newMask = currentMask | personSkillMask[personIndex];
            
            // Update if this gives a smaller team
            if (minTeamSize[currentMask] + 1 < minTeamSize[newMask]) {
                minTeamSize[newMask] = minTeamSize[currentMask] + 1;
                lastPersonAdded[newMask] = personIndex;
                previousState[newMask] = currentMask;
            }
        }
    }
    
    // Backtrack from full coverage to reconstruct the team
    const team: number[] = [];
    const fullCoverage = (1 << numSkills) - 1;
    
    for (let mask = fullCoverage; mask !== 0; mask = previousState[mask]) {
        team.push(lastPersonAdded[mask]);
    }
    
    return team;
};