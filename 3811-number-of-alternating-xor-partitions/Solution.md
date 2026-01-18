# Prefix XOR DP with Map | 38 Lines | O(n) | 33ms

# Intuition

Track partitions ending with target1 or target2 blocks. Use prefix XOR to find blocks with target XOR values. For each position, calculate ways to reach it via target1 or target2 blocks, using a map to aggregate DP values by prefix XOR.

# Approach

**Prefix XOR:**
- prefixXOR[i] = XOR of nums[0..i-1]
- Block [j,i) has XOR = prefixXOR[i] ^ prefixXOR[j]

**DP States:**
- dp1[i] = ways to partition nums[0..i-1] ending with target1 block
- dp2[i] = ways to partition nums[0..i-1] ending with target2 block

**Transitions:**
- For block [j,i) with XOR = target1:
  - If j=0: dp1[i] += 1 (first block)
  - Else: dp1[i] += dp2[j] (previous block was target2)
- For block [j,i) with XOR = target2:
  - dp2[i] += dp1[j] (previous block must be target1)

**Map Optimization:**
- Instead of iterating all j, group by prefixXOR[j]
- For target1: need prefixXOR[j] = prefixXOR[i] ^ target1
- Aggregate sum of dp2 values for that XOR
- Similarly for target2

**Example: nums=[1,0,0], target1=1, target2=0**

Prefix XOR: [0,1,1,1]

i=1 (XOR=1):
- Block [0,1) XOR=1: dp1=1
- Map: {1: {dp1:1, dp2:0}}

i=2 (XOR=1):
- Block [0,2) XOR=1: dp1=1
- Block [1,2) XOR=0: dp2=dp1[1]=1
- Map: {1: {dp1:2, dp2:1}}

i=3 (XOR=1):
- Block [0,3) XOR=1: dp1=1
- Block [1,3) XOR=0: dp2=dp1[1]=2
- Block [2,3) XOR=0: dp2+=dp1[1]=1
- Total: dp1=1, dp2=2

Result: (1+2)=3 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Compute prefix XOR: O(n)
  - Process each position: O(1) amortized per map operation
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Prefix XOR array: O(n)
  - Map: O(n) unique XOR values
  - Overall: O(n)

# Code
```typescript []
const alternatingXOR = (nums: number[], target1: number, target2: number): number => {
    const MOD = 1e9 + 7;
    const n = nums.length;
    
    const prefixXOR = [0];
    for (let i = 0; i < n; i++) {
        prefixXOR.push(prefixXOR[i] ^ nums[i]);
    }
    
    const dpSums = new Map<number, {dp1: number, dp2: number}>();
    dpSums.set(0, {dp1: 0, dp2: 0});
    
    let result = 0;
    
    for (let i = 1; i <= n; i++) {
        const currentXOR = prefixXOR[i];
        let dp1 = 0, dp2 = 0;
        
        const neededXOR1 = currentXOR ^ target1;
        if (neededXOR1 === 0) dp1 = 1;
        if (dpSums.has(neededXOR1)) {
            dp1 = (dp1 + dpSums.get(neededXOR1).dp2) % MOD;
        }
        
        const neededXOR2 = currentXOR ^ target2;
        if (dpSums.has(neededXOR2)) {
            dp2 = (dp2 + dpSums.get(neededXOR2).dp1) % MOD;
        }
        
        if (!dpSums.has(currentXOR)) {
            dpSums.set(currentXOR, {dp1: 0, dp2: 0});
        }
        const current = dpSums.get(currentXOR);
        current.dp1 = (current.dp1 + dp1) % MOD;
        current.dp2 = (current.dp2 + dp2) % MOD;
        
        if (i === n) result = (dp1 + dp2) % MOD;
    }
    
    return result;
}
```