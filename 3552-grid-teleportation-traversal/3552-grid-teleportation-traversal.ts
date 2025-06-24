const EMPTY = '.';
const OBSTACLE = '#';
const ALPHABET_SIZE = 26;
const NOT_POSSIBLE = -1;
const MOVES = [[-1, 0], [1, 0], [0, -1], [0, 1]];

type Point = { row: number, col: number };
type Step = { row: number, col: number, dist: number };

function minMoves(matrix: string[]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const teleportPoints: Point[][] = Array.from({ length: ALPHABET_SIZE }, () => []);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const ch = matrix[i][j];
            if (ch >= 'A' && ch <= 'Z') {
                const index = ch.charCodeAt(0) - 'A'.charCodeAt(0);
                teleportPoints[index].push({ row: i, col: j });
            }
        }
    }
    
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = new Queue<Step>();
    queue.enqueue({ row: 0, col: 0, dist: 0 });
    visited[0][0] = true;
    
    const startChar = matrix[0][0];
    if (startChar >= 'A' && startChar <= 'Z') {
        const index = startChar.charCodeAt(0) - 'A'.charCodeAt(0);
        if (teleportPoints[index].length > 0) {
            for (const point of teleportPoints[index]) {
                if (!visited[point.row][point.col]) {
                    visited[point.row][point.col] = true;
                    queue.enqueue({ row: point.row, col: point.col, dist: 0 });
                }
            }
            teleportPoints[index] = [];
        }
    }
    
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        if (current.row === rows - 1 && current.col === cols - 1) {
            return current.dist;
        }
        
        for (const [dr, dc] of MOVES) {
            const nextRow = current.row + dr;
            const nextCol = current.col + dc;
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;
            if (matrix[nextRow][nextCol] === OBSTACLE) continue;
            if (visited[nextRow][nextCol]) continue;
            
            const ch = matrix[nextRow][nextCol];
            if (ch >= 'A' && ch <= 'Z') {
                const index = ch.charCodeAt(0) - 'A'.charCodeAt(0);
                if (teleportPoints[index].length > 0) {
                    for (const point of teleportPoints[index]) {
                        if (!visited[point.row][point.col]) {
                            visited[point.row][point.col] = true;
                            queue.enqueue({ row: point.row, col: point.col, dist: current.dist + 1 });
                        }
                    }
                    teleportPoints[index] = [];
                    visited[nextRow][nextCol] = true;
                    continue;
                }
            }
            
            visited[nextRow][nextCol] = true;
            queue.enqueue({ row: nextRow, col: nextCol, dist: current.dist + 1 });
        }
    }
    
    return NOT_POSSIBLE;
}