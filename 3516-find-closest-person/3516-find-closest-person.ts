function findClosest(x: number, y: number, z: number): number {
    const dxz = Math.abs(x - z),
        dyz = Math.abs(y - z);
    if (dxz < dyz) {
        return 1;
    } else if (dxz > dyz) {
        return 2;
    } else {
        return 0;
    }
}