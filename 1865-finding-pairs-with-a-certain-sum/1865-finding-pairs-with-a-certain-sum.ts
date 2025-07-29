class FindSumPairs {
    private nums1: number[];
    private nums2: number[];
    private freqMap: Map<number, number>;

    constructor(nums1: number[], nums2: number[]) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        this.freqMap = new Map();

        for (const num of nums2) {
            this.freqMap.set(num, (this.freqMap.get(num) ?? 0) + 1);
        }
    }

    add(index: number, val: number): void {
        const prevVal = this.nums2[index];
        this.freqMap.set(prevVal, this.freqMap.get(prevVal)! - 1);

        this.nums2[index] += val;
        const updatedVal = this.nums2[index];
        this.freqMap.set(updatedVal, (this.freqMap.get(updatedVal) ?? 0) + 1);
    }

    count(targetSum: number): number {
        let pairCount = 0;

        for (const num of this.nums1) {
            const requiredNum = targetSum - num;
            pairCount += this.freqMap.get(requiredNum) ?? 0;
        }

        return pairCount;
    }
}