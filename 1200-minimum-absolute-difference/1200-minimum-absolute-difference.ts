function minimumAbsDifference(arr: number[]): number[][] {
    // sort first and then only adjacent numbers can make miminal difference.
    
    // count sort still makes the most sense as K is not large compared to the array length.
    // space - O(2n)
    // complexity - O(4n) (may be up to 5n if min -> 0 == 0 -> max)
    
    // find min, max
    let min = Infinity
    let max = -Infinity
    
    for (const n of arr) {
        min = Math.min(min, n)
        max = Math.max(max, n)
    }
    
    const minNorm = Math.min(min, 0)
    const temp = new Array(max - minNorm + 1).fill(0)
    const offset = Math.abs(minNorm)
    
    for (const n of arr) {
        temp[n + offset] += 1
    }
    
    let minDiff = Infinity
    let j = 0
    
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] > 0) {
            arr[j] = i - offset

            if (j > 0) {
                minDiff = Math.min(minDiff, arr[j] - arr[j - 1])
            }

            j += 1
        }
    }
    
    const res: [number, number][] = []

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === minDiff) {
            res.push([arr[i - 1], arr[i]])
        }
    }
    
    return res
};