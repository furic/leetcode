function mostBooked(n: number, meetings: number[][]): number {
    meetings.sort((a, b) => a[0] - b[0]);

    const roomMeetingCount = new Array<number>(n).fill(0);

    const freeRooms = new PriorityQueue<number>((a, b) => a - b); // min-heap of room numbers
    const occupiedRooms = new PriorityQueue<[number, number]>((a, b) =>
        a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
    ); // min-heap of [endTime, roomNumber]

    for (let i = 0; i < n; i++) {
        freeRooms.enqueue(i);
    }

    for (const [startTime, endTime] of meetings) {
        // Free up rooms that are done before the current meeting starts
        while (!occupiedRooms.isEmpty() && occupiedRooms.front()[0] <= startTime) {
            const [, room] = occupiedRooms.dequeue()!;
            freeRooms.enqueue(room);
        }

        if (!freeRooms.isEmpty()) {
            const room = freeRooms.dequeue()!;
            roomMeetingCount[room]++;
            occupiedRooms.enqueue([endTime, room]);
        } else {
            // Delay the meeting
            const [currentEndTime, room] = occupiedRooms.dequeue()!;
            const duration = endTime - startTime;
            roomMeetingCount[room]++;
            occupiedRooms.enqueue([currentEndTime + duration, room]);
        }
    }

    // Find the room with the maximum meeting count
    let maxMeetings = -1;
    let roomWithMaxMeetings = -1;
    for (let i = 0; i < n; i++) {
        if (roomMeetingCount[i] > maxMeetings) {
            maxMeetings = roomMeetingCount[i];
            roomWithMaxMeetings = i;
        }
    }

    return roomWithMaxMeetings;
}