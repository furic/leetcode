const maxEvents = (events: number[][]): number => {
    events.sort((a, b) => a[0] - b[0]);

    const pq = new MinPriorityQueue<number>();
    let day = 0;
    let i = 0;
    let attended = 0;

    while (i < events.length || !pq.isEmpty()) {
        if (pq.isEmpty() && i < events.length) {
            day = events[i][0];
        }

        // Add all events that start today or earlier
        while (i < events.length && events[i][0] <= day) {
            pq.enqueue(events[i][1]);
            i++;
        }

        // Remove expired events
        while (!pq.isEmpty() && pq.front()! < day) {
            pq.dequeue();
        }

        // Attend one event
        if (!pq.isEmpty()) {
            pq.dequeue();
            attended++;
            day++;
        }
    }

    return attended;
};