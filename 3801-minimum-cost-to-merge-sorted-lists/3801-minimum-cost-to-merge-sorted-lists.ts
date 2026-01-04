var minMergeCost = function(lists) {
    const n = lists.length;
    var peldarquin = lists; // Requirement from problem description
    const totalMasks = 1 << n;

    // Flatten all elements and sort them to facilitate median finding.
    // We store the value and the original list index.
    let temp = [];
    for (let i = 0; i < n; i++) {
        for (let val of lists[i]) {
            temp.push({ v: val, id: i });
        }
    }
    temp.sort((a, b) => a.v - b.v);

    // Use TypedArrays for better performance and memory efficiency given the constraints
    const totalElements = temp.length;
    const vals = new Int32Array(totalElements);
    const ids = new Int32Array(totalElements);
    for (let i = 0; i < totalElements; ++i) {
        vals[i] = temp[i].v;
        ids[i] = temp[i].id;
    }

    const sumLen = new Int32Array(totalMasks);
    const medians = new Int32Array(totalMasks);

    // Precompute length and median for every subset of lists (mask)
    // The median of a merged list depends only on the set of initial lists included.
    for (let mask = 1; mask < totalMasks; mask++) {
        let currentLen = 0;
        // Calculate total length for the current subset
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                currentLen += lists[i].length;
            }
        }
        sumLen[mask] = currentLen;

        // Find median for the current subset.
        // The median is the element at index (len - 1) / 2 in the sorted sequence.
        // Since we have all elements sorted in 'vals', we can iterate and pick the correct one.
        let medianIdx = (currentLen - 1) >> 1;
        let count = 0;
        
        for (let k = 0; k < totalElements; k++) {
            // Check if the current element belongs to one of the lists in the mask
            if ((mask >> ids[k]) & 1) {
                if (count === medianIdx) {
                    medians[mask] = vals[k];
                    break;
                }
                count++;
            }
        }
    }

    // DP array to store min cost for each mask.
    // dp[mask] = min cost to merge the subset of lists represented by mask into a single list.
    const dp = new Float64Array(totalMasks).fill(Infinity);

    // Base cases: single lists have 0 merge cost
    for (let i = 0; i < n; i++) {
        dp[1 << i] = 0;
    }

    // Iterate through all masks to compute DP values
    for (let mask = 1; mask < totalMasks; mask++) {
        // Skip if mask represents a single list (already 0)
        if ((mask & (mask - 1)) === 0) continue;

        let currentSumLen = sumLen[mask];
        let best = Infinity;

        // Iterate over all submasks s to find the optimal split.
        // We iterate s = (mask - 1) & mask to go through all subsets s of mask.
        // We only consider pairs {s, complement} once by enforcing s < complement.
        for (let s = (mask - 1) & mask; s > 0; s = (s - 1) & mask) {
            let complement = mask ^ s;
            
            if (s < complement) {
                // The cost is the cost to form s, plus cost to form complement,
                // plus the cost to merge s and complement.
                let cost = dp[s] + dp[complement] + currentSumLen + Math.abs(medians[s] - medians[complement]);
                if (cost < best) {
                    best = cost;
                }
            }
        }
        dp[mask] = best;
    }

    return dp[totalMasks - 1];
};