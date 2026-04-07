class Robot {
    private w: number;
    private h: number;
    private per: number;
    private pos: number;
    private moved: boolean;

    constructor(width: number, height: number) {
        this.w = width;
        this.h = height;
        this.per = 2 * (width + height - 2);
        this.pos = 0;
        this.moved = false;
    }

    step(num: number): void {
        this.moved = true;
        this.pos = (this.pos + num) % this.per;
    }

    getPos(): number[] {
        const p = this.pos;
        if (p < this.w) return [p, 0];
        if (p < this.w + this.h - 1) return [this.w - 1, p - (this.w - 1)];
        if (p < 2 * this.w + this.h - 2) return [(this.w - 1) - (p - (this.w + this.h - 2)), this.h - 1];
        return [0, this.per - p];
    }

    getDir(): string {
        const p = this.pos;
        if (p === 0) return this.moved ? "South" : "East";
        if (p < this.w) 
            return "East";
        if (p < this.w + this.h - 1) 
            return "North";
        if (p < 2 * this.w + this.h - 2) 
            return "West";
        return "South";
    }
}