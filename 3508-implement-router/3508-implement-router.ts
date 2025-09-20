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

        // Check for duplicate
        if (this.duplicateChecker.has(packetKey)) return false;

        // Remove oldest packet if at capacity
        if (this.packetQueue.size() === this.maxCapacity) {
            const removedPacket = this.packetQueue.dequeue();
            const removedPacketKey = this.serializePacket(removedPacket);

            this.duplicateChecker.delete(removedPacketKey);
            // Increment start pointer for lazy deletion in timestamp tracking
            this.timestampsByDestination.get(removedPacket.destination)!.validStartIndex++;
        }

        // Add new packet
        this.packetQueue.enqueue(newPacket);
        this.duplicateChecker.add(packetKey);

        // Track timestamp for this destination
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
        // Increment start pointer for lazy deletion in timestamp tracking
        this.timestampsByDestination.get(forwardedPacket.destination)!.validStartIndex++;

        return [forwardedPacket.source, forwardedPacket.destination, forwardedPacket.timestamp];
    }

    getCount(destination: number, startTime: number, endTime: number): number {
        if (!this.timestampsByDestination.has(destination)) return 0;

        const destData = this.timestampsByDestination.get(destination)!;
        const timestamps = destData.timestampList;
        let leftPointer = destData.validStartIndex; // First valid index (lazy deletion)
        let rightPointer = timestamps.length - 1;

        // Early termination checks
        if (leftPointer > rightPointer ||
            leftPointer === timestamps.length ||
            timestamps[leftPointer] > endTime ||
            timestamps[rightPointer] < startTime) {
            return 0;
        }

        // Find first timestamp >= startTime
        while (leftPointer < rightPointer && timestamps[leftPointer] < startTime) {
            leftPointer++;
        }
        
        // Find last timestamp <= endTime
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
    validStartIndex: number; // Tracks first valid timestamp (lazy deletion)
    timestampList: number[];

    constructor() {
        this.validStartIndex = 0;
        this.timestampList = [];
    }
}