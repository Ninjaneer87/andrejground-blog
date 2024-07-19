import {
  COLOR_PALETTE_OPTIONS,
  COOKIE_KEYS,
  DARK_MODE_CLASSNAMES,
} from './constants';
import Cookies from 'js-cookie';
import type { ColorPaletteOption, DarkModeOption } from './stores/themeStore';

// import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
  projectId: 'q6lrrer2',
  dataset: 'production',
  useCdn: true,
};

export const productionSanityClient = createClient(config);

export const imageBuilder = imageUrlBuilder(productionSanityClient);
export function urlForImage(source: string) {
  return imageBuilder.image(source);
}

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

export function getHeadingsHierarchy() {
  // Query all section elements in the document
  const sections = document.querySelectorAll('.headings');

  // Initialize an array to hold the hierarchy
  type Heading = {
    level: number;
    text: string;
    children: Heading[];
  };
  const hierarchy: Heading[] = [];

  sections.forEach(section => {
    // Find the heading within the section
    const heading = section.querySelector(
      'h2, h3, h4, h5, h6',
    ) as HTMLElement | null;
    if (heading) {
      // Get the level of the heading (1-6)
      const level = parseInt(heading.tagName.replace('H', ''));

      // Create a new heading object
      const headingObj = {
        level: level,
        text: heading.innerText,
        children: [],
      };

      // Find the correct place in the hierarchy to insert this heading
      let currentLevel = hierarchy;
      let parent = null;

      for (let i = 1; i < level; i++) {
        if (currentLevel.length > 0) {
          parent = currentLevel[currentLevel.length - 1];
          currentLevel = parent.children;
        }
      }

      // Insert the heading
      currentLevel.push(headingObj);
    }
  });

  return hierarchy;
}
