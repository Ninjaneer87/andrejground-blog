import type { CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';

export const isTocModalOpenAtom = atom(false);
export const isFiltersModalOpenAtom = atom(false);
export const isPageLoadingAtom = atom(false);
export const headingIdInViewAtom = atom<string | null>(null);

export const sortingOptions = ['Latest', 'Oldest', 'A - Z', 'Z - A'] as const;
export type Sorting = (typeof sortingOptions)[number];
type FiltersAtom = {
  query: string;
  appliedTags: string[];
  appliedAuthors: string[];
  noSearchResults: boolean;
  noFiltersApplied: boolean;
  filteredArticles: CollectionEntry<'blog'>[];
  sorting: Sorting;
};

export const filtersAtom = atom<FiltersAtom>({
  query: '',
  appliedTags: [],
  appliedAuthors: [],
  noSearchResults: false,
  noFiltersApplied: false,
  filteredArticles: [],
  sorting: 'Latest',
});
