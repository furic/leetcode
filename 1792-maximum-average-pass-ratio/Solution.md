# Priority Queue Greedy Assignment | 30 Lines | O(k log n) | 460ms

# Intuition
To maximize the average pass ratio, we should assign extra students to classes where adding one student provides the greatest improvement in pass ratio. The key insight is that the improvement gain from adding one student to a class with p passing out of t total is: (p+1)/(t+1) - p/t. This creates a greedy optimization problem where we repeatedly choose the class with the highest potential improvement.

# Approach
I'll use a greedy algorithm with a priority queue (max heap):

1. **Calculate Initial Gains**: For each class, compute the improvement gain from adding one student. The gain for a class with p passing students out of t total is: (p+1)/(t+1) - p/t.

2. **Max Heap Priority Queue**: Store classes in a max heap ordered by their improvement gain. This allows us to efficiently find the class that benefits most from an additional student.

3. **Greedy Assignment**: For each extra student:
   - Extract the class with highest improvement gain
   - Add one student to that class (both passing and total counts increase)
   - Recalculate the new improvement gain for this updated class
   - Insert the updated class back into the heap

4. **Final Calculation**: After distributing all extra students, calculate the average pass ratio across all classes.

This greedy approach works because the marginal improvement function is concave - each additional student to the same class provides diminishing returns.

# Complexity
- Time complexity: $$O(k \log n + n \log n)$$
  - Initial heap construction: O(n log n) for n classes
  - k iterations of extract-max, update, and insert: O(k log n)
  - Final average calculation: O(n)
  - Total: O((k + n) log n)

- Space complexity: $$O(n)$$
  - Priority queue stores all n classes with their current state
  - Each heap entry contains passing count, total count, and gain value
  - No additional data structures that scale beyond the number of classes

# Code
```typescript []
const maxAverageRatio = (classes: number[][], extraStudents: number): number => {
    const maxHeap = new PriorityQueue<[number, number, number]>((a, b) => b[2] - a[2]);

    for (const [passingStudents, totalStudents] of classes) {
        const currentRatio = passingStudents / totalStudents;
        const improvedRatio = (passingStudents + 1) / (totalStudents + 1);
        const improvementGain = improvedRatio - currentRatio;
        maxHeap.push([passingStudents, totalStudents, improvementGain]);
    }

    let remainingStudents = extraStudents;
    while (remainingStudents > 0) {
        const [passingStudents, totalStudents, _] = maxHeap.pop();
        
        const newPassingStudents = passingStudents + 1;
        const newTotalStudents = totalStudents + 1;
        
        const currentRatio = newPassingStudents / newTotalStudents;
        const improvedRatio = (newPassingStudents + 1) / (newTotalStudents + 1);
        const newImprovementGain = improvedRatio - currentRatio;
        
        maxHeap.push([newPassingStudents, newTotalStudents, newImprovementGain]);
        remainingStudents--;
    }

    let totalPassRatio = 0;
    while (maxHeap.size() > 0) {
        const [passingStudents, totalStudents, _] = maxHeap.pop();
        totalPassRatio += passingStudents / totalStudents;
    }
    
    return totalPassRatio / classes.length;
};
```