const rotateRight = (head: ListNode | null, k: number): ListNode | null => {
    if (!head || !head.next) return head;

    // Find tail and length in one pass
    let tail = head;
    let length = 1;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    const effectiveK = k % length;
    if (effectiveK === 0) return head;

    // Find the new tail: (length - effectiveK - 1) steps from head
    let newTail = head;
    for (let i = 0; i < length - effectiveK - 1; i++)
        newTail = newTail.next!;

    const newHead = newTail.next!;
    tail.next = head;
    newTail.next = null;

    return newHead;
};