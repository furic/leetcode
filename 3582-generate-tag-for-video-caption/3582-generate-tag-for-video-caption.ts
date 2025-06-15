const generateTag = (caption: string): string => {
    const words = caption
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.replace(/[^a-zA-Z]/g, ""));

    if (words.length === 0) return "#";

    const camel = [
        words[0].toLowerCase(),
        ...words
            .slice(1)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    ].join("");

    return "#" + camel.slice(0, 99);
};
