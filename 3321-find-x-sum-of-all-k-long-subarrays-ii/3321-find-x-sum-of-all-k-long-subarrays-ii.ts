const findXSum = (nums: number[], k: number, x: number): number[] => {
    const arrayLength = nums.length;
    const result: number[] = [];
    
    for (let windowStart = 0; windowStart + k <= arrayLength; windowStart++) {
        const frequencyCount = new Array(51).fill(0);
        let windowSum = 0;
        
        for (let index = windowStart; index < windowStart + k; index++) {
            frequencyCount[nums[index]]++;
            windowSum += nums[index];
        }
        
        const frequencyValuePairs: [number, number][] = [];
        for (let value = 1; value <= 50; value++) {
            if (frequencyCount[value] > 0) {
                frequencyValuePairs.push([frequencyCount[value], value]);
            }
        }
        
        if (frequencyValuePairs.length <= x) {
            result.push(windowSum);
        } else {
            frequencyValuePairs.sort((a, b) => {
                return b[0] - a[0] || b[1] - a[1];
            });
            
            let xSum = 0;
            for (let rank = 0; rank < x; rank++) {
                const [frequency, value] = frequencyValuePairs[rank];
                xSum += frequency * value;
            }
            
            result.push(xSum);
        }
    }
    
    return result;
};