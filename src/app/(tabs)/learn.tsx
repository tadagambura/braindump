import { CardLibrary, type CardPack } from '@/kit/cards';
import { H1, Muted, Screen } from '@/kit/ui';
import raw from '@/content/cards.json';

const pack = raw as CardPack;

export default function Learn() {
  return (
    <Screen testID="learn">
      <H1>Busy brains</H1>
      <Muted>Tips for overwhelm, focus and sleep. General information, not medical advice.</Muted>
      <CardLibrary pack={pack} app="braindump" />
    </Screen>
  );
}
