function trap(height: number[]): number {
        const n: number = height.length;

    /* Single element and two elements won't be able to trap any water, we need minimum 3 elements */
    if(n <= 2) return 0;

    let res: number = 0;

    let left: number = 0;
    let right: number = (n - 1);
    
    let leftMax: number = -1;
    let rightMax: number = -1;

    while(left < right) {

        /* Deal with the lesser part always, if left is less, then deal with left */
        if(height[left] <= height[right]) {

            /* if current element is less than leftMax, it means, on left we have someone greater for sure */
            if(height[left] < leftMax) res += (leftMax - height[left]);
            else leftMax = height[left];  /* Else update leftMax since current element is max */
            left = left + 1;              /* ++ the smaller part, left here */
        } else {

            /* if current element is less than rightMax, it means, on right we have someone greater for sure */
            if(height[right] < rightMax) res += (rightMax - height[right]);
            else rightMax = height[right];  /* Else update rightMax since current element is max */
            right = right - 1;              /* -- the smaller part, right here */
        } 
    }
    return res;  
};