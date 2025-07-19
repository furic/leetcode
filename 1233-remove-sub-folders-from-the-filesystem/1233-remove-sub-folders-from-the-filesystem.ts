const removeSubfolders = (folders: string[]): string[] => {
    folders.sort();

    const filtered: string[] = [folders[0]];

    for (let i = 1; i < folders.length; i++) {
        const lastKept = filtered.at(-1)!;
        const currentFolder = folders[i];

        if (!currentFolder.startsWith(lastKept + '/')) {
            filtered.push(currentFolder);
        }
    }

    return filtered;
};