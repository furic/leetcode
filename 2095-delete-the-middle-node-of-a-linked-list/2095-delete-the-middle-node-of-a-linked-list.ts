function deleteMiddle(head: ListNode | null): ListNode | null {
    if (!head!.next) return null;
    let mid = 0, p: ListNode | null = head;
    while (p) mid++, p = p.next;
    mid = (mid >> 1) - 1, p = head;
    while (mid) mid--, p = p!.next;
    return (p!.next = p!.next!.next, head);
}