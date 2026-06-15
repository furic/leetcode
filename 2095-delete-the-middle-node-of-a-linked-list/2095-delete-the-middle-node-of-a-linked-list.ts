const deleteMiddle = (head: ListNode | null): ListNode | null => {
    if (!head?.next) return null;

    // Count length
    let length = 0;
    for (let p: ListNode | null = head; p; p = p.next) length++;

    // Walk to the node just before the middle
    let prev: ListNode | null = head;
    for (let i = (length >> 1) - 1; i > 0; i--) prev = prev!.next;

    prev!.next = prev!.next!.next;
    return head;
};