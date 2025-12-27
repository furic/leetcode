# Bitmask DP Set Cover | 50 Lines | O(2^s * p) | 13ms

# Intuition

Finding the smallest team that covers all required skills is a minimum set cover problem. With a small number of skills (≤16), we can represent skill coverage as a bitmask where each bit indicates whether a skill is covered. Using dynamic programming over all possible skill coverage states, we can efficiently find the minimum team size and reconstruct the actual team composition through backtracking.

# Approach

**Core Strategy:**
- Map skills to bit positions for efficient bitmask representation
- Convert each person's skills to a bitmask showing which skills they have
- Use DP over all possible skill coverage states (2^s states for s skills)
- Track minimum team size, last person added, and previous state for each coverage
- Backtrack from full coverage to reconstruct the optimal team

**Step-by-Step Process:**

**1. Map Skills to Bit Positions:**
- Create a map: skill name → bit index (0 to numSkills-1)
- This allows us to represent any set of skills as a single integer bitmask
- Example: ["java", "nodejs", "reactjs"] → java=bit0, nodejs=bit1, reactjs=bit2
- A person with "java" and "reactjs" would have bitmask: 101 (binary) = 5 (decimal)

**2. Convert People to Skill Bitmasks:**
- For each person, create a bitmask representing their skills
- Iterate through their skill list
- For each skill, find its bit position and set that bit using OR operation
- `personSkillMask[i]` = bitmask where bit j is 1 if person i has skill j
- This precomputation allows O(1) checking of what skills a person provides

**3. Initialize DP State Arrays:**
- `minTeamSize[mask]`: Minimum number of people needed to achieve skill coverage represented by mask
- `lastPersonAdded[mask]`: Index of the last person added to reach this coverage
- `previousState[mask]`: The skill coverage state before adding the last person
- Total states: 2^numSkills (one for each possible subset of skills)
- Initialize all minTeamSize values to INFINITY (unreachable)
- Base case: `minTeamSize[0] = 0` (0 people needed for 0 skills)

**4. DP State Transition:**
- Iterate through all possible skill coverage states (masks from 0 to 2^s - 1)
- For each reachable state (minTeamSize[mask] ≠ INFINITY):
  - Try adding each person to the current team
  - Calculate new coverage: `newMask = currentMask | personSkillMask[i]`
  - Bitwise OR combines skills: any skill in current or new person's set is covered
  - Check if adding this person gives a smaller team for newMask coverage

**5. Update DP Values (Optimization Check):**
- If `minTeamSize[currentMask] + 1 < minTeamSize[newMask]`:
  - We found a better way to reach newMask coverage
  - Update minTeamSize[newMask] = minTeamSize[currentMask] + 1
  - Record lastPersonAdded[newMask] = personIndex (for backtracking)
  - Record previousState[newMask] = currentMask (for backtracking)
- This ensures we always keep the minimum team size for each coverage state

**6. Why This DP Formulation Works:**

**Optimal Substructure:**
- If we have optimal team T for coverage mask M
- And adding person P gives coverage M', then team T∪{P} is optimal for M'
- We build up from smaller coverage to larger coverage

**State Representation:**
- Each mask represents a unique set of covered skills
- mask = 0b111 means all 3 skills covered
- mask = 0b101 means skills 0 and 2 covered, skill 1 not covered
- Target: mask = (1 << numSkills) - 1 (all bits set = all skills covered)

**Overlapping Subproblems:**
- Many ways to reach the same skill coverage
- DP caches the best way for each coverage state
- Reuses results when multiple paths lead to same state

**7. Backtrack to Reconstruct Team:**
- Start from full coverage mask: `(1 << numSkills) - 1`
- Follow the chain: currentMask → previousState[currentMask] → ...
- At each step, add lastPersonAdded[currentMask] to the team
- Continue until we reach mask = 0 (base case)
- The collected person indices form the optimal team

**8. Backtracking Process Detail:**
- Initialize empty team array
- Start at fullCoverage = all skills covered
- Loop: while current mask ≠ 0:
  - Add lastPersonAdded[mask] to team
  - Update mask = previousState[mask] (go to previous coverage state)
- This reconstructs the sequence of people added
- Order doesn't matter (problem allows any order)

