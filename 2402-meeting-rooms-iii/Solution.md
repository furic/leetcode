# Greedy Room Scheduling | 46 Lines | O(nm) | 90ms

# Intuition
This is a meeting room scheduling problem where we need to track room availability and handle meeting delays. The key insight is to process meetings chronologically and always choose the lowest-numbered available room. When no rooms are available, we must delay the meeting until the earliest room becomes free. We need to track both when each room becomes available and how many meetings each room hosts.

# Approach
I'll use a greedy simulation approach with chronological processing:

1. **Data Structures**: 
   - Array to track when each room becomes available (end times)
   - Array to count meetings held in each room
   
2. **Chronological Processing**: Sort meetings by start time and process them in order to handle the constraint that earlier meetings get priority for freed rooms.

3. **Room Assignment Logic**:
   - For each meeting, first try to find the lowest-numbered available room
   - If no room is available, find the room that becomes free earliest (lowest-numbered in case of tie)
   - Schedule the meeting either at its original time or delayed until the room is free

4. **Greedy Selection**: Always choose the lowest-numbered room when multiple options exist, which naturally handles the tie-breaking requirements.

5. **Result**: Return the room with the most meetings, using lowest room number for ties.

The simulation approach ensures we handle all the complex timing and priority rules correctly by processing events in chronological order.

# Complexity
- Time complexity: $$O(n \cdot m + n \log n)$$
  - Sorting meetings takes O(n log n)  
  - For each of n meetings, we potentially scan all m rooms to find available/earliest room
  - Overall: O(n log n + nm)

- Space complexity: $$O(m)$$
  - Arrays for room end times and meeting counts, each of size m
  - Sorting uses O(log n) additional space
  - Overall space is O(m) since typically m ≤ n

# Code
```typescript []
const mostBooked = (totalRooms: number, meetings: number[][]): number => {
    const roomEndTimes = Array.from({ length: totalRooms }, () => 0);
    
    const meetingCounts = Array.from({ length: totalRooms }, () => 0);
    
    const sortedMeetings = meetings.sort((meetingA, meetingB) => meetingA[0] - meetingB[0]);
    
    for (const [originalStartTime, originalEndTime] of sortedMeetings) {
        const meetingDuration = originalEndTime - originalStartTime;
        
        const availableRoomIndex = findFirstAvailableRoom(roomEndTimes, originalStartTime);
        
        if (availableRoomIndex !== -1) {
            meetingCounts[availableRoomIndex]++;
            roomEndTimes[availableRoomIndex] = originalEndTime;
        } else {
            const earliestFreeRoomIndex = findEarliestFreeRoom(roomEndTimes);
            
            meetingCounts[earliestFreeRoomIndex]++;
            const delayedStartTime = roomEndTimes[earliestFreeRoomIndex];
            roomEndTimes[earliestFreeRoomIndex] = delayedStartTime + meetingDuration;
        }
    }
    
    return findRoomWithMostMeetings(meetingCounts);
};

const findFirstAvailableRoom = (roomEndTimes: number[], currentTime: number): number => {
    return roomEndTimes.findIndex(endTime => endTime <= currentTime);
};

const findEarliestFreeRoom = (roomEndTimes: number[]): number => {
    let earliestRoomIndex = 0;
    
    for (let roomIndex = 1; roomIndex < roomEndTimes.length; roomIndex++) {
        if (roomEndTimes[roomIndex] < roomEndTimes[earliestRoomIndex]) {
            earliestRoomIndex = roomIndex;
        }
    }
    
    return earliestRoomIndex;
};

const findRoomWithMostMeetings = (meetingCounts: number[]): number => {
    let mostBookedRoomIndex = 0;
    
    for (let roomIndex = 1; roomIndex < meetingCounts.length; roomIndex++) {
        if (meetingCounts[roomIndex] > meetingCounts[mostBookedRoomIndex]) {
            mostBookedRoomIndex = roomIndex;
        }
    }
    
    return mostBookedRoomIndex;
};
```