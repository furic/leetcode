# Floyd-Warshall + DP on Substrings | 95 Lines | O(p³ + n²×p) | 186ms

# Intuition

Combine Floyd-Warshall for pattern transformations with DP for string transformation. Floyd-Warshall finds minimum costs between all pattern pairs, while DP decides which substring transformations to apply at each position.

# Approach

**Three-Step Algorithm:**

1. **Pattern Graph (Floyd-Warshall):**
   - Collect all unique patterns from original/changed arrays
   - Build graph: edge from pattern A to B with transformation cost
   - Run Floyd-Warshall to find minimum multi-step transformation costs

2. **Group Patterns by Length:**
   - Organize patterns by length for efficient DP lookup
   - Avoids checking impossible length matches

3. **DP on String:**
   - `dp[i]` = min cost to transform source[0..i-1] to target[0..i-1]
   - At each position:
     - If chars match: extend with cost 0
     - Try all pattern lengths: check if substring matches a transformable pattern pair

**Why This Works:**
- Floyd-Warshall handles multi-step pattern transformations (A→B→C cheaper than direct A→C)
- DP ensures optimal combination of non-overlapping transformations
- Grouping by length optimizes substring matching

**Example: source="abcd", target="acbe"**

Patterns: {a,b,c,d,e}
Floyd-Warshall finds: c→e→b costs 3 (cheaper than direct c→b)

DP:
- dp[0]=0
- dp[1]: a=a, cost=0
- dp[2]: b→c costs 5, total=5
- dp[3]: c→b costs 3, total=8
- dp[4]: d→e costs 20, total=28

Result: 28 ✓

# Complexity

- Time complexity: $$O(p^3 + n^2 \times p)$$
  - p = number of unique patterns
  - Build pattern graph: O(m) where m = transformations
  - Floyd-Warshall: O(p³)
  - DP: O(n) positions × O(n) pattern lengths × O(p) patterns = O(n²p)
  - Overall: O(p³ + n²p)

- Space complexity: $$O(p^2 + n)$$
  - Floyd-Warshall matrix: O(p²)
  - DP array: O(n)
  - Pattern maps: O(p)
  - Overall: O(p² + n)

# Code
```typescript []
const minimumCost = (
    source: string,
    target: string,
    original: string[],
    changed: string[],
    cost: number[]
): number => {
    const stringLength = source.length;

    const uniquePatterns = new Set<string>();
    for (const pattern of original) uniquePatterns.add(pattern);
    for (const pattern of changed) uniquePatterns.add(pattern);

    const allPatterns = Array.from(uniquePatterns);
    const numPatterns = allPatterns.length;

    const patternToIndex = new Map<string, number>();
    allPatterns.forEach((pattern, index) => patternToIndex.set(pattern, index));

    const minTransformCost: number[][] = Array.from({ length: numPatterns }, 
        () => Array(numPatterns).fill(Infinity)
    );
    
    for (let i = 0; i < numPatterns; i++) {
        minTransformCost[i][i] = 0;
    }

    for (let i = 0; i < original.length; i++) {
        const fromPatternIndex = patternToIndex.get(original[i])!;
        const toPatternIndex = patternToIndex.get(changed[i])!;
        minTransformCost[fromPatternIndex][toPatternIndex] = Math.min(
            minTransformCost[fromPatternIndex][toPatternIndex],
            cost[i]
        );
    }

    for (let intermediate = 0; intermediate < numPatterns; intermediate++) {
        for (let from = 0; from < numPatterns; from++) {
            if (minTransformCost[from][intermediate] === Infinity) continue;
            
            for (let to = 0; to < numPatterns; to++) {
                if (minTransformCost[intermediate][to] === Infinity) continue;
                
                const newDistance = minTransformCost[from][intermediate] + 
                                   minTransformCost[intermediate][to];
                if (newDistance < minTransformCost[from][to]) {
                    minTransformCost[from][to] = newDistance;
                }
            }
        }
    }

    const patternsByLength = new Map<number, string[]>();
    for (const pattern of allPatterns) {
        const patternLength = pattern.length;
        if (!patternsByLength.has(patternLength)) {
            patternsByLength.set(patternLength, []);
        }
        patternsByLength.get(patternLength)!.push(pattern);
    }

    const minCostUpTo = Array(stringLength + 1).fill(Infinity);
    minCostUpTo[0] = 0;

    for (let position = 0; position < stringLength; position++) {
        if (minCostUpTo[position] === Infinity) continue;

        if (source[position] === target[position]) {
            minCostUpTo[position + 1] = Math.min(
                minCostUpTo[position + 1],
                minCostUpTo[position]
            );
        }

        for (const [patternLength, patterns] of patternsByLength) {
            if (position + patternLength > stringLength) continue;

            const sourceSubstring = source.slice(position, position + patternLength);
            const targetSubstring = target.slice(position, position + patternLength);

            const sourcePatternIndex = patternToIndex.get(sourceSubstring);
            const targetPatternIndex = patternToIndex.get(targetSubstring);
            if (sourcePatternIndex === undefined || targetPatternIndex === undefined) {
                continue;
            }

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
```