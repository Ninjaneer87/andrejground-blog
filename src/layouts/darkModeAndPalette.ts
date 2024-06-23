import {
  darkMode,
  colorPalette,
  type ColorPaletteOption,
  type DarkModeOption,
} from '../stores/themeStore';
import {
  COLOR_PALETTE_OPTIONS,
  COOKIE_KEYS,
  DARK_MODE_CLASSNAMES,
} from '../constants';
import Cookies from 'js-cookie';

const colorPaletteCookie = Cookies.get(COOKIE_KEYS.selectedColorPalette);
colorPalette.set(colorPaletteCookie as ColorPaletteOption);
const darkModeCookie = Cookies.get(COOKIE_KEYS.selectedDarkMode);
darkMode.set(darkModeCookie as DarkModeOption);

const html = document.querySelector('html');

colorPalette.subscribe(selectedColorPalette => {
  if (!html) return;

  COLOR_PALETTE_OPTIONS.forEach(themeClass => {
    html.classList.remove(themeClass);
  });
  html.classList.add(selectedColorPalette);
  Cookies.set(COOKIE_KEYS.selectedColorPalette, selectedColorPalette, {
    path: '/',
  });
});

darkMode.subscribe(selectedDarkMode => {
  if (!html) return;

  const darkModeClass = DARK_MODE_CLASSNAMES[selectedDarkMode];
  const isDark = darkModeClass === 'dark';
  html.classList.toggle('dark', isDark);
  Cookies.set(COOKIE_KEYS.selectedDarkMode, selectedDarkMode, {
    path: '/',
  });
  Cookies.set('isDark', `${isDark}`, {
    path: '/',
  });
});
