const longestBalanced = (s: string): number => {
    const n = s.length;
    let max = 1;
    const isSame = (arr:number[]) : boolean => {
       let cnt:number = -1;
       for(let i=0;i<26;i++){
          if(arr[i]==0){
            continue;
          }
          else if(cnt == -1){
            cnt = arr[i];
          }
          else{
            if(arr[i] != cnt){
                return false;
            }
          }
       }
       return true;
    }
    for(let i=0;i<n;i++){
        let freq:number[] = new Array(26).fill(0);
        for(let j=i;j<n;j++){
            freq[s.charCodeAt(j)-97]++;
            if(isSame(freq)){
                max = Math.max(max,j-i+1);
            }
        }
    }
    return max;
};