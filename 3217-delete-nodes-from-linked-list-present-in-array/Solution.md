# Dummy Node with Set Lookup | 27 Lines | O(n + m) | 76ms

# Intuition
We need to remove all linked list nodes whose values appear in the nums array. Using a Set for O(1) lookup of values to remove, combined with a dummy node to simplify head handling, allows us to efficiently traverse and modify the list in a single pass.

# Approach
**Dummy Node with Set-Based Filtering:**
- Convert nums array to a Set for constant-time lookup
- Use a dummy node to avoid special-casing head removal
- Traverse the list, skipping nodes whose values are in the Set
- Return the modified list (starting from dummy.next)

**Step-by-Step Process:**

1. **Preprocess nums Array:**
   - Create `valuesToRemove = new Set(nums)`
   - Enables O(1) lookup: `valuesToRemove.has(value)`
   - Trade O(m) space for O(1) per-node lookup time

2. **Initialize Dummy Node:**
   - `dummyHead = new ListNode(0, head)`
   - Points to original head
   - Simplifies logic when head itself needs removal
   - Final result: `dummyHead.next`

3. **Traverse and Filter:**
   - Start with `currentNode = dummyHead`
   - While `currentNode.next !== null`:
   
   **Check next node's value:**
   - If `valuesToRemove.has(currentNode.next.val)`:
     - Remove: `currentNode.next = currentNode.next.next`
     - Skip the node by bypassing it
     - Don't advance currentNode (check new next node)
   
   - Else (value not in set):
     - Keep: `currentNode = currentNode.next`
     - Advance to next node

4. **Return Modified List:**
   - `dummyHead.next` is the new head
   - Could be null if all nodes removed
   - Could be original head if no removals at start

**Why This Works:**

**Dummy Node Benefits:**
- Eliminates special case for removing head
- Provides consistent previous node reference
- Simplifies code logic significantly

**Set Lookup Efficiency:**
- Without Set: O(m) array search per node → O(n×m) total
- With Set: O(1) lookup per node → O(n+m) total
- Critical optimization for large inputs

**Example Walkthrough (nums = [1,2,3], head = [1,2,3,4,5]):**

- valuesToRemove = {1,2,3}
- dummyHead → 1 → 2 → 3 → 4 → 5

**Iteration 1:**
- currentNode = dummy, next = 1
- 1 in Set? Yes → skip: dummy → 2 → 3 → 4 → 5

**Iteration 2:**
- currentNode = dummy, next = 2
- 2 in Set? Yes → skip: dummy → 3 → 4 → 5

**Iteration 3:**
- currentNode = dummy, next = 3
- 3 in Set? Yes → skip: dummy → 4 → 5

**Iteration 4:**
- currentNode = dummy, next = 4
- 4 in Set? No → advance: currentNode = 4

**Iteration 5:**
- currentNode = 4, next = 5
- 5 in Set? No → advance: currentNode = 5

**Iteration 6:**
- currentNode = 5, next = null
- Exit loop

**Result:** dummyHead.next = 4 → 5 ✓

**Example 2 (nums = [1], head = [1,2,1,2,1,2]):**

- valuesToRemove = {1}
- Process: skip 1, keep 2, skip 1, keep 2, skip 1, keep 2
- Result: [2,2,2] ✓

**Example 3 (nums = [5], head = [1,2,3,4]):**

- valuesToRemove = {5}
- No node has value 5
- All nodes kept
- Result: [1,2,3,4] ✓

**Key Insights:**

**Why Not Advance After Removal:**
- After skipping a node, `currentNode.next` points to a new node
- Must check this new node before advancing
- Otherwise, might skip checking valid nodes

**Memory Management:**
- Removed nodes become unreachable (garbage collected)
- No explicit deletion needed in JavaScript/TypeScript
- Just update pointers to bypass nodes

**Edge Cases:**

**All nodes removed:**
- nums = [1,2,3], head = [1,2,3]
- Result: null (dummyHead.next = null)

**No nodes removed:**
- nums = [5], head = [1,2,3]
- Result: [1,2,3] (original list)

**Remove only head:**
- nums = [1], head = [1,2,3]
- Dummy node handles cleanly
- Result: [2,3]

**Remove only tail:**
- nums = [3], head = [1,2,3]
- Result: [1,2]

**Single node list:**
- If should remove: return null
- If should keep: return original

**Alternative Approaches:**

**Recursive:**
```typescript
const modifiedList = (nums, head) => {
    if (!head) return null;
    head.next = modifiedList(nums, head.next);
    return valuesToRemove.has(head.val) ? head.next : head;
};
```
- Elegant but uses O(n) stack space
- Our iterative approach: O(1) extra space (excluding Set)

**Two-Pass:**
- First pass: mark nodes to remove
- Second pass: rebuild list
- More complex, no benefit

**Without Dummy:**
```typescript
// Handle head separately
while (head && valuesToRemove.has(head.val)) {
    head = head.next;
}
// Then process rest
```
- More code, more error-prone
- Dummy node is cleaner

# Complexity
- Time complexity: $$O(n + m)$$ where n = list length, m = nums length (O(m) to build Set, O(n) to traverse list)
- Space complexity: $$O(m)$$ for the Set storing values to remove

# Code
```typescript
const modifiedList = (nums: number[], head: ListNode | null): ListNode | null => {
    const valuesToRemove = new Set(nums);
    const dummyHead = new ListNode(0, head);
    let currentNode: ListNode | null = dummyHead;

    while (currentNode.next !== null) {
        if (valuesToRemove.has(currentNode.next.val)) {
            currentNode.next = currentNode.next.next;
        } else {
            currentNode = currentNode.next;
        }
    }

    return dummyHead.next;
};
```