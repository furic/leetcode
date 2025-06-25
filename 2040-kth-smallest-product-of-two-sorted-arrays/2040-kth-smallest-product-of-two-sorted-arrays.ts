const kthSmallestProduct = (nums1: number[], nums2: number[], k: number): number => {
    const splitBySign = (arr: number[]): [number[], number[]] => {
        const negatives: number[] = [];
        const positives: number[] = [];
        for (const num of arr) {
            if (num < 0) negatives.push(-num); // store as positive for easier processing
            else positives.push(num);
        }
        negatives.reverse(); // sort descending by magnitude → ascending order of real negative values
        return [negatives, positives];
    };

    const countProductsNoGreaterThan = (arr1: number[], arr2: number[], maxProduct: number): number => {
        let count = 0;
        let j = arr2.length - 1;
        for (const a of arr1) {
            while (j >= 0 && a * arr2[j] > maxProduct) {
                j--;
            }
            count += j + 1;
        }
        return count;
    };

    let [neg1, pos1] = splitBySign(nums1);
    let [neg2, pos2] = splitBySign(nums2);

    const totalNegProducts = neg1.length * pos2.length + pos1.length * neg2.length;
    let sign = 1;

    if (k > totalNegProducts) {
        k -= totalNegProducts; // focus on positive products
    } else {
        k = totalNegProducts - k + 1; // target the k-th most negative product
        sign = -1;
        [neg2, pos2] = [pos2, neg2]; // flip to reverse product direction
    }

    let left = 0;
    let right = 1e10;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const count =
            countProductsNoGreaterThan(neg1, neg2, mid) +
            countProductsNoGreaterThan(pos1, pos2, mid);

        if (count >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return sign * left;
};