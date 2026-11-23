import { router } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { track } from '@/kit/analytics';
import { useCelebrate } from '@/kit/celebrate';
import { useFeedback } from '@/kit/feedback';
import { PaywallSheet } from '@/kit/Paywall';
import { usePremium } from '@/kit/premium';
import { Button, Card, Chip, Field, H1, Muted, Note, Row, Screen, Section, Sheet, Stack, Strong } from '@/kit/ui';
import { counts, FREE_PAGES, pageError, type Bucket } from '@/domain/dump';
import { useDump } from '@/state/dump';

const SORTS: { b: Bucket; label: string }[] = [
  { b: 'today', label: 'Today' },
  { b: 'later', label: 'Later' },
  { b: 'never', label: 'Never' },
];

export default function Dump() {
  const d = useDump();
  const { isPremium } = usePremium();
  const { toast } = useFeedback();
  const celebrate = useCelebrate();
  const { width } = useWindowDimensions();
  const [pageId, setPageId] = useState(d.pages[0]?.id ?? '');
  const [text, setText] = useState('');
  const [newPage, setNewPage] = useState(false);
  const [pageName, setPageName] = useState('');
  const [paywall, setPaywall] = useState<string | null>(null);
  const page = d.pages.find((p) => p.id === pageId) ?? d.pages[0];
  const inbox = d.thoughts.filter((t) => t.pageId === page?.id && t.bucket === 'inbox');
  const c = counts(d.thoughts, page?.id);

  const dumpIt = () => {
    if (!page) return;
    const n = d.dump(page.id, text);
    if (!n) return;
    setText('');
    track('core_action_completed', { what: 'dump', thoughts: n });
    if (n >= 10) celebrate({ scene: 'big-dump', emoji: '🤯', title: `${n} thoughts out!`, body: "Kaos's head steams… then a tiny 'ding'. Now sort them." });
  };
  const sort = (id: string, b: Bucket) => {
    const prev = d.sort(id, b);
    const left = inbox.length - 1;
    if (left === 0) celebrate({ scene: 'sorted', emoji: '🗂️', title: 'All sorted', body: "Kaos's scrambled brain untangles into three neat piles." });
    else toast(b === 'never' ? 'Binned. Guilt-free.' : `Moved to ${b === 'today' ? 'Today' : 'Later'}.`, { actionLabel: 'Undo', onAction: () => prev && useDump.getState().sort(id, prev) });
  };

  return (
    <Screen testID="dump">
      <H1>Brain Dump</H1>
      <Row wrap gap={6}>
        {d.pages.map((p) => (
          <Chip key={p.id} label={`${p.emoji} ${p.name}`} selected={p.id === page?.id} onPress={() => setPageId(p.id)} testID={`page-${p.name}`} />
        ))}
        <Chip label="+ Page" onPress={() => (!isPremium && d.pages.length >= FREE_PAGES ? setPaywall(`Free Brain Dump has ${FREE_PAGES} pages. Premium has as many as you like.`) : setNewPage(true))} testID="page-add" />
      </Row>
      <Field label={`Dump into ${page?.name ?? ''}`} value={text} onChangeText={setText} multiline placeholder={'One thought per line…\nbuy milk\nemail Sam back\nthat idea about the shed'} style={{ minHeight: 140, textAlignVertical: 'top' }} testID="dump-input" />
      <Button title="Dump it" icon="arrow-down-circle-outline" disabled={!text.trim()} onPress={dumpIt} testID="dump-go" />
      <Row wrap gap={8}>
        <Button
          small
          variant="secondary"
          title={width >= 768 ? 'Whiteboard' : 'Whiteboard (best on tablets)'}
          icon="brush-outline"
          onPress={() => (isPremium ? router.push(`/board/${page?.id}`) : setPaywall('The whiteboard is part of Premium, made for tablets and visual thinkers.'))}
          testID="board-open"
        />
      </Row>

      <Section title={`To sort (${inbox.length})`}>
        {inbox.length === 0 ? <Muted>{c.today + c.later + c.never ? 'All sorted. Dump more whenever your head fills up.' : 'Nothing yet. Empty your head above.'}</Muted> : null}
        <Stack gap={8}>
          {inbox.map((t) => (
            <Card key={t.id} testID={`thought-${t.text}`}>
              <Strong>{t.text}</Strong>
              <Row gap={8}>
                {SORTS.map((s) => (
                  <Button key={s.b} small variant={s.b === 'today' ? 'primary' : s.b === 'later' ? 'secondary' : 'ghost'} title={s.label} accessibilityLabel={`${s.label}: ${t.text}`} onPress={() => sort(t.id, s.b)} testID={`sort-${s.b}-${t.text}`} />
                ))}
              </Row>
            </Card>
          ))}
        </Stack>
      </Section>
      <Note>{`${page?.name}: ${c.today} today · ${c.later} later · ${c.never} binned`}</Note>

      <Sheet visible={newPage} onClose={() => setNewPage(false)} title="New page">
        <Stack>
          <Field label="Page name" value={pageName} onChangeText={setPageName} maxLength={20} testID="page-name" />
          <Button
            title="Add page"
            testID="page-save"
            onPress={() => {
              const err = pageError(pageName, d.pages, isPremium);
              if (err) return toast(err);
              setPageId(d.addPage(pageName.trim(), '📄'));
              setPageName('');
              setNewPage(false);
            }}
          />
        </Stack>
      </Sheet>
      <PaywallSheet visible={!!paywall} onClose={() => setPaywall(null)} reason={paywall ?? undefined} />
    </Screen>
  );
}
