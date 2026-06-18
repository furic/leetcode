# Clock Hand Angle Formula | 4 Lines | O(1) | 0ms

# Intuition
Both hands' angles can be computed directly as fractions of 360°. The smaller angle between them is the minimum of the absolute difference and its complement to 360°.

# Approach
- Hour hand: moves `360/12 = 30°` per hour, plus `0.5°` per minute (`minutes/60 * 30`). Combined: `((hour % 12) + minutes/60) / 12 * 360`.
- Minute hand: `minutes/60 * 360`.
- Absolute difference gives one of the two angles; the other is `360 - diff`. Return the smaller.

# Complexity
- Time complexity: $$O(1)$$ — pure arithmetic.

- Space complexity: $$O(1)$$.

# Code
```typescript []
const angleClock = (hour: number, minutes: number): number => {
    const hourAngle   = ((hour % 12) + minutes / 60) / 12 * 360;
    const minuteAngle = minutes / 60 * 360;
    const diff = Math.abs(hourAngle - minuteAngle);
    return Math.min(diff, 360 - diff);
};
```