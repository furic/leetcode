function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
    const set = new Set(nums);
    const dummy = new ListNode(0, head);
    let current: ListNode | null = dummy;

    while (current.next != null) {
        if (set.has(current.next.val)) current.next = current.next.next;
        else current = current.next;
    }
    return dummy.next;
}