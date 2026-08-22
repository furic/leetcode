function checkDivisibility(n: number): boolean {
    let s: number = 0;
    let p: number = 1;

    const str: string = Math.abs(n).toString();

    for (const ch of str) {
        const d: number = Number(ch);
        s += d;
        p *= d;
    }

    if (n % (s + p) === 0) {
        return true;
    } else {
        return false;
    }
};