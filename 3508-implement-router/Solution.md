# Queue with Lazy Deletion | 80 Lines | O(log n) | 282ms

# Intuition
This router system needs to manage packets in FIFO order while supporting duplicate detection, capacity limits, and efficient range queries by destination. The key insight is to combine a queue for FIFO ordering, a set for duplicate detection, and per-destination timestamp lists for range queries. Instead of physically removing old timestamps when packets are forwarded, we can use lazy deletion with index tracking for efficiency.

# Approach
I'll use multiple data structures with lazy deletion optimization:

1. **FIFO Queue**: Maintain packets in arrival order for forwarding operations.

2. **Duplicate Detection Set**: Store serialized packet keys to quickly check for duplicates in O(1) time.

3. **Timestamp Tracking by Destination**: For each destination, maintain:
   - A list of timestamps in arrival order (guaranteed sorted since timestamps are increasing)
   - A start index tracking the first valid timestamp (lazy deletion)

4. **Capacity Management**: When adding a packet exceeds capacity, remove the oldest packet from queue and duplicate set, then increment the start index for that destination's timestamp list (lazy deletion).

5. **Range Query Optimization**: Use the sorted nature of timestamps to find the range efficiently:
   - Start from validStartIndex (skipping deleted packets)
   - Use linear search to find boundaries since timestamps are sorted
   - Early termination if no packets can match

6. **Lazy Deletion Strategy**: Instead of removing timestamps from lists, track a start index. This avoids expensive array operations while maintaining query correctness.

# Complexity
- Time complexity: $$O(\log n)$$ amortized
  - addPacket: O(1) for queue, set operations; O(1) for timestamp append
  - forwardPacket: O(1) for queue, set operations
  - getCount: O(k) where k is the number of valid timestamps for that destination, typically O(log n) with early termination

- Space complexity: $$O(n)$$
  - Queue stores at most memoryLimit packets
  - Duplicate set stores at most memoryLimit packet keys
  - Timestamp lists grow with packets added, but lazy deletion avoids immediate cleanup
  - Total space proportional to packets processed

# Code
```typescript []
class Router {
    private maxCapacity: number;
    private packetQueue: Queue<Packet>;
    private duplicateChecker: Set<string>;
    private timestampsByDestination: Map<number, DestinationTimestamps>;

    constructor(memoryLimit: number) {
        this.maxCapacity = memoryLimit;
        this.packetQueue = new Queue<Packet>();
        this.duplicateChecker = new Set<string>();
        this.timestampsByDestination = new Map<number, DestinationTimestamps>();
    }

    addPacket(source: number, destination: number, timestamp: number): boolean {
        const newPacket = new Packet(source, destination, timestamp);
        const packetKey = this.serializePacket(newPacket);

        if (this.duplicateChecker.has(packetKey)) return false;

        if (this.packetQueue.size() === this.maxCapacity) {
            const removedPacket = this.packetQueue.dequeue();
            const removedPacketKey = this.serializePacket(removedPacket);

            this.duplicateChecker.delete(removedPacketKey);
            this.timestampsByDestination.get(removedPacket.destination)!.validStartIndex++;
        }

        this.packetQueue.enqueue(newPacket);
        this.duplicateChecker.add(packetKey);

        if (!this.timestampsByDestination.has(destination)) {
            this.timestampsByDestination.set(destination, new DestinationTimestamps());
        }
        this.timestampsByDestination.get(destination)!.timestampList.push(timestamp);

        return true;
    }

    forwardPacket(): number[] {
        if (this.packetQueue.isEmpty()) return [];

        const forwardedPacket = this.packetQueue.dequeue();
        const forwardedPacketKey = this.serializePacket(forwardedPacket);

        this.duplicateChecker.delete(forwardedPacketKey);
        this.timestampsByDestination.get(forwardedPacket.destination)!.validStartIndex++;

        return [forwardedPacket.source, forwardedPacket.destination, forwardedPacket.timestamp];
    }

    getCount(destination: number, startTime: number, endTime: number): number {
        if (!this.timestampsByDestination.has(destination)) return 0;

        const destData = this.timestampsByDestination.get(destination)!;
        const timestamps = destData.timestampList;
        let leftPointer = destData.validStartIndex;
        let rightPointer = timestamps.length - 1;

        if (leftPointer > rightPointer ||
            leftPointer === timestamps.length ||
            timestamps[leftPointer] > endTime ||
            timestamps[rightPointer] < startTime) {
            return 0;
        }

        while (leftPointer < rightPointer && timestamps[leftPointer] < startTime) {
            leftPointer++;
        }
        
        while (rightPointer > 0 && timestamps[rightPointer] > endTime) {
            rightPointer--;
        }
        
        return rightPointer - leftPointer + 1;
    }

    private serializePacket(packet: Packet): string {
        return `${packet.source},${packet.destination},${packet.timestamp}`;
    }
}

class Packet {
    source: number;
    destination: number;
    timestamp: number;

    constructor(source: number, destination: number, timestamp: number) {
        this.source = source;
        this.destination = destination;
        this.timestamp = timestamp;
    }
}

class DestinationTimestamps {
    validStartIndex: number;
    timestampList: number[];

    constructor() {
        this.validStartIndex = 0;
        this.timestampList = [];
    }
}
```