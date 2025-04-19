class Router {
    private memoryLimit: number;
    private queue: [number, number, number][];
    private packetSet: Set<string>;
    private destMap: Map<number, number[]>;

    constructor(memoryLimit: number) {
        this.memoryLimit = memoryLimit;
        this.queue = [];
        this.packetSet = new Set();
        this.destMap = new Map();
    }

    addPacket(source: number, destination: number, timestamp: number): boolean {
        const key = `${source}-${destination}-${timestamp}`;
        if (this.packetSet.has(key)) return false;

        if (this.queue.length === this.memoryLimit) {
            const [oldSource, oldDestination, oldTimestamp] =
                this.queue.shift()!;
            this.packetSet.delete(
                `${oldSource}-${oldDestination}-${oldTimestamp}`
            );
            this.removeDestPacket(oldDestination);
        }

        this.queue.push([source, destination, timestamp]);
        this.packetSet.add(key);
        if (!this.destMap.has(destination)) this.destMap.set(destination, []);
        this.destMap.get(destination)!.push(timestamp);

        return true;
    }

    forwardPacket(): number[] {
        if (this.queue.length === 0) return [];

        const [source, destination, timestamp] = this.queue.shift()!;
        this.packetSet.delete(`${source}-${destination}-${timestamp}`);
        this.removeDestPacket(destination);

        return [source, destination, timestamp];
    }

    getCount(destination: number, startTime: number, endTime: number): number {
        const timeList = this.destMap.get(destination);
        if (!timeList) return 0;

        // Binary search helpers
        const lowerBound = (target: number): number => {
            let left = 0,
                right = timeList.length;
            while (left < right) {
                const mid = (left + right) >> 1;
                if (timeList[mid] < target) left = mid + 1;
                else right = mid;
            }
            return left;
        };

        const upperBound = (target: number): number => {
            let left = 0,
                right = timeList.length;
            while (left < right) {
                const mid = (left + right) >> 1;
                if (timeList[mid] <= target) left = mid + 1;
                else right = mid;
            }
            return left;
        };

        return upperBound(endTime) - lowerBound(startTime);
    }

    removeDestPacket(destination: number) {
        const timeList = this.destMap.get(destination)!;
        timeList.shift(); // Remove the oldest timestamp (guaranteed order)
        if (timeList.length === 0) this.destMap.delete(destination);
    }
}
