function kthCharacter(k: number, operations: number[]): string {
    let ans = 0;
    while (k !== 1) {
        let t = Math.floor(Math.log2(k));
        if (Number(1n << BigInt(t)) === k) {
            t--;
        }
        k -= Number(1n << BigInt(t));
        if (operations[t]) {
            ans++;
        }
    }
    return String.fromCharCode("a".charCodeAt(0) + (ans % 26));
};