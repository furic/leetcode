const isPalindrome = (x: number): boolean => {
    if (x < 0) {
        return false;
    }
    
    let workingNumber = x;
    let reversedNumber = 0;
    
    while (workingNumber !== 0) {
        reversedNumber = reversedNumber * 10 + workingNumber % 10;
        workingNumber = Math.floor(workingNumber / 10);
    }
    
    return reversedNumber === x;
};