import { SiteThemeId, SiteThemeConfig } from '../types';

export const SITE_THEMES: SiteThemeConfig[] = [
  {
    id: 'war-blue',
    name: 'Theme 1 — War Blue',
    badge: 'Default',
    paletteLabel: 'Blue + Orange + Gold',
    description: 'Signature War Computers styling with Electric War Blue, Tactical Orange, and Pure Gold accents.',
    bgCanvas: '#060b19',
    bgSurface: '#0b1428',
    fontAccent: '#f97316',
    fontHighlight: '#eab308',
    heroGradient: 'linear-gradient(to right, #fb923c, #fbbf24, #f97316)',
    colors: {
      primary: '#2563eb', // Blue
      secondary: '#f97316', // Orange
      accent: '#eab308', // Gold
      icon: '#f59e0b',
      glow: 'rgba(249, 115, 22, 0.45)'
    }
  },
  {
    id: 'tech-cyan',
    name: 'Theme 2 — Tech Cyan',
    badge: 'Cyber Tech',
    paletteLabel: 'Cyan + Blue',
    description: 'High-tech enterprise cyber feel featuring electric Cyan highlights, deep Cyber Teal canvas, and Cobalt Blue glow.',
    bgCanvas: '#02121c',
    bgSurface: '#04202e',
    fontAccent: '#06b6d4',
    fontHighlight: '#22d3ee',
    heroGradient: 'linear-gradient(to right, #22d3ee, #38bdf8, #0ea5e9, #67e8f9)',
    colors: {
      primary: '#06b6d4', // Cyan
      secondary: '#2563eb', // Blue
      accent: '#38bdf8', // Ice Blue
      icon: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.5)'
    }
  },
  {
    id: 'premium-gold',
    name: 'Theme 3 — Premium Gold',
    badge: 'Executive',
    paletteLabel: 'Gold + Navy',
    description: 'Prestigious enterprise styling blending rich Imperial Gold with midnight Royal Navy canvas and golden typography.',
    bgCanvas: '#070c1d',
    bgSurface: '#0c183a',
    fontAccent: '#eab308',
    fontHighlight: '#facc15',
    heroGradient: 'linear-gradient(to right, #fef08a, #facc15, #eab308, #ca8a04)',
    colors: {
      primary: '#eab308', // Gold
      secondary: '#1e3a8a', // Navy
      accent: '#facc15', // Bright Gold
      icon: '#fbbf24',
      glow: 'rgba(234, 179, 8, 0.45)'
    }
  },
  {
    id: 'modern-red',
    name: 'Theme 4 — Modern Red',
    badge: 'High Impact',
    paletteLabel: 'Red + Blue',
    description: 'Vibrant performance styling with bold Crimson Red, deep Obsidian Crimson canvas, and high-contrast Electric Blue.',
    bgCanvas: '#120407',
    bgSurface: '#20080f',
    fontAccent: '#ef4444',
    fontHighlight: '#f87171',
    heroGradient: 'linear-gradient(to right, #fca5a5, #f87171, #ef4444, #60a5fa)',
    colors: {
      primary: '#ef4444', // Red
      secondary: '#2563eb', // Blue
      accent: '#f87171', // Coral Red
      icon: '#f87171',
      glow: 'rgba(239, 68, 68, 0.45)'
    }
  }
];

export const THEME_STORAGE_KEY = 'war_computers_site_theme';

export const getInitialSiteTheme = (): SiteThemeId => {
  if (typeof window === 'undefined') return 'war-blue';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as SiteThemeId | null;
    if (saved && SITE_THEMES.some(t => t.id === saved)) {
      return saved;
    }
  } catch {
    // Ignore storage failures
  }
  return 'war-blue';
};

export const applySiteTheme = (themeId: SiteThemeId): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', themeId);
  document.body.setAttribute('data-theme', themeId);

  const activeTheme = SITE_THEMES.find(t => t.id === themeId) || SITE_THEMES[0];
  root.style.setProperty('--theme-current-primary', activeTheme.colors.primary);
  root.style.setProperty('--theme-current-secondary', activeTheme.colors.secondary);
  root.style.setProperty('--theme-current-accent', activeTheme.colors.accent);
  root.style.setProperty('--theme-current-glow', activeTheme.colors.glow);
  if (activeTheme.bgCanvas) root.style.setProperty('--site-bg-canvas', activeTheme.bgCanvas);
  if (activeTheme.bgSurface) root.style.setProperty('--site-bg-surface', activeTheme.bgSurface);
  if (activeTheme.fontAccent) root.style.setProperty('--site-font-accent', activeTheme.fontAccent);
  if (activeTheme.fontHighlight) root.style.setProperty('--site-font-highlight', activeTheme.fontHighlight);
  if (activeTheme.heroGradient) root.style.setProperty('--site-tagline-gradient', activeTheme.heroGradient);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // Ignore storage failures
  }
};
