function removeDuplicates(s: string, k: number): string {
    const stack = []
    const count = []
    
    for(let char of s){
        if(stack[stack.length - 1] === char) count.push(count[count.length - 1] + 1)
        else count.push(1)
        stack.push(char)

        if(count[count.length - 1] === k){

            for(let i = 0;i < k;i++){
                stack.pop()
                count.pop()
            }

        }
    }
    return stack.join('')
};