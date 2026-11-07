type Server = { weight: number; index: number; endTime: number };

const assignTasks = (servers: number[], tasks: number[]): number[] => {
    // Free servers: smallest weight first, then smallest index
    const freeServers = new Heap<Server>((a, b) =>
        a.weight !== b.weight ? a.weight - b.weight : a.index - b.index
    );
    // Busy servers: earliest finish time first
    const busyServers = new Heap<Server>((a, b) => a.endTime - b.endTime);

    for (let i = 0; i < servers.length; i++)
        freeServers.push({ weight: servers[i], index: i, endTime: 0 });

    const result: number[] = new Array(tasks.length).fill(0);
    let time = 0;

    for (let task = 0; task < tasks.length; task++) {
        // Task `task` can't start before second `task`, but time may already be later
        // if we had to wait for a server earlier
        time = Math.max(time, task);

        // No server is free and none finishes by `time`: jump to the earliest finish
        if (freeServers.isEmpty() && busyServers.top()!.endTime > time)
            time = busyServers.top()!.endTime;

        // Release every server that has finished by `time`
        while (!busyServers.isEmpty() && busyServers.top()!.endTime <= time)
            freeServers.push(busyServers.pop()!);

        // At least one server is free now, so assign the task
        const server = freeServers.pop()!;
        result[task] = server.index;
        server.endTime = time + tasks[task];
        busyServers.push(server);
    }

    return result;
};