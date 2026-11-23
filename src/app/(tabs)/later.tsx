import { useFeedback } from '@/kit/feedback';
import { Button, Card, EmptyState, H1, Muted, Row, Screen, Section, Strong } from '@/kit/ui';
import { useDump } from '@/state/dump';

export default function Later() {
  const d = useDump();
  const { toast } = useFeedback();
  const later = d.thoughts.filter((t) => t.bucket === 'later');
  const never = d.thoughts.filter((t) => t.bucket === 'never');
  return (
    <Screen testID="later">
      <H1>Later</H1>
      {later.length === 0 ? <EmptyState icon="time-outline" title="Nothing waiting" body="Thoughts you sort into Later live here until you're ready." /> : null}
      {later.map((t) => (
        <Card key={t.id} testID={`later-${t.text}`}>
          <Strong>{t.text}</Strong>
          <Row gap={8}>
            <Button small title="Today" onPress={() => d.sort(t.id, 'today')} testID={`later-today-${t.text}`} />
            <Button small variant="ghost" title="Never" onPress={() => d.sort(t.id, 'never')} />
          </Row>
        </Card>
      ))}
      <Section title={`Never bin (${never.length})`}>
        <Muted>Letting go counts as progress.</Muted>
        {never.map((t) => (
          <Row key={t.id} style={{ justifyContent: 'space-between' }}>
            <Muted style={{ flex: 1 }}>{t.text}</Muted>
            <Button small variant="ghost" title="Rescue" onPress={() => d.sort(t.id, 'later')} />
          </Row>
        ))}
        {never.length ? (
          <Button
            small
            variant="danger"
            title="Empty the bin"
            testID="bin-empty"
            onPress={() => {
              const gone = d.clearNever();
              toast(`${gone.length} thoughts gone for good.`, { actionLabel: 'Undo', onAction: () => useDump.getState().restore(gone) });
            }}
          />
        ) : null}
      </Section>
    </Screen>
  );
}
