function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    asteroids.sort((a, b) => a - b);
    let curr: number = mass;
    for (const x of asteroids) {
        if (curr < x)
            return false;
        curr += x;
    }
    return true;
};