import { counts, FREE_PAGES, pageError, simplify, splitThoughts, todayLine, toPath, type Thought } from '../dump';

test('splitting a dump into thoughts', () => {
  expect(splitThoughts('buy milk\n\n- call mum\n• fix bike\n3) book dentist  ')).toEqual(['buy milk', 'call mum', 'fix bike', 'book dentist']);
  expect(splitThoughts('   ')).toEqual([]);
  expect(splitThoughts('x'.repeat(500))[0]).toHaveLength(200);
});

test('counts and kind Today lines', () => {
  const t = (bucket: Thought['bucket'], done = false): Thought => ({ id: Math.random().toString(), pageId: 'p', text: 'x', bucket, done, created: '2026-11-23' });
  const c = counts([t('inbox'), t('today'), t('today', true), t('later'), t('never'), t('never')]);
  expect(c).toEqual({ inbox: 1, today: 1, todayDone: 1, later: 1, never: 2 });
  expect(todayLine(c)).toBe('1 to go, 1 done. One at a time.');
  expect(todayLine({ ...c, today: 0 })).toMatch(/Feet up/);
  expect(todayLine({ ...c, today: 0, todayDone: 0 })).toMatch(/Nothing for today/);
});

test('page limits and names', () => {
  const pages = Array.from({ length: FREE_PAGES }, (_, i) => ({ id: String(i), name: `P${i}`, emoji: '📄' }));
  expect(pageError('New', pages, false)).toMatch(/5 pages/);
  expect(pageError('New', pages, true)).toBeNull();
  expect(pageError('p1', pages, true)).toMatch(/already/);
  expect(pageError(' ', [], false)).toMatch(/name/);
});

test('whiteboard strokes simplify and become SVG paths', () => {
  const pts = simplify([[0, 0], [0.5, 0.5], [3, 0], [3.5, 0], [10, 0]]);
  expect(pts).toEqual([[0, 0], [3, 0], [10, 0]]);
  expect(toPath(pts)).toBe('M0.0 0.0 L3.0 0.0 L10.0 0.0');
});
