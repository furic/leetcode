function compareVersion(version1: string, version2: string): number {
    let index1 = 0, index2 = 0;
    const length1 = version1.length;
    const length2 = version2.length;

    while (index1 < length1 || index2 < length2) {
        let number1 = 0;
        while (index1 < length1 && version1[index1] !== '.') {
            number1 = number1 * 10 + Number(version1[index1]);
            index1++;
        }
        index1++;

        let number2 = 0;
        while (index2 < length2 && version2[index2] !== '.') {
            number2 = number2 * 10 + Number(version2[index2]);
            index2++;
        }
        index2++; 

        if (number1 > number2) return 1;
        if (number1 < number2) return -1;
    }
    return 0;

};