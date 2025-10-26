const lexSmallest = (s: string): string => {
    const n = s.length;
    let smallest = s;
    
    // Try reversing first k characters (k from 1 to n)
    for (let k = 1; k <= n; k++) {
        const candidate = s.slice(0, k).split('').reverse().join('') + s.slice(k);
        if (candidate < smallest) {
            smallest = candidate;
        }
    }
    
    // Try reversing last k characters (k from 1 to n)
    for (let k = 1; k <= n; k++) {
        const candidate = s.slice(0, n - k) + s.slice(n - k).split('').reverse().join('');
        if (candidate < smallest) {
            smallest = candidate;
        }
    }
    
    return smallest;
};