function findMedianSortedArrays(nums1: number[], nums2: number[]):
  number {
      // Ensure binary search on the shorter array
      if (nums1.length > nums2.length) {
          const tmp = nums1; nums1 = nums2; nums2 = tmp;
      }

      const m = nums1.length;
      const n = nums2.length;
      const half = (m + n + 1) >> 1;

      let lo = 0;
      let hi = m;

      while (lo <= hi) {
          const i = (lo + hi) >> 1;      // partition in nums1
          const j = half - i;             // partition in nums2

          const left1  = i > 0 ? nums1[i - 1] : -Infinity;
          const right1 = i < m ? nums1[i]     :  Infinity;
          const left2  = j > 0 ? nums2[j - 1] : -Infinity;
          const right2 = j < n ? nums2[j]     :  Infinity;

          if (left1 <= right2 && left2 <= right1) {
              // Found valid partition
              if ((m + n) & 1) {
                  return left1 > left2 ? left1 : left2;
              }
              const maxLeft = left1 > left2 ? left1 : left2;
              const minRight = right1 < right2 ? right1 : right2;
              return (maxLeft + minRight) / 2;
          }

          if (left1 > right2) {
              hi = i - 1;
          } else {
              lo = i + 1;
          }
      }

      return 0;
  }