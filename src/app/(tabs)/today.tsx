import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';
import { useCelebrate } from '@/kit/celebrate';
import { useTheme } from '@/kit/theme';
import { EmptyState, H1, Muted, Row, Screen, Stack } from '@/kit/ui';
import { counts, todayLine } from '@/domain/dump';
import { useDump } from '@/state/dump';

export default function Today() {
  const { c, radius } = useTheme();
  const d = useDump();
  const celebrate = useCelebrate();
  const today = d.thoughts.filter((t) => t.bucket === 'today').sort((a, b) => Number(a.done) - Number(b.done));
  const n = counts(d.thoughts);
  return (
    <Screen testID="today">
      <H1>Today</H1>
      <Muted testID="today-line">{todayLine(n)}</Muted>
      {today.length === 0 ? <EmptyState icon="sunny-outline" title="A clear day" body="Sort a few thoughts into Today on the Dump tab." /> : null}
      <Stack gap={8}>
        {today.map((t) => (
          <Pressable
            key={t.id}
            accessibilityRole="checkbox"
            aria-checked={t.done}
            accessibilityState={{ checked: t.done }}
            accessibilityLabel={t.text}
            onPress={() => {
              d.toggleDone(t.id);
              if (!t.done && n.today === 1) celebrate({ scene: 'today-done', emoji: '🛋️', title: 'Today: done', body: 'Kaos flops onto a beanbag.' });
            }}
            testID={`today-${t.text}`}
            style={{ padding: 14, borderRadius: radius, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
          >
            <Row gap={12}>
              <Ionicons name={t.done ? 'checkmark-circle' : 'ellipse-outline'} size={26} color={t.done ? c.success : c.textMuted} />
              <Text style={{ flex: 1, color: t.done ? c.textMuted : c.text, fontSize: 16, textDecorationLine: t.done ? 'line-through' : 'none' }}>{t.text}</Text>
            </Row>
          </Pressable>
        ))}
      </Stack>
    </Screen>
  );
}
