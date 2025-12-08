function toBinary(x: number): string {
    let s = "";
    while (x) {
        s += (x % 2).toString();
        x = Math.floor(x / 2);
    }
    return s;
}

function isPalindrome(x: number): boolean {
    const bin = toBinary(x);
    const rev = bin.split("").reverse().join("");
    return bin === rev;
}

function minOperations(nums: number[]): number[] {
    const palindromes: number[] = [];
    for (let i = 1; i <= 5000; i++) {
        if (isPalindrome(i)) palindromes.push(i);
    }

    const ans: number[] = [];
    for (const num of nums) {
        let closest = 5000;
        let l = 0, r = palindromes.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (palindromes[m] <= num) l = m + 1;
            else r = m;
        }

        if (l < palindromes.length) closest = palindromes[l] - num;
        if (l > 0) closest = Math.min(closest, num - palindromes[l - 1]);
        ans.push(closest);
    }
    return ans;
}