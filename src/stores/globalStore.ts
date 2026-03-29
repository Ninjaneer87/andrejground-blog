import type { OptionItem } from '@andrejground/lab';
import type { CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';

export const isTocModalOpenAtom = atom(false);
export const isFiltersModalOpenAtom = atom(false);
export const isMobileMenuModalOpen = atom(false);
export const isPageLoadingAtom = atom(false);
export const headingIdInViewAtom = atom<string | null>(null);
export const postStatsAtom = atom<{
  viewsCount: number | null;
  likesCount: number | null;
}>({ viewsCount: null, likesCount: null });

export const sortingOptions: OptionItem[] = [
  { text: 'Latest', value: 'latest' },
  { text: 'Oldest', value: 'oldest' },
  { text: 'A - Z', value: 'a-z' },
  { text: 'Z - A', value: 'z-a' },
];

type FiltersAtom = {
  query: string;
  appliedTags: string[];
  appliedAuthors: string[];
  noSearchResults: boolean;
  noFiltersApplied: boolean;
  filteredArticles: CollectionEntry<'blog'>[];
  sorting: OptionItem;
};

export const filtersAtom = atom<FiltersAtom>({
  query: '',
  appliedTags: [],
  appliedAuthors: [],
  noSearchResults: false,
  noFiltersApplied: false,
  filteredArticles: [],
  sorting: sortingOptions[0],
});
