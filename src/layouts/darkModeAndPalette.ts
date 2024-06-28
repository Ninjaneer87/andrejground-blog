import {
  type ColorPaletteOption,
  type DarkModeOption,
} from '../stores/themeStore';
import {
  COOKIE_KEYS,
} from '../constants';
import Cookies from 'js-cookie';
import { applyColorPalette, applyDarkMode } from '../utils';

document.addEventListener('astro:page-load', () => {
  const colorPaletteCookie = Cookies.get(COOKIE_KEYS.selectedColorPalette);
  const darkModeCookie = Cookies.get(COOKIE_KEYS.selectedDarkMode);

  if (!colorPaletteCookie || !darkModeCookie) return;

  applyColorPalette(colorPaletteCookie as ColorPaletteOption);
  applyDarkMode(darkModeCookie as DarkModeOption);
});
