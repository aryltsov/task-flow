export function buildSearchIndex(...fields: string[]): string[] {
  return Array.from(
    new Set(
      fields
        .join(' ')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .split(' ')
        .filter(Boolean)
    )
  );
}
