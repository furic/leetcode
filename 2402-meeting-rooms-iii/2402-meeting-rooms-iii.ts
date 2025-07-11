function mostBooked(n: number, meetings: number[][]): number {
    // Sort meetings by start time for chronological processing
    meetings.sort((a, b) => a[0] - b[0]);

    const meetingCountsPerRoom = new Array<number>(n).fill(0);

    const availableRooms = new MinPriorityQueue<number>();
    const occupiedRooms = new PriorityQueue<[number, number]>((a, b) =>
        a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
    ); // [endTime, roomIndex], sorted by earliest end time, then room index

    // Initially, all rooms are available
    for (let roomIndex = 0; roomIndex < n; roomIndex++) {
        availableRooms.enqueue(roomIndex);
    }

    for (const [meetingStart, meetingEnd] of meetings) {
        // Free up rooms that have completed before the current meeting starts
        while (!occupiedRooms.isEmpty() && occupiedRooms.front()[0] <= meetingStart) {
            const [, freedRoom] = occupiedRooms.dequeue()!;
            availableRooms.enqueue(freedRoom);
        }

        const meetingDuration = meetingEnd - meetingStart;

        if (!availableRooms.isEmpty()) {
            // Assign to the lowest available room
            const assignedRoom = availableRooms.dequeue()!;
            meetingCountsPerRoom[assignedRoom]++;
            occupiedRooms.enqueue([meetingEnd, assignedRoom]);
        } else {
            // Delay the meeting to start when the earliest room is free
            const [earliestEndTime, occupiedRoom] = occupiedRooms.dequeue()!;
            meetingCountsPerRoom[occupiedRoom]++;
            occupiedRooms.enqueue([earliestEndTime + meetingDuration, occupiedRoom]);
        }
    }

    // Find the room with the highest number of meetings (lowest index on tie)
    let maxMeetings = -1;
    let roomWithMaxMeetings = -1;

    meetingCountsPerRoom.forEach((count, roomIndex) => {
        if (count > maxMeetings) {
            maxMeetings = count;
            roomWithMaxMeetings = roomIndex;
        }
    });

    return roomWithMaxMeetings;
}