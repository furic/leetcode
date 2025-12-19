function findAllPeople(n: number, meetings: number[][], firstPerson: number): number[] {


    const schedule = {}
    const timestamps = []

    for (let meeting of meetings) {
        const [_, __, timestmap] = meeting
        if (schedule[timestmap] === undefined) {
            schedule[timestmap] = []
            timestamps.push(timestmap)
        }

        schedule[timestmap].push(meeting)
    }


    timestamps.sort((a, b) => a - b)



    const secretKnowers = new Set([firstPerson, 0])


    for (let timestamp of timestamps) {

        const graph = {}
        const localSecretKnowers = new Set<number>()
        for (let meeting of schedule[timestamp]) {
            const [person_a, person_b, _] = meeting
            if (graph[person_a] === undefined) {
                graph[person_a] = []

            }
            graph[person_a].push(person_b)
            if (graph[person_b] === undefined) {
                graph[person_b] = []
            }
            graph[person_b].push(person_a)
            if (secretKnowers.has(person_a)) {
                localSecretKnowers.add(person_a)
            }
            if (secretKnowers.has(person_b)) {
                localSecretKnowers.add(person_b)
            }
        }

        const visited = new Set()
        const stack = Array.from(localSecretKnowers)

        while(stack.length) {
            const curr = stack.pop()
            if (visited.has(curr) || graph[curr] === undefined) {
                continue
            }

            visited.add(curr)
            secretKnowers.add(curr) // because we start from the secret knowers, if we were able to reach this points, it means we are the secret knower 

            for (let neighbour of graph[curr]) {
               stack.push(neighbour) 
            }
        }

    }

    return Array.from(secretKnowers)
};

// sort by timestmap 
// have a set of secret knowers 
// emulate the time passing by 
// if person meets with secret knower they become a secret knower from here on 
// we can do a bfs on this graph (within a timestmap) cuz we can't inherently order the relationship wihtin the same timestmap without using topological sort (e+V). we also might have cycles so we should just call from secret knowers 



// t log t to sort 
//   + m to build the relatiosnhips of meetings 
//   + m/2 to call out the uniqueue unvisited secret knowers within the timestamp 


// so like t log t + tm where t is timestmap and m is people wihtin a meeting 