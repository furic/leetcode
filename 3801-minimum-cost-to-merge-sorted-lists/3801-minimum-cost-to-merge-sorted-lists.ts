/**
 * Finds minimum cost to merge all lists into one sorted list
 * Uses bitmask DP to try all possible merge orders
 * 
 * Key insight: The median of a merged list depends only on which original lists are included,
 * not the order they were merged. So we can precompute medians for all subsets.
 * 
 * Cost formula: len(a) + len(b) + |median(a) - median(b)|
 * 
 * Strategy:
 * 1. Precompute lengths and medians for all possible subsets (2^n states)
 * 2. Use DP: dp[mask] = min cost to merge all lists in mask into one
 * 3. Try all ways to split mask into two parts, pick minimum cost
 */
const minMergeCost = (lists: number[][]): number => {
    const numLists = lists.length;
    const totalSubsets = 1 << numLists; // 2^numLists possible subsets

    // Flatten all lists with their source list index for median calculation
    const flattenedElements: Array<{ value: number; listIndex: number }> = [];
    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        for (const value of lists[listIdx]) {
            flattenedElements.push({ value, listIndex: listIdx });
        }
    }
    
    // Sort all elements globally - needed for efficient median finding
    flattenedElements.sort((a, b) => a.value - b.value);

    // Convert to TypedArrays for better performance with large datasets
    const totalElements = flattenedElements.length;
    const sortedValues = new Int32Array(totalElements);
    const elementListIndices = new Int32Array(totalElements);
    
    for (let i = 0; i < totalElements; i++) {
        sortedValues[i] = flattenedElements[i].value;
        elementListIndices[i] = flattenedElements[i].listIndex;
    }

    // Precompute for each subset: total length and median value
    const subsetLengths = new Int32Array(totalSubsets);
    const subsetMedians = new Int32Array(totalSubsets);

    // For each possible subset of lists (represented as bitmask)
    for (let mask = 1; mask < totalSubsets; mask++) {
        // Calculate total length of merged list for this subset
        let totalLength = 0;
        for (let listIdx = 0; listIdx < numLists; listIdx++) {
            if ((mask >> listIdx) & 1) {
                totalLength += lists[listIdx].length;
            }
        }
        subsetLengths[mask] = totalLength;

        // Find median: element at position (length-1)/2 in sorted merged list
        const medianPosition = (totalLength - 1) >> 1;
        let elementsCountedInSubset = 0;
        
        // Iterate through globally sorted elements, counting only those in current subset
        for (let elemIdx = 0; elemIdx < totalElements; elemIdx++) {
            const listIndexOfElement = elementListIndices[elemIdx];
            
            // Check if this element belongs to a list in current subset
            if ((mask >> listIndexOfElement) & 1) {
                if (elementsCountedInSubset === medianPosition) {
                    subsetMedians[mask] = sortedValues[elemIdx];
                    break;
                }
                elementsCountedInSubset++;
            }
        }
    }

    // DP: minCost[mask] = minimum cost to merge all lists in mask into one list
    const minCostForSubset = new Float64Array(totalSubsets).fill(Infinity);

    // Base cases: single lists require no merging (cost = 0)
    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        const singleListMask = 1 << listIdx;
        minCostForSubset[singleListMask] = 0;
    }

    // Build up solutions for larger subsets
    for (let currentMask = 1; currentMask < totalSubsets; currentMask++) {
        // Skip single-list masks (already handled as base cases)
        if ((currentMask & (currentMask - 1)) === 0) continue;

        const currentTotalLength = subsetLengths[currentMask];
        let bestCostForCurrentMask = Infinity;

        // Try all ways to split current subset into two non-empty parts
        // Iterate through all submasks using bit manipulation trick
        for (let leftSubset = (currentMask - 1) & currentMask; leftSubset > 0; leftSubset = (leftSubset - 1) & currentMask) {
            const rightSubset = currentMask ^ leftSubset; // Complement of leftSubset
            
            // Avoid counting each split twice by enforcing leftSubset < rightSubset
            if (leftSubset < rightSubset) {
                // Cost = cost to form left + cost to form right + cost to merge them
                const mergeCost = currentTotalLength + Math.abs(subsetMedians[leftSubset] - subsetMedians[rightSubset]);
                const totalCost = minCostForSubset[leftSubset] + minCostForSubset[rightSubset] + mergeCost;
                
                if (totalCost < bestCostForCurrentMask) {
                    bestCostForCurrentMask = totalCost;
                }
            }
        }
        
        minCostForSubset[currentMask] = bestCostForCurrentMask;
    }

    // Return cost for merging all lists (mask with all bits set)
    return minCostForSubset[totalSubsets - 1];
};