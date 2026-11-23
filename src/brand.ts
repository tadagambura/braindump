import type { Brand } from '@/kit/theme';

export const brand: Brand = {
  slug: 'braindump',
  name: 'Brain Dump',
  tagline: 'Empty your head. It sorts itself into today, later and never.',
  fonts: { display: 'BagelFatOne_400Regular' },
  defaultTheme: 'lime',
  radius: 18,
  light: { bg: '#FFF6F2', surface: '#FFFFFF', surfaceAlt: '#FCE5DC', text: '#231410', textMuted: '#6A5049', border: '#F3D6CB', primary: '#B83A17', primaryText: '#FFFFFF', accent: '#2E86AB', accentText: '#FFFFFF', success: '#1B7A35', warning: '#8A5300', danger: '#B3261E', focus: '#B83A17' },
  dark: { bg: '#170D0A', surface: '#221410', surfaceAlt: '#301D17', text: '#FBECE6', textMuted: '#C9AA9F', border: '#40281F', primary: '#FF8A65', primaryText: '#2A0B03', accent: '#7CC4E4', accentText: '#062030', success: '#7FD99A', warning: '#F3B44C', danger: '#FF8A80', focus: '#FF8A65' },
  premiumPerks: ['Unlimited pages (free has 5)', 'Whiteboard for visual thinking, made for tablets', 'Every learning card', 'No ads, ever'],
  privacyUrl: 'https://kaoticchainz.com/privacy',
  termsUrl: 'https://kaoticchainz.com/terms',
  supportEmail: 'hello@kaoticchainz.com',
};
