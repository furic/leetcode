function getHappyString(n:number, k:number):string{

const total=3*(1<<(n-1))
if(k>total) return ""

k--

let res=""
let last=""

for(let pos=0;pos<n;pos++){

const branch=1<<(n-pos-1)

const choices=['a','b','c'].filter(c=>c!==last)

const idx=Math.floor(k/branch)

res+=choices[idx]
last=choices[idx]

k%=branch
}

return res
}