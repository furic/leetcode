const mostBooked = (totalRooms: number, meetings: number[][]): number => {
    // Track when each room becomes available
    const roomEndTimes = Array.from({ length: totalRooms }, () => 0);
    
    // Count meetings held in each room
    const meetingCounts = Array.from({ length: totalRooms }, () => 0);
    
    // Sort meetings by start time (process in chronological order)
    const sortedMeetings = meetings.sort((meetingA, meetingB) => meetingA[0] - meetingB[0]);
    
    // Process each meeting in chronological order
    for (const [originalStartTime, originalEndTime] of sortedMeetings) {
        const meetingDuration = originalEndTime - originalStartTime;
        
        // Find first available room (lowest number room that's free)
        const availableRoomIndex = findFirstAvailableRoom(roomEndTimes, originalStartTime);
        
        if (availableRoomIndex !== -1) {
            // Room is available - schedule meeting at original time
            meetingCounts[availableRoomIndex]++;
            roomEndTimes[availableRoomIndex] = originalEndTime;
        } else {
            // No rooms available - find room that becomes free earliest
            const earliestFreeRoomIndex = findEarliestFreeRoom(roomEndTimes);
            
            // Schedule delayed meeting to start when room becomes free
            meetingCounts[earliestFreeRoomIndex]++;
            const delayedStartTime = roomEndTimes[earliestFreeRoomIndex];
            roomEndTimes[earliestFreeRoomIndex] = delayedStartTime + meetingDuration;
        }
    }
    
    // Find room with most meetings (lowest number in case of tie)
    return findRoomWithMostMeetings(meetingCounts);
};

// Find the first available room (lowest index) that's free at the given time
const findFirstAvailableRoom = (roomEndTimes: number[], currentTime: number): number => {
    return roomEndTimes.findIndex(endTime => endTime <= currentTime);
};

// Find the room that becomes available earliest (lowest index in case of tie)
const findEarliestFreeRoom = (roomEndTimes: number[]): number => {
    let earliestRoomIndex = 0;
    
    for (let roomIndex = 1; roomIndex < roomEndTimes.length; roomIndex++) {
        if (roomEndTimes[roomIndex] < roomEndTimes[earliestRoomIndex]) {
            earliestRoomIndex = roomIndex;
        }
    }
    
    return earliestRoomIndex;
};

// Find room with most meetings (return lowest index in case of tie)
const findRoomWithMostMeetings = (meetingCounts: number[]): number => {
    let mostBookedRoomIndex = 0;
    
    for (let roomIndex = 1; roomIndex < meetingCounts.length; roomIndex++) {
        if (meetingCounts[roomIndex] > meetingCounts[mostBookedRoomIndex]) {
            mostBookedRoomIndex = roomIndex;
        }
    }
    
    return mostBookedRoomIndex;
};