function arrayRankTransform(arr: number[]): number[] {
    const dict = new Map();
    
    for (let n of arr) {
        dict.set(n, 0);
    }
    
    const keys = [...dict.keys()].sort((a, b) => a - b);
    
    for (let i = 0; i < keys.length; i++) {
        dict.set(keys[i], i+1);
    }
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = dict.get(arr[i]);
    }
    
    return arr;
};