**9. Why Bitmask DP is Efficient Here:**

**Skill Count Constraint:**
- Maximum 16 skills (per typical constraints)
- 2^16 = 65,536 states (manageable)
- Each state can be processed quickly

**Compared to Naive Approaches:**
- Brute force: Try all subsets of people = 2^p where p = number of people
- With p up to 60, that's 2^60 = too large
- Bitmask DP: 2^s × p = 2^16 × 60 = ~4 million operations (feasible)

**Space-Time Tradeoff:**
- Use O(2^s) space to achieve O(2^s × p) time
- Much better than exponential in number of people

**10. Example Walkthrough (req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]):**

**Map skills:**
- skillToIndex: {"java": 0, "nodejs": 1, "reactjs": 2}

**Convert people to bitmasks:**
- Person 0 ["java"]: mask = 001 (binary) = 1
- Person 1 ["nodejs"]: mask = 010 (binary) = 2
- Person 2 ["nodejs","reactjs"]: mask = 110 (binary) = 6

**DP initialization:**
- minTeamSize[0] = 0 (base case)
- All others = INFINITY

**DP transitions:**

State 0 (mask = 000, coverage = none):
- Add person 0: newMask = 0 | 1 = 1, minTeamSize[1] = 1
- Add person 1: newMask = 0 | 2 = 2, minTeamSize[2] = 1
- Add person 2: newMask = 0 | 6 = 6, minTeamSize[6] = 1

State 1 (mask = 001, coverage = java):
- Add person 0: newMask = 1 | 1 = 1, no improvement
- Add person 1: newMask = 1 | 2 = 3, minTeamSize[3] = 2
- Add person 2: newMask = 1 | 6 = 7, minTeamSize[7] = 2

State 2 (mask = 010, coverage = nodejs):
- Add person 0: newMask = 2 | 1 = 3, minTeamSize[3] = 2 (already have this)
- Add person 1: newMask = 2 | 2 = 2, no improvement
- Add person 2: newMask = 2 | 6 = 6, no improvement (already 1)

State 3 (mask = 011, coverage = java+nodejs):
- Add person 2: newMask = 3 | 6 = 7, minTeamSize[7] = 3 (worse than 2)

State 6 (mask = 110, coverage = nodejs+reactjs):
- Add person 0: newMask = 6 | 1 = 7, minTeamSize[7] = 2 (already have this)

**Target coverage:**
- fullCoverage = 111 (binary) = 7
- minTeamSize[7] = 2 ✓

**Backtrack from mask = 7:**
- mask = 7: lastPersonAdded[7] = ?, previousState[7] = ?
- From state 1: adding person 2 gives 1 | 6 = 7
- So lastPersonAdded[7] = 2, previousState[7] = 1
- From state 0: adding person 0 gives 0 | 1 = 1
- So lastPersonAdded[1] = 0, previousState[1] = 0

