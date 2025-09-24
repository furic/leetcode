const twoSum = (nums: number[], target: number): number[] => {
    const map = new Map()

    const output = nums.reduce((acc,curr, index)=> {
        if(acc.length) return acc

        if(!map.has(target - curr)){
              map.set(curr, index )
              return acc
        }
        return [map.get(target - curr),index]
    },[])

    return output

};