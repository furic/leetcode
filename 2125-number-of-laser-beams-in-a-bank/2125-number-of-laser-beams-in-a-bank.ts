const numberOfBeams = (bank: string[]): number => {
    let totalBeams = 0;
    let previousRowDeviceCount = 0;

    for (let rowIndex = 0; rowIndex < bank.length; rowIndex++) {
        const currentRowDeviceCount = countDevicesInRow(bank[rowIndex]);
        
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

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (row[colIndex] === '1') {
            deviceCount++;
        }
    }

    return deviceCount;
};