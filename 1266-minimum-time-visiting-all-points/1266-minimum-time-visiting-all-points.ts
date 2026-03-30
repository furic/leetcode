const minTimeToVisitAllPoints = (points: number[][]): number =>
    points.reduce((time, point, i) =>
        time + (i > 0 ? Math.max(
            Math.abs(points[i - 1][0] - point[0]),
            Math.abs(points[i - 1][1] - point[1])
        ) : 0)
        , 0);