# Priority Queue Lazy Deletion | 42 Lines | O(log n) | 400ms

# Intuition
This task management system needs to efficiently find and execute the highest priority task while supporting updates and removals. The key insight is to use a priority queue for maintaining task order combined with a lookup table for authoritative data. Since priority queues don't support efficient arbitrary element updates or deletions, we can use lazy deletion where outdated entries are filtered out only when accessed.

# Approach
I'll use a dual data structure approach with lazy deletion:

1. **Priority Queue for Ranking**: Maintain tasks ordered by priority (descending) and taskId (descending for ties). This enables O(log n) insertions and O(1) access to the highest priority task.

2. **Lookup Table for Authority**: A hash map storing current task data, serving as the single source of truth. Tasks not in this table are considered removed.

3. **Lazy Deletion Strategy**: Instead of immediately removing old entries from the priority queue (which is expensive), add new entries for updates and filter stale entries only during execution.

4. **Task Representation**: Use tuples [userId, taskId, priority] for efficient storage and comparison.

5. **Update Process**: When editing a task, update the authoritative lookup table and add a new entry to the priority queue. The old entry becomes "stale" but remains until filtered out.

6. **Execution Process**: When executing the top task, verify it matches the authoritative data. If stale, remove it and check the next task. Continue until finding a valid task or queue becomes empty.

# Complexity
- Time complexity: $$O(\log n)$$
  - add: O(log n) for priority queue insertion
  - edit: O(log n) for priority queue insertion  
  - rmv: O(1) for lookup table deletion
  - execTop: O(k log n) where k is number of stale entries, amortized O(log n)

- Space complexity: $$O(n + u)$$
  - Lookup table stores n active tasks: O(n)
  - Priority queue may contain multiple versions due to updates: O(n + u) where u is number of updates
  - Overall space grows with updates but remains reasonable in practice

# Code
```typescript []
type TaskItem = [number, number, number];

class TaskManager {
    private taskPriorityQueue: PriorityQueue<TaskItem>;
    
    private activeTasksLookup: Map<number, TaskItem>;

    constructor(initialTasks: TaskItem[]) {
        this.taskPriorityQueue = new PriorityQueue<TaskItem>(
            (first, second) => second[2] - first[2] || second[1] - first[1], 
            initialTasks
        );
        
        this.activeTasksLookup = new Map(initialTasks.map((task) => [task[1], task]));
    }

    add(userId: number, taskId: number, priority: number): void {
        const newTask: TaskItem = [userId, taskId, priority];
        this.taskPriorityQueue.enqueue(newTask);
        this.activeTasksLookup.set(taskId, newTask);
    }

    edit(taskId: number, newPriority: number): void {
        const existingTask = this.activeTasksLookup.get(taskId)!;
        const updatedTask: TaskItem = [existingTask[0], taskId, newPriority];
        
        this.activeTasksLookup.set(taskId, updatedTask);
        
        this.taskPriorityQueue.enqueue(updatedTask);
    }

    rmv(taskId: number): void {
        this.activeTasksLookup.delete(taskId);
    }

    execTop(): number {
        while (!this.taskPriorityQueue.isEmpty()) {
            const candidateTask = this.taskPriorityQueue.dequeue();
            const currentTask = this.activeTasksLookup.get(candidateTask[1]);
            
            if (currentTask?.[0] === candidateTask[0] && currentTask[2] === candidateTask[2]) {
                this.rmv(candidateTask[1]);
                return candidateTask[0];
            }
        }
        
        return -1;
    }
}
```