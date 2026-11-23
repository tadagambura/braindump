import { useFeedback } from '@/kit/feedback';
import { KitSettings } from '@/kit/Settings';
import { Card, ListRow, Section } from '@/kit/ui';
import { useDump } from '@/state/dump';

export default function Settings() {
  const pages = useDump((s) => s.pages);
  const removePage = useDump((s) => s.removePage);
  const { confirm } = useFeedback();
  return (
    <KitSettings reminder={{ title: 'Brain Dump', body: 'Head full? Two minutes to empty it before bed.', explain: 'One evening nudge to empty your head. Never more.' }}>
      <Section title="Pages">
        <Card>
          {pages.map((p) => (
            <ListRow key={p.id} title={`${p.emoji} ${p.name}`} subtitle={pages.length > 1 ? 'Tap to delete this page and its thoughts' : undefined} onPress={pages.length > 1 ? async () => { if (await confirm({ title: `Delete ${p.name}?`, body: 'Its thoughts and whiteboard go too.', confirmLabel: 'Delete', destructive: true })) removePage(p.id); } : undefined} danger={pages.length > 1} />
          ))}
        </Card>
      </Section>
    </KitSettings>
  );
}
