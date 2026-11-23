import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import { useTheme } from '@/kit/theme';

export default function TabsLayout() {
  const { c } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textMuted,
        tabBarStyle: { backgroundColor: c.surface, borderTopColor: c.border },
        tabBarLabelStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dump', tabBarIcon: ({ color, size }) => <Ionicons name="cloud-download-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="today" options={{ title: 'Today', tabBarIcon: ({ color, size }) => <Ionicons name="sunny-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="later" options={{ title: 'Later', tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color as string} size={size} /> }} />
    </Tabs>
  );
}
