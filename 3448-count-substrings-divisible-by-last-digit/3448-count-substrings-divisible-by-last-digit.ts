const countSubstrings = (s: string): number => {
    const n = s.length;
    let count = 0;

    // Handle digits 1, 2, 5
    for (let i = 0; i < n; i++) {
        const c = s[i];
        if (c === '1' || c === '2' || c === '5') {
            count += i + 1;
        }
    }

    // Handle digits 4
    for (let i = 0; i < n; i++) {
        if (s[i] === '4') {
            if (i === 0) {
                count++;
            } else {
                const lastTwoDigits = parseInt(s[i - 1]) * 10 + 4;
                count += lastTwoDigits % 4 === 0 ? (i + 1) : 1;
            }
        }
    }

    // Handle digits 8
    for (let i = 0; i < n; i++) {
        if (s[i] === '8') {
            if (i === 0) {
                count++;
            } else if (i === 1) {
                const lastTwoDigits = parseInt(s[i - 1]) * 10 + 8;
                count += lastTwoDigits % 8 === 0 ? 2 : 1;
            } else {
                const lastTwoDigits = parseInt(s[i - 1]) * 10 + 8;
                const lastThreeDigits = parseInt(s[i - 2]) * 100 + lastTwoDigits;
                let addCount = 1;
                if (lastTwoDigits % 8 === 0) addCount++;
                if (lastThreeDigits % 8 === 0) addCount += i - 1;
                count += addCount;
            }
        }
    }

    // Handle digits 3 and 6 (mod 3)
    let freq = [1, 0, 0];
    let mod = 0;
    for (let i = 0; i < n; i++) {
        mod = (mod * 10 + parseInt(s[i])) % 3;
        if (s[i] === '3' || s[i] === '6') {
            count += freq[mod];
        }
        freq[mod]++;
    }

    // Handle digits 9 (mod 9)
    freq = [1, 0, 0, 0, 0, 0, 0, 0, 0];
    mod = 0;
    for (let i = 0; i < n; i++) {
        mod = (mod * 10 + parseInt(s[i])) % 9;
        if (s[i] === '9') {
            count += freq[mod];
        }
        freq[mod]++;
    }

    // Handle digits 7 (mod 7 with modular inverse)
    {
        const modInv = (a: number, m: number): number => {
            for (let x = 1; x < m; x++) {
                if ((a * x) % m === 1) return x;
            }
            return 1;
        };

        const power: number[] = Array(n + 1).fill(0);
        const invPower: number[] = Array(n + 1).fill(0);
        power[0] = 1;

        for (let i = 1; i <= n; i++) {
            power[i] = (power[i - 1] * 10) % 7;
        }

        for (let i = 0; i <= n; i++) {
            invPower[i] = modInv(power[i], 7);
        }

        const p = Array(n + 1).fill(0);
        const q = Array(n + 1).fill(0);
        const freq = Array(7).fill(0);

        freq[0] = 1;

        for (let j = 0; j < n; j++) {
            p[j + 1] = (p[j] * 10 + Number(s[j])) % 7;
            q[j + 1] = (p[j + 1] * invPower[j + 1]) % 7;
            if (s[j] === '7') {
                count += freq[q[j + 1]];
            }
            freq[q[j + 1]]++;
        }
    }

    return count;
}