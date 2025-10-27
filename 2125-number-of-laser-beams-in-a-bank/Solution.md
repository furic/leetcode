# Sequential Row Product | 30 Lines | O(m × n) | 14ms

# Intuition
Laser beams connect devices on different rows only if there are no devices in between. This means we only need to track consecutive rows that contain devices, and the number of beams between two such rows is the product of their device counts (each device in one row connects to each device in the other).

# Approach
**Single Pass with Previous Row Tracking:**
- Process rows sequentially from top to bottom
- Track the device count of the most recent row that had devices
- When we encounter a new row with devices, calculate beams as product of counts
- Skip empty rows (they don't break the beam condition, just ignored)

**Step-by-Step Process:**

1. **Initialize Tracking:**
   - `totalBeams = 0` - accumulator for result
   - `previousRowDeviceCount = 0` - tracks last non-empty row's device count

2. **Process Each Row:**
   - Count devices (1's) in current row
   - If count is 0, skip (empty row doesn't contribute)
   - If count > 0, this is a "valid" row

3. **Calculate Beams:**
   - Beams between current and previous non-empty row:
     - `beams = previousRowDeviceCount × currentRowDeviceCount`
   - Each device in previous row connects to each device in current row
   - This is a complete bipartite graph between the two device sets

4. **Update State:**
   - Set `previousRowDeviceCount = currentRowDeviceCount`
   - This row becomes the "previous" for future iterations

5. **Return Total:**
   - Sum of all beam calculations across all valid row pairs

**Why This Works:**

**Beam Calculation Logic:**
- Between two rows with devices, every device pair forms a beam
- If row A has m devices and row B has n devices:
  - Total beams = m × n (combinatorial product)
- Empty rows between them don't matter (condition explicitly allows this)

**Sequential Processing:**
- Only consecutive non-empty rows form beam connections
- No need to track which specific devices connect
- Only the counts matter for total beam calculation

**Example Walkthrough (bank = ["011001","000000","010100","001000"]):**

**Row 0: "011001"**
- Device count = 3 (positions 1, 2, 5)
- previousRowDeviceCount = 0 (first row)
- Beams: 0 × 3 = 0
- Update: previousRowDeviceCount = 3

**Row 1: "000000"**
- Device count = 0
- Skip (no devices)
- previousRowDeviceCount remains 3

**Row 2: "010100"**
- Device count = 2 (positions 1, 3)
- previousRowDeviceCount = 3
- Beams: 3 × 2 = 6
  - Each of 3 devices in row 0 connects to each of 2 devices in row 2
- Update: previousRowDeviceCount = 2

**Row 3: "001000"**
- Device count = 1 (position 2)
- previousRowDeviceCount = 2
- Beams: 2 × 1 = 2
  - Each of 2 devices in row 2 connects to 1 device in row 3
- Update: previousRowDeviceCount = 1

**Total:** 0 + 6 + 2 = 8 ✓

**Visual Representation:**
```
Row 0: 011001 (3 devices)
       ↓↓↓↓↓↓ (6 beams)
Row 2: 010100 (2 devices)
       ↓↓ (2 beams)
Row 3: 001000 (1 device)
```

**Example 2 (bank = ["000","111","000"]):**

- Row 0: 0 devices, skip
- Row 1: 3 devices, previousRowDeviceCount=0 → beams = 0×3 = 0
- Row 2: 0 devices, skip
- Total: 0 ✓

**Key Insights:**

**Why Product:**
- Combinatorial: choosing 1 device from each row
- Complete bipartite graph K_{m,n} has m×n edges

**Why Skip Empty Rows:**
- Problem states beams exist if "no devices in rows between"
- Empty rows don't block beams
- We only connect consecutive non-empty rows

**First Row Handling:**
- previousRowDeviceCount starts at 0
- First non-empty row: 0 × count = 0 beams (correct!)
- No row above to connect to

**Edge Cases:**

**All empty rows:**
- Result: 0 (no devices, no beams)

**Single row with devices:**
- No row to connect to → 0 beams

**No empty rows between devices:**
- Each consecutive pair contributes beams
- Example: ["11","11"] → 2×2 = 4 beams

**Many empty rows between:**
- Doesn't affect calculation
- Only non-empty row counts matter

# Complexity
- Time complexity: $$O(m \times n)$$ where m is number of rows, n is row length - must scan all cells to count devices
- Space complexity: $$O(1)$$ - only using a few variables for tracking

# Code
```typescript
const numberOfBeams = (bank: string[]): number => {
    let totalBeams = 0;
    let previousRowDeviceCount = 0;

    for (let rowIndex = 0; rowIndex < bank.length; rowIndex++) {
        const currentRowDeviceCount = countDevicesInRow(bank[rowIndex]);
        
        if (currentRowDeviceCount === 0) {
            continue;
        }

        totalBeams += previousRowDeviceCount * currentRowDeviceCount;
        previousRowDeviceCount = currentRowDeviceCount;
    }

    return totalBeams;
};

const countDevicesInRow = (row: string): number => {
    let deviceCount = 0;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (row[colIndex] === '1') {
            deviceCount++;
        }
    }

    return deviceCount;
};
```