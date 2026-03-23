export interface ParsedRateWindow {
  minRate: number;
  maxRate: number;
}

export function extractRateWindow(text: string): ParsedRateWindow | null {
  const matches = text.match(/\b\d{1,2}(?:\.\d{1,2})?\s?%/g) ?? [];
  if (matches.length === 0) {
    return null;
  }

  const parsed = matches
    .map((raw) => Number.parseFloat(raw.replace(/[^\d.]/g, '')))
    .filter((value) => Number.isFinite(value));

  if (parsed.length === 0) {
    return null;
  }

  const minRate = Math.min(...parsed);
  const maxRate = Math.max(...parsed);

  return { minRate, maxRate };
}
