function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
    let ans = n * 2;

    const maskA = 0b1111 << 1;
    const maskB = 0b1111 << 3;
    const maskC = 0b1111 << 5;

    const rows = new Array(n);
    reservedSeats.forEach(([r, c]) => {
        if (c === 1 || c === 10) {
            return;
        }
        
        let row = rows[r - 1] ?? 0;
        const beforeA = (row & maskA) === 0;
        const beforeB = (row & maskB) === 0;
        const beforeC = (row & maskC) === 0;
        row |= (1 << (c - 1));
        const afterA = (row & maskA) === 0;
        const afterB = (row & maskB) === 0;
        const afterC = (row & maskC) === 0;
        rows[r - 1] = row;

        if (beforeA && !afterA) {
            ans--;
        }
        if (beforeC && !afterC) {
            ans--;
        }
        if ((beforeA || beforeC) && !afterA && !afterC && afterB) {
            ans++;
        }
        if (!beforeA && !beforeC && beforeB && !afterB) {
            ans--;
        }
    });

    return ans;
};