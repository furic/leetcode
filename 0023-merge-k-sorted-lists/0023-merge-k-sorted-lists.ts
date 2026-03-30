const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
    if (lists.length === 0) return null;
    if (lists.length === 1) return lists[0];

    // Divide and conquer: recursively merge halves until we reach single lists
    const mid = Math.ceil(lists.length / 2);
    let left = mergeKLists(lists.slice(0, mid));
    let right = mergeKLists(lists.slice(mid));

    if (!left) return right;
    if (!right) return left;

    // Pick the smaller head so we have a clean starting node without null checks in the loop
    let head: ListNode;
    if (left.val > right.val) {
        head = right;
        right = right.next;
    } else {
        head = left;
        left = left.next;
    }

    let current = head;
    while (left && right) {
        if (left.val > right.val) {
            current.next = right;
            right = right.next;
        } else {
            current.next = left;
            left = left.next;
        }
        current = current.next!;
    }

    // Attach whichever side still has nodes — no need to walk, they're already linked
    current.next = left ?? right;

    return head;
};