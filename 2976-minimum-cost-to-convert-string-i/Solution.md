# Floyd-Warshall with Character Mapping | 45 Lines | O(26³ + n) | 44ms

# Intuition

Precompute minimum transformation costs between all character pairs using Floyd-Warshall algorithm. Then for each position, look up the precomputed cost to transform source[i] to target[i].

# Approach

**Floyd-Warshall Preprocessing:**
1. Build 26×26 distance matrix for all lowercase letters
2. Initialize diagonal to 0 (char→same char costs 0)
3. Add direct transformation edges with minimum costs
4. Run Floyd-Warshall to find shortest paths through intermediate characters

**Total Cost Calculation:**
- For each position i in strings:
  - Look up cost[source[i]][target[i]]
  - If infinite (impossible), return -1
  - Sum all costs

**Why Floyd-Warshall:**
- Finds all-pairs shortest paths in O(V³)
- V = 26 letters (constant)
- Handles multi-step transformations (a→c→b cheaper than direct a→b)

**Example: source="abcd", target="acbe"**

Build graph:
- a→b (cost 2)
- b→c (cost 5)
- c→b (cost 5), c→e (cost 1)
- e→b (cost 2)
- d→e (cost 20)

Floyd-Warshall finds:
- c→e→b (cost 3) cheaper than direct c→b (cost 5)

Transform:
- a→a: 0
- b→c: 5
- c→b: 3 (via e)
- d→e: 20

Total: 28 ✓

# Complexity

- Time complexity: $$O(26^3 + n + m)$$
  - Build matrix: O(m) where m = transformations
  - Floyd-Warshall: O(26³) = O(1) constant
  - Sum costs: O(n) where n = string length
  - Overall: O(n + m)

- Space complexity: $$O(26^2)$$
  - Distance matrix: O(26×26) = O(1) constant
  - Overall: O(1)

# Code
```typescript []
const minimumCost = (
    source: string,
    target: string,
    original: string[],
    changed: string[],
    cost: number[]
): number => {
    const NUM_LETTERS = 26;
    const CHAR_CODE_A = 97;
    
    const minTransformCost = Array.from({ length: NUM_LETTERS }, 
        () => Array(NUM_LETTERS).fill(Infinity)
    );

    for (let char = 0; char < NUM_LETTERS; char++) {
        minTransformCost[char][char] = 0;
    }

    for (let i = 0; i < original.length; i++) {
        const fromChar = original[i].charCodeAt(0) - CHAR_CODE_A;
        const toChar = changed[i].charCodeAt(0) - CHAR_CODE_A;
        minTransformCost[fromChar][toChar] = Math.min(
            minTransformCost[fromChar][toChar],
            cost[i]
        );
    }

    for (let intermediate = 0; intermediate < NUM_LETTERS; intermediate++) {
        for (let from = 0; from < NUM_LETTERS; from++) {
            for (let to = 0; to < NUM_LETTERS; to++) {
                minTransformCost[from][to] = Math.min(
                    minTransformCost[from][to],
                    minTransformCost[from][intermediate] + minTransformCost[intermediate][to]
                );
            }
        }
    }

    let totalCost = 0;
    
    for (let position = 0; position < source.length; position++) {
        const sourceChar = source.charCodeAt(position) - CHAR_CODE_A;
        const targetChar = target.charCodeAt(position) - CHAR_CODE_A;
        
        if (minTransformCost[sourceChar][targetChar] === Infinity) {
            return -1;
        }
        
        totalCost += minTransformCost[sourceChar][targetChar];
    }

    return totalCost;
};
```