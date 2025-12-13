/**
 * Validates and returns coupon codes sorted by business line, then alphabetically
 * Valid coupons must: have alphanumeric code, be in valid business line, and be active
 */
const validateCoupons = (code: string[], businessLine: string[], isActive: boolean[]): string[] => {
    const validCodePattern = /^\w+$/; // Alphanumeric + underscore only, non-empty
    const VALID_BUSINESS_LINES = ["electronics", "grocery", "pharmacy", "restaurant"];

    // Initialize map to collect valid codes for each business line
    const codesByBusinessLine = new Map<string, string[]>();
    VALID_BUSINESS_LINES.forEach(line => codesByBusinessLine.set(line, []));

    // Filter and categorize valid coupons
    for (let i = 0; i < code.length; i++) {
        const currentBusinessLine = businessLine[i];
        const isCurrentActive = isActive[i];
        const currentCode = code[i];

        // Check all validation criteria
        const isValidBusinessLine = VALID_BUSINESS_LINES.includes(currentBusinessLine);
        const hasValidFormat = validCodePattern.test(currentCode);

        if (isCurrentActive && isValidBusinessLine && hasValidFormat) {
            codesByBusinessLine.get(currentBusinessLine)!.push(currentCode);
        }
    }

    // Return codes sorted by business line order, then alphabetically within each line
    return VALID_BUSINESS_LINES.flatMap(line =>
        codesByBusinessLine.get(line)!.sort()
    );
};