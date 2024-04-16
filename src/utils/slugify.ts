export function slugify(string: string): string {
    return string.toLocaleLowerCase().replaceAll(/\s+/g, "_");
}
