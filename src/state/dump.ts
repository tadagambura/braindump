import { todayKey } from '@/kit/dates';
import { persisted, uid } from '@/kit/store';
import type { Bucket, Page, Stroke, Thought } from '@/domain/dump';
import { splitThoughts } from '@/domain/dump';

type DumpState = {
  pages: Page[];
  thoughts: Thought[];
  boards: Record<string, Stroke[]>; // pageId → whiteboard strokes
  addPage: (name: string, emoji: string) => string;
  removePage: (id: string) => void;
  dump: (pageId: string, raw: string) => number;
  sort: (id: string, bucket: Bucket) => Bucket | undefined;
  toggleDone: (id: string) => void;
  clearNever: () => Thought[];
  restore: (ts: Thought[]) => void;
  addStroke: (pageId: string, s: Stroke) => void;
  undoStroke: (pageId: string) => void;
  clearBoard: (pageId: string) => void;
};

const STARTER: Page[] = [
  { id: 'p-everything', name: 'Everything', emoji: '🧠' },
  { id: 'p-home', name: 'Home', emoji: '🏠' },
  { id: 'p-work', name: 'Work', emoji: '💼' },
];

export const useDump = persisted<DumpState>('braindump.dump', 1, (set, get) => ({
  pages: STARTER,
  thoughts: [],
  boards: {},
  addPage: (name, emoji) => {
    const id = uid('p');
    set((s) => ({ pages: [...s.pages, { id, name, emoji }] }));
    return id;
  },
  removePage: (id) => set((s) => ({ pages: s.pages.filter((p) => p.id !== id), thoughts: s.thoughts.filter((t) => t.pageId !== id) })),
  dump: (pageId, raw) => {
    const lines = splitThoughts(raw);
    const day = todayKey();
    set((s) => ({ thoughts: [...s.thoughts, ...lines.map((text) => ({ id: uid('t'), pageId, text, bucket: 'inbox' as Bucket, done: false, created: day }))] }));
    return lines.length;
  },
  sort: (id, bucket) => {
    const prev = get().thoughts.find((t) => t.id === id)?.bucket;
    set((s) => ({ thoughts: s.thoughts.map((t) => (t.id === id ? { ...t, bucket, done: false } : t)) }));
    return prev;
  },
  toggleDone: (id) => set((s) => ({ thoughts: s.thoughts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
  clearNever: () => {
    const gone = get().thoughts.filter((t) => t.bucket === 'never');
    set((s) => ({ thoughts: s.thoughts.filter((t) => t.bucket !== 'never') }));
    return gone;
  },
  restore: (ts) => set((s) => ({ thoughts: [...s.thoughts, ...ts] })),
  addStroke: (pageId, st) => set((s) => ({ boards: { ...s.boards, [pageId]: [...(s.boards[pageId] ?? []), st] } })),
  undoStroke: (pageId) => set((s) => ({ boards: { ...s.boards, [pageId]: (s.boards[pageId] ?? []).slice(0, -1) } })),
  clearBoard: (pageId) => set((s) => ({ boards: { ...s.boards, [pageId]: [] } })),
}));
