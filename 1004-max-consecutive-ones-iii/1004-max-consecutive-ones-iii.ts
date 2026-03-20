function longestOnes(nums: number[], k: number): number {
  let max:number = -Infinity;
  let left:number = 0;
  let count = k;
  
  for (let right = 0; right < nums.length; right++) {

  
    
    
    while(count == 0 && nums[right]==0){
    if(nums[left]==0)count++;
     left++;
    
    }

    
    max= Math.max(max,(right-left+1));
      if(nums[right]==0) count--;
  }
    
    return max;
};
