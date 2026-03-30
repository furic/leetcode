class EventManager {
    private readonly pq: PriorityQueue<{ id: number; priority: number }>;
    private readonly activePriority: Map<number, number>; // eventId → current priority

    constructor(events: number[][]) {
        this.activePriority = new Map();
        this.pq = new PriorityQueue((a, b) =>
            a.priority !== b.priority ? b.priority - a.priority : a.id - b.id
        );

        for (const [id, priority] of events) {
            this.activePriority.set(id, priority);
            this.pq.push({ id, priority });
        }
    }

    updatePriority(eventId: number, newPriority: number): void {
        this.activePriority.set(eventId, newPriority);
        this.pq.push({ id: eventId, priority: newPriority }); // Lazy update: old entry invalidated via activePriority
    }

    pollHighest(): number {
        while (!this.pq.isEmpty()) {
            const { id, priority } = this.pq.pop();
            if (this.activePriority.get(id) === priority) {
                this.activePriority.delete(id);
                return id;
            }
            // Stale entry (priority was updated) — skip and continue
        }
        return -1;
    }
}