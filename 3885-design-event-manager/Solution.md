# Lazy Deletion Priority Queue | 22 Lines | O(log n) per op | 279ms

# Intuition
A max-heap naturally supports `pollHighest`, but priority updates are expensive to handle in-place. The lazy deletion pattern avoids this: push a new entry with the updated priority and mark old entries as stale via a separate map. When popping, skip any entry whose priority no longer matches the current active priority.

# Approach
- **`activePriority` map:** Maps `eventId → current priority` for all active events. Acts as the source of truth — if a popped entry's priority doesn't match the map, it's stale.
- **Constructor:** Insert all events into both the map and the priority queue. The PQ comparator orders by descending priority, breaking ties by ascending `eventId`.
- **`updatePriority`:** Update `activePriority[eventId] = newPriority`, then push a new `{id, priority}` entry into the PQ. The old entry remains but becomes stale.
- **`pollHighest`:** Pop from the PQ in a loop:
  - If `activePriority.get(id) === priority`, the entry is current — delete from the map and return `id`.
  - Otherwise, the entry is stale (an `updatePriority` was called after it was inserted) — discard and continue.
  - Return `-1` if the PQ empties.
- **Why correctness holds:** Each `updatePriority` call pushes the new correct entry, which will always have a higher or different priority than the stale one. The stale entry will be encountered later and silently skipped.

# Complexity
- Time complexity: $$O(\log n)$$ amortised per operation — each event is pushed at most once per update, and each push/pop is $$O(\log n)$$.

- Space complexity: $$O(n + u)$$ where $$u$$ is the number of `updatePriority` calls — the PQ may accumulate stale entries.

# Code
```typescript []
class EventManager {
    private readonly pq: PriorityQueue<{ id: number; priority: number }>;
    private readonly activePriority: Map<number, number>;

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
        this.pq.push({ id: eventId, priority: newPriority });
    }

    pollHighest(): number {
        while (!this.pq.isEmpty()) {
            const { id, priority } = this.pq.pop();
            if (this.activePriority.get(id) === priority) {
                this.activePriority.delete(id);
                return id;
            }
        }
        return -1;
    }
}
```