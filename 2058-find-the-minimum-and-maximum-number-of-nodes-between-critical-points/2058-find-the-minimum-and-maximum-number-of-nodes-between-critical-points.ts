const nodesBetweenCriticalPoints = (head: ListNode | null): number[] => {
    if (!head?.next?.next) return [-1, -1];

    let firstCritical = -1, lastCritical = -1, prevCritical = -1;
    let minDist = Infinity;

    let prev = head, curr = head.next, pos = 1;

    while (curr.next) {
        const isCritical = (curr.val > prev.val && curr.val > curr.next.val) ||
                           (curr.val < prev.val && curr.val < curr.next.val);

        if (isCritical) {
            if (firstCritical === -1) firstCritical = pos;
            else minDist = Math.min(minDist, pos - prevCritical);
            lastCritical = prevCritical = pos;
        }

        prev = curr;
        curr = curr.next;
        pos++;
    }

    if (firstCritical === lastCritical) return [-1, -1];
    return [minDist, lastCritical - firstCritical];
};