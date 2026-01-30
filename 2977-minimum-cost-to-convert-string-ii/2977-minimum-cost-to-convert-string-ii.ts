/**
 * Finds minimum cost to transform source to target using substring substitutions
 * Strategy: 
 * 1. Use Floyd-Warshall to find shortest transformation paths between all pattern pairs
 * 2. Use DP where dp[i] = min cost to transform source[0..i-1] to target[0..i-1]
 * 3. At each position, try all pattern lengths and find matching transformations
 */
const minimumCost = (
    source: string,
    target: string,
    original: string[],
    changed: string[],
    cost: number[]
): number => {
    const stringLength = source.length;

    // Step 1: Collect all unique patterns (substrings that can be transformed)
    const uniquePatterns = new Set<string>();
    for (const pattern of original) uniquePatterns.add(pattern);
    for (const pattern of changed) uniquePatterns.add(pattern);

    const allPatterns = Array.from(uniquePatterns);
    const numPatterns = allPatterns.length;

    // Create pattern → index mapping for graph representation
    const patternToIndex = new Map<string, number>();
    allPatterns.forEach((pattern, index) => patternToIndex.set(pattern, index));

    // Step 2: Build transformation cost graph and run Floyd-Warshall
    // minTransformCost[i][j] = minimum cost to transform pattern i to pattern j
    const minTransformCost: number[][] = Array.from({ length: numPatterns }, 
        () => Array(numPatterns).fill(Infinity)
    );
    
    // Base case: transforming pattern to itself costs 0
    for (let i = 0; i < numPatterns; i++) {
        minTransformCost[i][i] = 0;
    }

    // Add direct transformation costs (keep minimum if multiple exist)
    for (let i = 0; i < original.length; i++) {
        const fromPatternIndex = patternToIndex.get(original[i])!;
        const toPatternIndex = patternToIndex.get(changed[i])!;
        minTransformCost[fromPatternIndex][toPatternIndex] = Math.min(
            minTransformCost[fromPatternIndex][toPatternIndex],
            cost[i]
        );
    }

    // Floyd-Warshall: find shortest paths between all pattern pairs
    for (let intermediate = 0; intermediate < numPatterns; intermediate++) {
        for (let from = 0; from < numPatterns; from++) {
            // Skip if no path to intermediate node
            if (minTransformCost[from][intermediate] === Infinity) continue;
            
            for (let to = 0; to < numPatterns; to++) {
                // Skip if no path from intermediate node
                if (minTransformCost[intermediate][to] === Infinity) continue;
                
                // Check if going through intermediate is cheaper
                const newDistance = minTransformCost[from][intermediate] + 
                                   minTransformCost[intermediate][to];
                if (newDistance < minTransformCost[from][to]) {
                    minTransformCost[from][to] = newDistance;
                }
            }
        }
    }

    // Step 3: Group patterns by length for efficient lookup during DP
    const patternsByLength = new Map<number, string[]>();
    for (const pattern of allPatterns) {
        const patternLength = pattern.length;
        if (!patternsByLength.has(patternLength)) {
            patternsByLength.set(patternLength, []);
        }
        patternsByLength.get(patternLength)!.push(pattern);
    }

    // Step 4: DP on main string
    // minCostUpTo[i] = minimum cost to transform source[0..i-1] to target[0..i-1]
    const minCostUpTo = Array(stringLength + 1).fill(Infinity);
    minCostUpTo[0] = 0; // Base case: empty prefix costs 0

    for (let position = 0; position < stringLength; position++) {
        // Skip if this position is unreachable
        if (minCostUpTo[position] === Infinity) continue;

        // Option 1: If characters already match, no transformation needed
        if (source[position] === target[position]) {
            minCostUpTo[position + 1] = Math.min(
                minCostUpTo[position + 1],
                minCostUpTo[position]
            );
        }

        // Option 2: Try transforming a substring starting at current position
        for (const [patternLength, patterns] of patternsByLength) {
            // Check if pattern would exceed string bounds
            if (position + patternLength > stringLength) continue;

            // Extract substrings from source and target
            const sourceSubstring = source.slice(position, position + patternLength);
            const targetSubstring = target.slice(position, position + patternLength);

            // Check if both substrings are valid patterns
            const sourcePatternIndex = patternToIndex.get(sourceSubstring);
            const targetPatternIndex = patternToIndex.get(targetSubstring);
            if (sourcePatternIndex === undefined || targetPatternIndex === undefined) {
                continue;
            }

            // Get transformation cost between these patterns
            const transformCost = minTransformCost[sourcePatternIndex][targetPatternIndex];
            if (transformCost !== Infinity) {
                minCostUpTo[position + patternLength] = Math.min(
                    minCostUpTo[position + patternLength],
                    minCostUpTo[position] + transformCost
                );
            }
        }
    }

    return minCostUpTo[stringLength] === Infinity ? -1 : minCostUpTo[stringLength];
};
