function scoreBalance(s: string): boolean {
    const len = s.length;
    let total = 0;

    for (let i = 0; i < len; i++) {
        total += s.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
    }

    let left = 0;
    for (let i = 0; i < len - 1; i++) {
        left += s.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
        if (left === total - left) return true;
    }

    return false;
}