const smallestNumber = (n: number, t: number): number => {
    for (let num = n; ; num++) {
        let product = 1;
        for (const ch of String(num)) product *= +ch;
        if (product % t === 0) return num;
    }
};