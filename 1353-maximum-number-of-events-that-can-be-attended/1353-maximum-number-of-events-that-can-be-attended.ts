const maxEvents = (events: number[][]): number => {
    events.sort((a, b) => a[0] - b[0]);

    const eventEndDays = new MinPriorityQueue<number>();
    let currentDay = 0;
    let eventIndex = 0;
    let eventsAttended = 0;

    while (eventIndex < events.length || !eventEndDays.isEmpty()) {
        if (eventEndDays.isEmpty() && eventIndex < events.length) {
            currentDay = events[eventIndex][0];
        }

        while (eventIndex < events.length && events[eventIndex][0] <= currentDay) {
            eventEndDays.enqueue(events[eventIndex][1]);
            eventIndex++;
        }

        while (!eventEndDays.isEmpty() && eventEndDays.front()! < currentDay) {
            eventEndDays.dequeue();
        }

        if (!eventEndDays.isEmpty()) {
            eventEndDays.dequeue();
            eventsAttended++;
            currentDay++;
        }
    }

    return eventsAttended;
};