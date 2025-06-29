const primeSubarray = (nums: number[], k: number): number => {
    const max_val = 50000;
    const isPrimeArr: boolean[] = new Array(max_val + 1).fill(true);
    isPrimeArr[0] = false;
    isPrimeArr[1] = false;
    for (let i = 2; i <= max_val; i++) {
        if (isPrimeArr[i]) {
            for (let j = i * i; j <= max_val; j += i) {
                isPrimeArr[j] = false;
            }
        }
    }

    const n = nums.length;
    let l = 0;
    let countPrimes = 0;
    const min_deque: number[] = [];
    const max_deque: number[] = [];
    const primesInWindow: number[] = [];
    let totalCount = 0;

    for (let r = 0; r < n; r++) {
        const num = nums[r];
        if (num <= max_val && isPrimeArr[num]) {
            countPrimes++;
            while (min_deque.length && nums[min_deque[min_deque.length - 1]] >= num) {
                min_deque.pop();
            }
            min_deque.push(r);
            while (max_deque.length && nums[max_deque[max_deque.length - 1]] <= num) {
                max_deque.pop();
            }
            max_deque.push(r);
            primesInWindow.push(r);
        }

        while (min_deque.length && min_deque[0] < l) {
            min_deque.shift();
        }
        while (max_deque.length && max_deque[0] < l) {
            max_deque.shift();
        }

        while (countPrimes >= 2 && min_deque.length && max_deque.length && (nums[max_deque[0]] - nums[min_deque[0]] > k)) {
            if (l > r) break;
            const leftNum = nums[l];
            if (leftNum <= max_val && isPrimeArr[leftNum]) {
                countPrimes--;
                if (min_deque.length && min_deque[0] === l) {
                    min_deque.shift();
                }
                if (max_deque.length && max_deque[0] === l) {
                    max_deque.shift();
                }
                let low = 0;
                let high = primesInWindow.length - 1;
                let index = -1;
                while (low <= high) {
                    const mid = Math.floor((low + high) / 2);
                    if (primesInWindow[mid] === l) {
                        index = mid;
                        break;
                    } else if (primesInWindow[mid] < l) {
                        low = mid + 1;
                    } else {
                        high = mid - 1;
                    }
                }
                if (index !== -1) {
                    primesInWindow.splice(index, 1);
                }
            }
            l++;
        }

        if (countPrimes >= 2) {
            const secondLast = primesInWindow[primesInWindow.length - 2];
            totalCount += (secondLast - l + 1);
        }
    }

    return totalCount;
};