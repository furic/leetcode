const maxLength = (nums: number[]): number => {
    let result = 0;
    for (let start = 0; start < nums.length; start++) {
        for (let end = start; end < nums.length; end++) {
            const arr = nums.slice(start, end + 1);
            if (prod(arr) === lcm(arr) * gcd(arr)) {
                result = Math.max(result, arr.length);
            }
        }
    }
    return result;
};

const prod = (numbers: number[]): number => {
    return numbers.reduce((acc, num) => acc * num, 1);
};

const gcdTwoNumbers = (a: number, b: number): number => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const gcd = (arr: number[]): number => {
    return arr.reduce((acc, num) => gcdTwoNumbers(acc, num));
};

const lcmTwoNumbers = (a: number, b: number): number => {
    return (a * b) / gcdTwoNumbers(a, b);
};

const lcm = (arr: number[]): number => {
    return arr.reduce((acc, num) => lcmTwoNumbers(acc, num));
};