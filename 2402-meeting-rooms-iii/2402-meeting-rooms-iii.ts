const mostBooked = (n: number, meetings: number[][]): number => {
    meetings.sort((a, b) => a[0] - b[0]);

    const meetingCount: number[] = new Array(n).fill(0);
    const availableRooms: number[] = [];
    const occupiedRooms: [number, number][] = []; // [endTime, roomNumber] min-heap

    for (let i = 0; i < n; i++) {
        availableRooms.push(i);
    }

    const pushToOccupied = (endTime: number, roomNumber: number) => {
        let low = 0;
        let high = occupiedRooms.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (occupiedRooms[mid][0] < endTime || 
                (occupiedRooms[mid][0] === endTime && occupiedRooms[mid][1] < roomNumber)) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        occupiedRooms.splice(low, 0, [endTime, roomNumber]);
    };

    for (const [start, end] of meetings) {
        // Free up rooms whose meetings ended by current start
        while (occupiedRooms.length > 0 && occupiedRooms[0][0] <= start) {
            const [, roomNumber] = occupiedRooms.shift()!;
            let low = 0, high = availableRooms.length;
            while (low < high) {
                const mid = (low + high) >> 1;
                if (availableRooms[mid] < roomNumber) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            availableRooms.splice(low, 0, roomNumber);
        }

        if (availableRooms.length > 0) {
            // Room available: assign lowest-numbered room
            const roomNumber = availableRooms.shift()!;
            pushToOccupied(end, roomNumber);
            meetingCount[roomNumber]++;
        } else {
            // No room available: delay meeting to the earliest available time
            const [currentEndTime, roomNumber] = occupiedRooms.shift()!;
            const meetingDuration = end - start;
            const newEndTime = currentEndTime + meetingDuration;
            pushToOccupied(newEndTime, roomNumber);
            meetingCount[roomNumber]++;
        }
    }

    // Find the room with the most meetings, preferring the lowest index in case of a tie
    let maxMeetings = 0;
    let resultRoom = 0;
    for (let i = 0; i < n; i++) {
        if (meetingCount[i] > maxMeetings) {
            maxMeetings = meetingCount[i];
            resultRoom = i;
        }
    }

    return resultRoom;
};