import type { CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';

export const isTocModalOpen = atom(false);
export const isPageLoading = atom(false);
export const headingIdInView = atom<string | null>(null);
export const blogPageArticles = atom<CollectionEntry<'blog'>[]>([]);
