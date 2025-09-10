# Greedy Coverage | 38 Lines | O(m·k) | 48ms

# Intuition
The problem asks us to minimize the number of users to teach so that all friendships can communicate. If two friends already share a common language, they don’t need help. Otherwise, both users are candidates for needing a new language. To minimize the teaching effort, we should teach the language that is already known by the largest number of these problematic users.

# Approach
1. Iterate through each friendship. If the pair does not share a language, add both users to a set of users needing help.  
2. For all users in this set, count how many of them already know each language.  
3. The best choice is to teach the language that covers the maximum number of problematic users.  
4. The minimum number of users to teach is the size of the problematic user set minus this maximum coverage.  

# Complexity
- Time complexity: $$O(m \cdot k)$$ where `m` is the number of friendships and `k` is the average number of languages per user.  
- Space complexity: $$O(n + u \cdot k)$$ for frequency tracking and storing user languages.  

# Code
```typescript
const minimumTeachings = (
    totalLanguages: number,
    userLanguages: number[][],
    friendships: number[][]
): number => {
    const usersNeedingHelp = new Set<number>();

    for (const [userA, userB] of friendships) {
        const knownByA = new Set(userLanguages[userA - 1]);
        let canCommunicate = false;

        for (const lang of userLanguages[userB - 1]) {
            if (knownByA.has(lang)) {
                canCommunicate = true;
                break;
            }
        }

        if (!canCommunicate) {
            usersNeedingHelp.add(userA - 1);
            usersNeedingHelp.add(userB - 1);
        }
    }

    const languageFrequency = new Array(totalLanguages + 1).fill(0);
    let maxCoverage = 0;

    for (const user of usersNeedingHelp) {
        for (const lang of userLanguages[user]) {
            languageFrequency[lang]++;
            maxCoverage = Math.max(maxCoverage, languageFrequency[lang]);
        }
    }

    return usersNeedingHelp.size - maxCoverage;
};
```