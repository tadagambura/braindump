// The whiteboard (Premium): draw with a finger, stylus or mouse. Strokes are saved per page.
import { Stack as RouterStack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { usePremium } from '@/kit/premium';
import { useTheme } from '@/kit/theme';
import { Button, Chip, EmptyState, Row, Screen } from '@/kit/ui';
import { simplify, toPath } from '@/domain/dump';
import { useDump } from '@/state/dump';

const COLOURS = ['#231410', '#B83A17', '#2E86AB', '#1B7A35', '#8E44AD'];
const NONE: never[] = [];

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { c, radius } = useTheme();
  const { isPremium } = usePremium();
  const page = useDump((s) => s.pages.find((p) => p.id === id));
  // Select a stable reference: `?? []` inside the selector would create a new array every render.
  const strokes = useDump((s) => s.boards[id]) ?? NONE;
  const [colour, setColour] = useState(COLOURS[0]);
  const [live, setLive] = useState<[number, number][]>([]);
  const pts = useRef<[number, number][]>([]);
  const colourRef = useRef(colour);
  colourRef.current = colour;

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        pts.current = [[e.nativeEvent.locationX, e.nativeEvent.locationY]];
        setLive(pts.current);
      },
      onPanResponderMove: (e) => {
        pts.current = [...pts.current, [e.nativeEvent.locationX, e.nativeEvent.locationY]];
        setLive(pts.current);
      },
      onPanResponderRelease: () => {
        const p = simplify(pts.current);
        if (p.length > 1) useDump.getState().addStroke(id, { color: colourRef.current, width: 3, points: p });
        pts.current = [];
        setLive([]);
      },
    }),
  ).current;

  if (!isPremium || !page) return <Screen edges={[]}><EmptyState icon="brush-outline" title="Whiteboard is Premium" body="Open it from the Dump tab." /></Screen>;
  return (
    <Screen edges={[]} scroll={false} testID="board">
      <RouterStack.Screen options={{ title: `${page.emoji} ${page.name}` }} />
      <Row wrap gap={6}>
        {COLOURS.map((col) => (
          <Chip key={col} label={col === colour ? '●' : '○'} selected={col === colour} onPress={() => setColour(col)} />
        ))}
        <Button small variant="secondary" title="Undo" onPress={() => useDump.getState().undoStroke(id)} testID="board-undo" />
        <Button small variant="ghost" title="Clear" onPress={() => useDump.getState().clearBoard(id)} />
      </Row>
      <View {...pan.panHandlers} style={{ flex: 1, minHeight: 420, backgroundColor: '#FFFFFF', borderRadius: radius, borderWidth: 1, borderColor: c.border, overflow: 'hidden' }} testID="board-canvas" accessibilityLabel={`Whiteboard with ${strokes.length} strokes`}>
        <Svg width="100%" height="100%">
          {strokes.map((s, i) => (
            <Path key={i} d={toPath(s.points)} stroke={s.color} strokeWidth={s.width} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {live.length > 1 ? <Path d={toPath(live)} stroke={colour} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
        </Svg>
      </View>
    </Screen>
  );
}
