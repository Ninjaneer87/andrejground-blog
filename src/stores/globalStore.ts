import { atom } from 'nanostores';

export const isTocModalOpen = atom(false);
export const headingIdInView = atom<string | null>(null);
