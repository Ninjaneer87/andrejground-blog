import type { CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';

export const isTocModalOpenAtom = atom(false);
export const isFiltersModalOpenAtom = atom(false);
export const isPageLoadingAtom = atom(false);
export const headingIdInViewAtom = atom<string | null>(null);

type FiltersAtom = {
  query: string;
  appliedTags: string[];
  appliedAuthors: string[];
  noSearchResults: boolean;
  noFiltersApplied: boolean;
  filteredArticles: CollectionEntry<'blog'>[];
};

export const filtersAtom = atom<FiltersAtom>({
  query: '',
  appliedTags: [],
  appliedAuthors: [],
  noSearchResults: false,
  noFiltersApplied: false,
  filteredArticles: [],
});
