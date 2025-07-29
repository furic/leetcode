const removeSubfolders = (folders: string[]): string[] => {
    folders.sort();

    let lastKept = folders[0];
    const filtered: string[] = [lastKept];

    for (let i = 1; i < folders.length; i++) {
        const currentFolder = folders[i];

        if (!currentFolder.startsWith(lastKept + '/')) {
            filtered.push(currentFolder);
            lastKept = currentFolder; // update for next checks
        }
    }

    return filtered;
};