**Reconstruct team:**
- Start at mask 7: add person 2
- Go to mask 1: add person 0
- Go to mask 0: stop
- Team: [2, 0] or [0, 2] (order doesn't matter) ✓

**11. Why Skill Overlap Matters:**

**Person with Redundant Skills:**
- If person A has skills {S1, S2} and person B has {S1, S3}
- They both have S1 (overlap)
- DP naturally handles this: adding B to a state that already has S1 doesn't change coverage for S1

**Optimal Selection:**
- If person C has {S1, S2, S3}, they might cover more with one person
- DP will prefer C over A+B if both give same coverage (smaller team)
- The minTeamSize comparison ensures optimal choice

**12. Edge Cases Handled:**

**Single person covers all skills:**
- One person's mask = fullCoverage
- From state 0, directly transition to fullCoverage with 1 person
- Backtracking returns [that person] ✓

**Disjoint skill sets:**
- Each person covers different skills with no overlap
- Need all such people to reach full coverage
- DP builds up coverage incrementally
- Final team includes all necessary people ✓

**Multiple optimal solutions:**
- Different teams with same minimum size
- DP finds one of them (whichever is processed first)
- Problem allows any valid answer

**Person with no relevant skills:**
- Their bitmask would be 0 (no skills from required set)
- Adding them: newMask = currentMask | 0 = currentMask (no change)
- Never improves minTeamSize, so never selected ✓

**13. Space Optimization Considerations:**

**Why Track All Three Arrays:**
- minTeamSize: Essential for knowing if we found better solution
- lastPersonAdded: Needed to reconstruct which person to add
- previousState: Needed to trace back through the DP path

**Could We Reduce Space:**
- Could reconstruct path by re-running transitions (slower)
- Could use map instead of array for sparse states (if few reachable)
- For typical constraints (s ≤ 16), arrays are fine

**14. Time Complexity Breakdown:**

**Preprocessing:**
- Build skill map: O(s) for s skills
- Convert people to bitmasks: O(p × average_skills) = O(p × s) worst case

**DP Iteration:**
- Outer loop: 2^s states
- For each state: try p people
- Each person: O(1) to compute new mask and update
- Total: O(2^s × p)

**Backtracking:**
- Worst case: s people in team (one skill per person)
- Trace back through s states: O(s)
- Negligible compared to DP iteration

**Overall:**
- O(s + p×s + 2^s×p + s) = O(2^s × p)
- Dominated by DP iteration

**15. Why Guaranteed Solution Exists:**

**Problem Statement:**
- "It is guaranteed an answer exists"
- This means the union of all people's skills covers all required skills
- Without this guarantee, we'd need to check if fullCoverage is reachable
- With guarantee, minTeamSize[fullCoverage] will definitely be < INFINITY

# Complexity

- Time complexity: $$O(2^s \times p)$$
  - s = number of required skills
  - p = number of people
  - Preprocessing: O(s + p×s) to map skills and convert people to bitmasks
  - DP iteration: O(2^s × p) to try all states and all people
  - Backtracking: O(s) to reconstruct team
  - Overall dominated by DP: O(2^s × p)
  - With s ≤ 16 and p ≤ 60: O(2^16 × 60) ≈ 4 million operations

- Space complexity: $$O(2^s + p)$$
  - personSkillMask array: O(p) to store bitmask for each person
  - Three DP arrays: O(2^s) each for minTeamSize, lastPersonAdded, previousState
  - skillToIndex map: O(s)
  - Team result array: O(s) worst case
  - Overall: O(2^s + p)
  - With s ≤ 16: O(65536) ≈ 64KB for integer arrays

# Code
```typescript []
const smallestSufficientTeam = (reqSkills: string[], people: string[][]): number[] => {
    const numSkills = reqSkills.length;
    const numPeople = people.length;
    
    const skillToIndex = new Map<string, number>();
    for (let i = 0; i < numSkills; i++) {
        skillToIndex.set(reqSkills[i], i);
    }
    
    const personSkillMask: number[] = new Array(numPeople).fill(0);
    for (let personIndex = 0; personIndex < numPeople; personIndex++) {
        for (const skill of people[personIndex]) {
            const skillBit = skillToIndex.get(skill)!;
            personSkillMask[personIndex] |= (1 << skillBit);
        }
    }
    
    const INFINITY = 1 << 30;
    const totalStates = 1 << numSkills;
    
    const minTeamSize: number[] = new Array(totalStates).fill(INFINITY);
    const lastPersonAdded: number[] = new Array(totalStates).fill(0);
    const previousState: number[] = new Array(totalStates).fill(0);
    
    minTeamSize[0] = 0;
    
    for (let currentMask = 0; currentMask < totalStates; currentMask++) {
        if (minTeamSize[currentMask] === INFINITY) {
            continue;
        }
        
        for (let personIndex = 0; personIndex < numPeople; personIndex++) {
            const newMask = currentMask | personSkillMask[personIndex];
            
            if (minTeamSize[currentMask] + 1 < minTeamSize[newMask]) {
                minTeamSize[newMask] = minTeamSize[currentMask] + 1;
                lastPersonAdded[newMask] = personIndex;
                previousState[newMask] = currentMask;
            }
        }
    }
    
    const team: number[] = [];
    const fullCoverage = (1 << numSkills) - 1;
    
    for (let mask = fullCoverage; mask !== 0; mask = previousState[mask]) {
        team.push(lastPersonAdded[mask]);
    }
    
    return team;
};
```