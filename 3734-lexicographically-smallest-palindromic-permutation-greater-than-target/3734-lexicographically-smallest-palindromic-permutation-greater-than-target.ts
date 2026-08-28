function lexPalindromicPermutation(s: string, target: string): string {
    const n: number = s.length;
    const freq: number[] = new Array(26).fill(0);

    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    let middle: string = "";

    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 === 1) {
            if (middle !== "") {
                return "";
            }

            middle = String.fromCharCode(97 + i);
        }

        freq[i] = Math.floor(freq[i] / 2);
    }

    const halfLen: number = Math.floor(n / 2);
    const half: string[] = [];

    let matched: number = 0;

    while (matched < halfLen) {
        const c: number = target.charCodeAt(matched) - 97;

        if (freq[c] === 0) {
            break;
        }

        freq[c]--;
        half.push(String.fromCharCode(97 + c));
        matched++;
    }

    let i: number = matched;

    while (i >= 0) {
        if (i < halfLen) {
            const start: number = target.charCodeAt(i) - 97 + 1;

            for (let c = start; c < 26; c++) {
                if (freq[c] === 0) {
                    continue;
                }

                freq[c]--;

                let suffix: string = "";

                for (let j = 0; j < 26; j++) {
                    suffix += String.fromCharCode(97 + j).repeat(freq[j]);
                }

                const left: string = half.slice(0, i).join("") + String.fromCharCode(97 + c) + suffix;
                const candidate: string = left + middle + [...left].reverse().join("");

                if (candidate > target) {
                    return candidate;
                }

                freq[c]++;
            }
        }

        if (i === halfLen) {
            const left: string = half.join("");
            const candidate: string = left + middle + [...left].reverse().join("");

            if (candidate > target) {
                return candidate;
            }
        }

        i--;

        if (i >= 0) {
            const c: number = half[i].charCodeAt(0) - 97;
            freq[c]++;
            half.pop();
        }
    }

    return "";
}