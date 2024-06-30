import { COLOR_PALETTE_OPTIONS, COOKIE_KEYS, DARK_MODE_CLASSNAMES } from "./constants";
import Cookies from 'js-cookie';
import type { ColorPaletteOption, DarkModeOption } from "./stores/themeStore";

export function isSystemThemeDark() {
  if (typeof window === 'undefined') {
    return false;
  }

  const isDark = window.matchMedia?.('(prefers-color-scheme:dark)').matches;
  return isDark;
}

export function applyColorPalette(colorPalette: ColorPaletteOption) {
  if (typeof window === 'undefined') return;

  const html = document.querySelector('html');
  if (!html) return;

  COLOR_PALETTE_OPTIONS.forEach(themeClass => {
    html.classList.remove(themeClass);
  });
  html.classList.add(colorPalette);

  Cookies.set(COOKIE_KEYS.selectedColorPalette, colorPalette, {
    path: '/',
  });
}

export function applyDarkMode(darkMode: DarkModeOption) {
  if (typeof window === 'undefined') return;

  const html = document.querySelector('html');
  if (!html) return;

  const darkModeClass = DARK_MODE_CLASSNAMES[darkMode];
  const isDark = darkModeClass === 'dark';
  html.classList.toggle('dark', isDark);

  Cookies.set(COOKIE_KEYS.isDark, `${isDark}`, {
    path: '/',
  });
  Cookies.set(COOKIE_KEYS.selectedDarkMode, darkMode, {
    path: '/',
  });
}
