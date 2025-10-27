function numberOfBeams(bank: string[]) {
    let res = 0, prev = 0;
    for (const floor of bank) {
        const curr = floor.replaceAll('0', '').length;
        res += prev * curr;
        prev = curr || prev;
    }
    return res;
}