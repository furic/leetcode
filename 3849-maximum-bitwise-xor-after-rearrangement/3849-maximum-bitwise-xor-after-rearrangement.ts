function maximumXor(s: string, t: string): string {
    let ones = 0;
    let zeros = 0;
    
    for (let i = 0; i < t.length; i++) {
        if (t[i] === '1') ones++;
        else zeros++;
    }
    
    let result = new Array(s.length);
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0') {
            if (ones > 0) {
                result[i] = '1';
                ones--;
            } else {
                result[i] = '0';
                zeros--;
            }
        } else {
            if (zeros > 0) {
                result[i] = '1';
                zeros--;
            } else {
                result[i] = '0';
                ones--;
            }
        }
    }
    
    return result.join('');
}