function lengthOfLongestSubstring(s: string): number {
  if(!s.length) return 0

    let arr: number[] = new Array(128).fill(0);
    let maxCount = 0;
    let pointer = 0;

    for(let i = 0; i < s.length; i++){
        let char = s.charCodeAt(i);
        pointer = Math.max(pointer, arr[char]);
        maxCount = Math.max(maxCount, i - pointer + 1);
        arr[char] = i + 1;
    }

    return maxCount;
};