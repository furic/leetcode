const validateCoupons = (
  code: string[], 
  businessLine: string[], 
  isActive: boolean[]
): string[] => {
  // Priority order for business categories
  const categoryPriority: Record<string, number> = {
    electronics: 1,
    grocery: 2,
    pharmacy: 3,
    restaurant: 4,
  };

  // Check if code is non-empty and contains only alphanumeric and underscores
  const isValidCode = (codeStr: string): boolean => /^[a-zA-Z0-9_]+$/.test(codeStr);

  // Collect valid coupons with their category priority for sorting
  const validCoupons: { code: string; categoryRank: number }[] = [];

  for (let i = 0; i < code.length; i++) {
    const currentCode = code[i];
    const currentCategory = businessLine[i];
    const active = isActive[i];

    if (
      active &&
      isValidCode(currentCode) &&
      categoryPriority.hasOwnProperty(currentCategory)
    ) {
      validCoupons.push({
        code: currentCode,
        categoryRank: categoryPriority[currentCategory],
      });
    }
  }

  // Sort by businessLine priority, then lex order by code
  validCoupons.sort((a, b) => {
    if (a.categoryRank !== b.categoryRank) {
      return a.categoryRank - b.categoryRank;
    }
    return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
  });

  // Return only the codes in sorted order
  return validCoupons.map(coupon => coupon.code);
};