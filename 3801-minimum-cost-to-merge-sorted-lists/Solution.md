# Bitmask DP with Subset Medians | 80 Lines | O(3^n × m) | 253ms

# Intuition

The merge order matters for total cost, but the median of a merged list depends only on which original lists are included, not merge order. We can use bitmask DP to try all possible merge sequences while precomputing medians for all subsets of lists.

# Approach

**Key Insight:**
- For any subset of lists, the merged result has a fixed median (determined by globally sorted elements)
- DP state: `dp[mask]` = min cost to merge all lists in bitmask into one

**Precomputation:**
1. Sort all elements globally with their source list index
2. For each subset (bitmask), compute total length and median
3. Median = element at position ⌊(length-1)/2⌋ in the merged sorted list

**DP Transition:**
- For each mask with k lists, try all ways to split into two non-empty subsets
- Cost to merge subsets A and B: `dp[A] + dp[B] + len(A∪B) + |median(A) - median(B)|`
- Take minimum over all valid splits

**Example: lists=[[1,3,5],[2,4],[6,7,8]]**

Subsets:
- {0}: len=3, median=3
- {1}: len=2, median=2
- {2}: len=3, median=7
- {0,1}: len=5, median=3
- {0,1,2}: len=8, median=4

DP:
- Merge {0} and {1}: cost = 3+2+|3-2| = 6, result has median=3
- Merge {0,1} and {2}: cost = 6 + 5+3+|3-7| = 6+12 = 18

Result: 18 ✓

# Complexity

- Time complexity: $$O(3^n \times m)$$
  - n = number of lists, m = total elements
  - Precompute medians: O(2^n × m) to iterate elements for each subset
  - DP: O(3^n) to enumerate all submasks for each mask
  - Overall: O(3^n × m) dominated by DP transitions

- Space complexity: $$O(2^n + m)$$
  - Arrays for subset data: O(2^n)
  - Flattened elements: O(m)
  - Overall: O(2^n + m)

# Code
```typescript []
const minMergeCost = (lists: number[][]): number => {
    const numLists = lists.length;
    const totalSubsets = 1 << numLists;

    const flattenedElements: Array<{ value: number; listIndex: number }> = [];
    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        for (const value of lists[listIdx]) {
            flattenedElements.push({ value, listIndex: listIdx });
        }
    }
    
    flattenedElements.sort((a, b) => a.value - b.value);

    const totalElements = flattenedElements.length;
    const sortedValues = new Int32Array(totalElements);
    const elementListIndices = new Int32Array(totalElements);
    
    for (let i = 0; i < totalElements; i++) {
        sortedValues[i] = flattenedElements[i].value;
        elementListIndices[i] = flattenedElements[i].listIndex;
    }

    const subsetLengths = new Int32Array(totalSubsets);
    const subsetMedians = new Int32Array(totalSubsets);

    for (let mask = 1; mask < totalSubsets; mask++) {
        let totalLength = 0;
        for (let listIdx = 0; listIdx < numLists; listIdx++) {
            if ((mask >> listIdx) & 1) {
                totalLength += lists[listIdx].length;
            }
        }
        subsetLengths[mask] = totalLength;

        const medianPosition = (totalLength - 1) >> 1;
        let elementsCountedInSubset = 0;
        
        for (let elemIdx = 0; elemIdx < totalElements; elemIdx++) {
            const listIndexOfElement = elementListIndices[elemIdx];
            
            if ((mask >> listIndexOfElement) & 1) {
                if (elementsCountedInSubset === medianPosition) {
                    subsetMedians[mask] = sortedValues[elemIdx];
                    break;
                }
                elementsCountedInSubset++;
            }
        }
    }

    const minCostForSubset = new Float64Array(totalSubsets).fill(Infinity);

    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        const singleListMask = 1 << listIdx;
        minCostForSubset[singleListMask] = 0;
    }

    for (let currentMask = 1; currentMask < totalSubsets; currentMask++) {
        if ((currentMask & (currentMask - 1)) === 0) continue;

        const currentTotalLength = subsetLengths[currentMask];
        let bestCostForCurrentMask = Infinity;

        for (let leftSubset = (currentMask - 1) & currentMask; leftSubset > 0; leftSubset = (leftSubset - 1) & currentMask) {
            const rightSubset = currentMask ^ leftSubset;
            
            if (leftSubset < rightSubset) {
                const mergeCost = currentTotalLength + Math.abs(subsetMedians[leftSubset] - subsetMedians[rightSubset]);
                const totalCost = minCostForSubset[leftSubset] + minCostForSubset[rightSubset] + mergeCost;
                
                if (totalCost < bestCostForCurrentMask) {
                    bestCostForCurrentMask = totalCost;
                }
            }
        }
        
        minCostForSubset[currentMask] = bestCostForCurrentMask;
    }

    return minCostForSubset[totalSubsets - 1];
};
```