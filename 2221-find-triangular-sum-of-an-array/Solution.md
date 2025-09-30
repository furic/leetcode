# In-place Layer Reduction | 8 Lines | O(n²) | 39ms

# Intuition
The triangular sum requires repeatedly combining adjacent elements until only one remains. Each iteration reduces the array size by one, forming a triangle pattern where each element in a new layer is the sum of two adjacent elements from the previous layer.

# Approach
Process the array in-place by iterating through layers from the bottom up. For each layer, compute the sum of adjacent pairs modulo 10 and store the result in the current position. After all layers are processed, the first element contains the triangular sum. This avoids creating new arrays for each layer.

# Complexity
- Time complexity: $$O(n^2)$$ where n is the length of the input array
- Space complexity: $$O(1)$$ using in-place modification

# Code
```typescript
const triangularSum = (nums: number[]): number => {
    for (let currentLayerSize = nums.length - 1; currentLayerSize >= 1; currentLayerSize--) {
        for (let position = 0; position < currentLayerSize; position++) {
            nums[position] = (nums[position] + nums[position + 1]) % 10;
        }
    }
    
    return nums[0];
};
```