function maximumSafenessFactor(grid: number[][]): number {
    const [rows, cols] = [grid.length, grid[0].length];
    const directions: number[][] = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    if ( grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1 ) {
        return 0;
    }
    const dist: number[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(-1));
    let queue: [number, number][] = [];
    for ( let row = 0; row < rows; row++ ) {
        for ( let col = 0; col < cols; col++ ) {
            if ( grid[row][col] === 1 ) {
                queue.push([row, col]);
                dist[row][col] = 0;
            }
        }
    }
    let index: number = 0;
    while ( index < queue.length ) {
        const [row, col] = queue[index++];
        for ( const [ar, ac] of directions ) {
            const [nr, nc] = [ar + row, ac + col];
            if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && dist[nr][nc] === -1 ) {
                dist[nr][nc] = dist[row][col] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    let heap = new MaxPriorityQueue<[number, number, number]>(([row, col, d]) => d);
    heap.enqueue([0, 0, dist[0][0]]);
    const visited: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    visited[0][0] = true;
    while ( heap.size() > 0 ) {
        const [row, col, d] = heap.dequeue();
        if ( row === rows - 1 && col === cols - 1 ) {
            return d;
        }
        for ( const [ar, ac] of directions ) {
            const [nr, nc] = [ar + row, ac + col];
            if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] ) {
                visited[nr][nc] = true;
                heap.enqueue([nr, nc, Math.min(d, dist[nr][nc])]);
            }
        }
    }
    // const [rows, cols] = [grid.length, grid[0].length];
    // const directions: number[][] = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    // if ( grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1 ) {
    //     return 0;
    // }
    // const dist: number[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(-1));
    // let queue: [number, number][] = [];
    // for ( let row = 0; row < rows; row++ ) {
    //     for ( let col = 0; col < cols; col++ ) {
    //         if ( grid[row][col] === 1 ) {
    //             queue.push([row, col]);
    //             dist[row][col] = 0;
    //         }
    //     }
    // }
    // let index: number = 0;
    // while ( index < queue.length ) {
    //     const [row, col] = queue[index++];
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && dist[nr][nc] === -1 ) {
    //             dist[nr][nc] = dist[row][col] + 1;
    //             queue.push([nr, nc]);
    //         }
    //     }
    // }
    // let heap = new MaxPriorityQueue<[number, number, number]>(([row, col, d]) => d);
    // heap.enqueue([0, 0, dist[0][0]]);
    // const visited: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    // visited[0][0] = true;
    // while ( heap.size() > 0 ) {
    //     const [row, col, d] = heap.dequeue();
    //     if ( row === rows - 1 && col === cols - 1 ) {
    //         return d;
    //     }
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] ) {
    //             visited[nr][nc] = true;
    //             heap.enqueue([nr, nc, Math.min(d, dist[nr][nc])]);
    //         }
    //     }
    // }
    // const [rows, cols] = [grid.length, grid[0].length];
    // const directions: number[][] = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    // if ( grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1 ) {
    //     return 0;
    // }
    // const dist: number[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(-1));
    // let queue: [number, number][] = [];
    // for ( let row = 0; row < rows; row++ ) {
    //     for ( let col = 0; col < cols; col++ ) {
    //         if ( grid[row][col] === 1 ) {
    //             queue.push([row, col]);
    //             dist[row][col] = 0;
    //         }
    //     }
    // }
    // let index: number = 0;
    // while ( index < queue.length ) {
    //     const [row, col] = queue[index++];
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && dist[nr][nc] === -1 ) {
    //             dist[nr][nc] = dist[row][col] + 1;
    //             queue.push([nr, nc]);
    //         }
    //     }
    // }
    // let heap = new MaxPriorityQueue<[number, number, number]>(([row, col, d]) => d);
    // heap.enqueue([0, 0, dist[0][0]]);
    // const visited: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    // visited[0][0] = true;
    // while ( heap.size() > 0 ) {
    //     const [row, col, d] = heap.dequeue();
    //     if ( row === rows - 1 && col === cols - 1 ) {
    //         return d;
    //     }
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] ) {
    //             visited[nr][nc] = true;
    //             heap.enqueue([nr, nc, Math.min(d, dist[nr][nc])]);
    //         }
    //     }
    // }
    // const [rows, cols] = [grid.length, grid[0].length];
    // const directions: number[][] = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    // if ( grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1 ) {
    //     return 0;
    // }
    // const dist: number[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(-1));
    // let queue: [number, number][] = [];
    // for ( let row = 0; row < rows; row++ ) {
    //     for ( let col = 0; col < cols; col++ ) {
    //         if ( grid[row][col] === 1 ) {
    //             queue.push([row, col]);
    //             dist[row][col] = 0;
    //         }
    //     }
    // }
    // let index: number = 0;
    // while ( index < queue.length ) {
    //     const [row, col] = queue[index++];
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && dist[nr][nc] === -1 ) {
    //             dist[nr][nc] = dist[row][col] + 1;
    //             queue.push([nr, nc]);
    //         }
    //     }
    // }
    // let heap = new MaxPriorityQueue<[number, number, number]>(([row, col, d]) => d);
    // heap.enqueue([0, 0, dist[0][0]]);
    // const visited: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    // visited[0][0] = true;
    // while ( heap.size() > 0 ) {
    //     const [row, col, d] = heap.dequeue();
    //     if ( row === rows - 1 && col === cols - 1 ) {
    //         return d;
    //     }
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] ) {
    //             visited[nr][nc] = true;
    //             heap.enqueue([nr, nc, Math.min(d, dist[nr][nc])]);
    //         }
    //     }
    // }
    // let max: number = Number.MIN_SAFE_INTEGER;
    // function dfs(row, col, min, visited) {
    //     if ( row === rows - 1 && col === cols - 1 ) {
    //         max = Math.max(max, min);
    //         return;
    //     }
    //     if ( row === rows || col === cols || row < 0 || col < 0 ) {
    //         return;
    //     }
    //     for ( const [ar, ac] of directions ) {
    //         const [nr, nc] = [ar + row, ac + col];
    //         if ( nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] ) {
    //             visited[nr][nc] = true;
    //             dfs(nr, nc, Math.min(min, dist[nr][nc]), visited);
    //             visited[nr][nc] = false;
    //         }
    //     }
    // }
    // const visited: boolean[][] = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    // visited[0][0] = true;
    // dfs(0, 0, dist[0][0], visited);
    // return max;
};