function minNumber(nums1: number[], nums2: number[]): number {
    let smallest = Infinity;
    let pointer = 0;
    for (let num of nums1){
        for (let num2 of nums2) {
            if (num === num2) {
                smallest = Math.min(smallest, num)
            } else {
                const val = num < num2 ? `${num}${num2}` : `${num2}${num}`
                smallest = Math.min(smallest, parseInt(val))
            }
        }
    }
    return smallest;
};