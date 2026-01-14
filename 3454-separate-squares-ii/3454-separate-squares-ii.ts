function separateSquares(squares: number[][]): number {
    const events: [number, number, number, number][] = [];
    for (const sq of squares) {
        const x = sq[0], y = sq[1], length = sq[2];
        events.push([y, 1, x, x + length]);
        events.push([y + length, -1, x, x + length]);
    }

    events.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]);

    let active_intervals: [number, number][] = [];
    let prev_y = events[0][0];
    let total_area = 0;
    const horizontal_slices: [number, number, number][] = [];

    const union_width = (intervals: [number, number][]): number => {
        intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        let total_width = 0;
        let rightmost = -1e30;
        for (const [left, right] of intervals) {
            if (left > rightmost) {
                total_width += right - left;
                rightmost = right;
            } else if (right > rightmost) {
                total_width += right - rightmost;
                rightmost = right;
            }
        }
        return total_width;
    };

    for (const [y, event_type, x_left, x_right] of events) {
        if (y > prev_y && active_intervals.length) {
            const height = y - prev_y;
            const width = union_width(active_intervals.slice());
            horizontal_slices.push([prev_y, height, width]);
            total_area += height * width;
        }

        if (event_type === 1) {
            active_intervals.push([x_left, x_right]);
        } else {
            for (let i = 0; i < active_intervals.length; i++) {
                if (active_intervals[i][0] === x_left && active_intervals[i][1] === x_right) {
                    active_intervals.splice(i, 1);
                    break;
                }
            }
        }

        prev_y = y;
    }

    const half = total_area / 2;
    let accumulated = 0;

    for (const [start_y, height, width] of horizontal_slices) {
        const slice_area = height * width;
        if (accumulated + slice_area >= half) {
            return start_y + (half - accumulated) / width;
        }
        accumulated += slice_area;
    }

    return prev_y;
};