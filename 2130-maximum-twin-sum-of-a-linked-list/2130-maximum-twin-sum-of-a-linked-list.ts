const pairSum = (head: ListNode | null): number => {
    // Find the midpoint
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    // Reverse the second half
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Walk both halves and find max twin sum
    let maxSum = 0;
    let left: ListNode | null = head;
    let right: ListNode | null = prev;
    while (right !== null) {
        maxSum = Math.max(maxSum, left!.val + right.val);
        left = left!.next;
        right = right.next;
    }

    return maxSum;
};