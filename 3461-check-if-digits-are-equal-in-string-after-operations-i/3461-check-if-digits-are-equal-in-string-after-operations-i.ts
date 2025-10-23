function hasSameDigits(s: string): boolean {
    let n = s.length;
    let arr: string[] = s.split("");

    for (let i = 1; i <= n - 2; i++) {
        for (let j = 0; j <= n - 1 - i; j++) {
            arr[j] = String((parseInt(arr[j]) + parseInt(arr[j + 1])) % 10);
        }
    }
    return arr[0] === arr[1];
};