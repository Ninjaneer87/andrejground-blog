import { isSystemThemeDark } from './utils';

export const SITE_TITLE = 'AndrejGround';
export const SITE_DESCRIPTION =
  'A blog about software development and career growth.';
export const HOMEPAGE_ARTICLE_LIMIT = 6;
export const ARTICLES_PER_PAGE = 12;

export const COLOR_PALETTE_OPTIONS = ['orange', 'cyan', 'green'] as const;
export const DARK_MODE_OPTIONS = ['light', 'dark', 'system'] as const;
export const DARK_MODE_CLASSNAMES = {
  light: '',
  dark: 'dark',
  system: isSystemThemeDark() ? 'dark' : '',
} as const;

export const COOKIE_KEYS = {
  selectedColorPalette: 'selectedColorPalette',
  selectedDarkMode: 'selectedDarkMode',
};
