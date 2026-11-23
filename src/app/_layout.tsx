import { BagelFatOne_400Regular, useFonts } from '@expo-google-fonts/bagel-fat-one';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Intro } from '@/kit/Intro';
import { prefsStore } from '@/kit/prefs';
import { KitRoot } from '@/kit/Root';
import { useTheme } from '@/kit/theme';
import { brand } from '@/brand';

SplashScreen.preventAutoHideAsync().catch(() => {});
const usePrefs = prefsStore('braindump', 21);
const Art = ({ children }: { children: string }) => <Text style={{ fontSize: 88 }}>{children}</Text>;

function Shell() {
  const { c } = useTheme();
  const onboarded = usePrefs((s) => s.onboarded);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="board/[id]" options={{ headerShown: true, title: 'Whiteboard', headerTintColor: c.text, headerStyle: { backgroundColor: c.bg }, headerShadowVisible: false }} />
      </Stack>
      {!onboarded ? (
        <View style={StyleSheet.absoluteFill}>
          <Intro
            cta="Empty my head"
            onDone={() => usePrefs.getState().setOnboarded()}
            steps={[
              { title: 'Dump it all', body: 'Type everything rattling around your head, one line each. No sorting, no tidying, no judging.', art: <Art>🌪️</Art> },
              { title: 'Sort in seconds', body: 'Tap Today, Later or Never on each thought. Never is a guilt-free bin.', art: <Art>🗂️</Art> },
              { title: 'Just today', body: 'Your Today list is all you need to look at. Kaos handles the other 99 things.', art: <Art>🧠</Art> },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({ BagelFatOne_400Regular });
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <KitRoot brand={brand}>
      <Shell />
    </KitRoot>
  );
}
