const maxDistance = (nums1: number[], nums2: number[]): number => {
    let left = 0;
    let maxDist = 0;

    for (let right = 0; right < nums2.length; right++) {
        while (left < nums1.length && nums1[left] > nums2[right]) left++;
        if (left === nums1.length) break;
        maxDist = Math.max(maxDist, right - left);
    }

    return maxDist;
};