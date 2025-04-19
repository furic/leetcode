const findClosest = (x: number, y: number, z: number): number => {
    const xz = Math.abs(x - z);
    const yz = Math.abs(y - z);
    return xz < yz ? 1 : yz < xz ? 2 : 0;
};
