type Task = [number, number, number]; // [userId, taskId, priority]
class TaskManager {
    private heap: PriorityQueue<Task>;
    private tasks: Map<number, Task>;
    constructor(tasks: Task[]) {
        this.heap = new PriorityQueue<Task>((a, b) => b[2] - a[2] || b[1] - a[1], tasks);
        this.tasks = new Map(tasks.map((task) => [task[1], task]));
    }

    add(userId: number, taskId: number, priority: number) {
        this.heap.enqueue([userId, taskId, priority]);
        this.tasks.set(taskId, [userId, taskId, priority]);
    }

    edit(taskId: number, newPriority: number) {
        const oldTask = this.tasks.get(taskId)!;
        const newTask: Task = [oldTask[0], taskId, newPriority];
        this.tasks.set(taskId, newTask);
        this.heap.enqueue(newTask);
    }

    rmv(taskId: number) {
        this.tasks.delete(taskId);
    }

    execTop() {
        while (!this.heap.isEmpty()) {
            const task = this.heap.dequeue();
            const cur = this.tasks.get(task[1]);
            if (cur?.[0] === task[0] && cur[2] === task[2]) {
                this.rmv(task[1]);
                return task[0];
            }
        }
        return -1;
    }
}