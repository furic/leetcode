const minOperations = (s: string): number => 
    s.split('').reduce((max, char) => Math.max(max, (26 - (char.charCodeAt(0) - 'a'.charCodeAt(0))) % 26), 0);