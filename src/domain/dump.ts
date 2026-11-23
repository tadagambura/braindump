// Brain Dump: dump first, sort second. Thoughts live on pages and get sorted into Today, Later or Never.

export type Bucket = 'inbox' | 'today' | 'later' | 'never';
export type Thought = { id: string; pageId: string; text: string; bucket: Bucket; done: boolean; created: string };
export type Page = { id: string; name: string; emoji: string };

export const FREE_PAGES = 5;
export const MAX_THOUGHT = 200;

/** Split pasted or typed text into thoughts: one per line, bullets stripped, blanks dropped. */
export function splitThoughts(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*([-*•·]|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .map((l) => (l.length > MAX_THOUGHT ? l.slice(0, MAX_THOUGHT) : l));
}

export function counts(thoughts: Thought[], pageId?: string) {
  const mine = pageId ? thoughts.filter((t) => t.pageId === pageId) : thoughts;
  return {
    inbox: mine.filter((t) => t.bucket === 'inbox').length,
    today: mine.filter((t) => t.bucket === 'today' && !t.done).length,
    todayDone: mine.filter((t) => t.bucket === 'today' && t.done).length,
    later: mine.filter((t) => t.bucket === 'later').length,
    never: mine.filter((t) => t.bucket === 'never').length,
  };
}

/** Kind, short status line for the Today list. Never shames an unfinished list. */
export function todayLine(c: ReturnType<typeof counts>): string {
  if (c.today === 0 && c.todayDone === 0) return 'Nothing for today yet. Sort a few thoughts into Today.';
  if (c.today === 0) return `All ${c.todayDone} done. Feet up. 🛋️`;
  return `${c.today} to go${c.todayDone ? `, ${c.todayDone} done` : ''}. One at a time.`;
}

export function pageError(name: string, pages: Page[], premium: boolean): string | null {
  if (!name.trim()) return 'Give the page a name.';
  if (!premium && pages.length >= FREE_PAGES) return `Free Brain Dump has ${FREE_PAGES} pages.`;
  if (pages.some((p) => p.name.toLowerCase() === name.trim().toLowerCase())) return 'You already have a page with that name.';
  return null;
}

// ---------- Whiteboard (Premium, tablets) ----------
export type Stroke = { color: string; width: number; points: [number, number][] };

/** Simplify a stroke by dropping points closer than `min` pixels to the last kept one. */
export function simplify(points: [number, number][], min = 2): [number, number][] {
  const out: [number, number][] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= min) out.push(p);
  }
  return out;
}

export function toPath(points: [number, number][]): string {
  if (!points.length) return '';
  const [first, ...rest] = points;
  return `M${first[0].toFixed(1)} ${first[1].toFixed(1)}` + rest.map((p) => ` L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
}
