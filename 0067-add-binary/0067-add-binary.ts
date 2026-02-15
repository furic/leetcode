function addBinary(a: string, b: string): string {
    let result = "";
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry) {
        const bitA = i >= 0 ? parseInt(a[i]) : 0;
        const bitB = j >= 0 ? parseInt(b[j]) : 0;

        const currentSum = bitA + bitB + carry;

        result = (currentSum % 2).toString() + result;

        carry = Math.floor(currentSum / 2);

        i--;
        j--;
    }

    return result;
};