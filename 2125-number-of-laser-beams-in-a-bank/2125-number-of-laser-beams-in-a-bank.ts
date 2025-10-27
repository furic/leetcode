const numberOfBeams = (bank: string[]): number => {
    let totalBeams = 0;
    let previousRowDeviceCount = 0;

    for (const row of bank) {
        const currentRowDeviceCount = countDevicesInRow(row);
        
        // Skip rows with no devices
        if (currentRowDeviceCount === 0) {
            continue;
        }

        // Calculate beams: each device in current row connects to each device in previous row
        totalBeams += previousRowDeviceCount * currentRowDeviceCount;
        
        // Update for next iteration
        previousRowDeviceCount = currentRowDeviceCount;
    }

    return totalBeams;
};

const countDevicesInRow = (row: string): number => {
    let deviceCount = 0;

    for (const cell of row) {
        if (cell === '1') {
            deviceCount++;
        }
    }

    return deviceCount;
};