import { useStore } from '@nanostores/react';
import type { CollectionEntry } from 'astro:content';
import { useEffect } from 'react';
import { filtersAtom } from 'src/stores/globalStore';
import { getQueryParams } from 'src/utils/common';

const fallbackAppliedTags: string[] = [];
const fallbackAppliedAuthors: string[] = [];

function useApplyFiltersFromUrl(allBlogArticles: CollectionEntry<'blog'>[]) {
  const filters = useStore(filtersAtom);

  useEffect(() => {
    const params = getQueryParams(window.location.search);
    const { q, tag, author } = params;

    const query = q?.[0] || '';
    const appliedTags = tag || fallbackAppliedTags;
    const appliedAuthors = author || fallbackAppliedAuthors;

    let filteredArticles = allBlogArticles;

    if (appliedTags.length > 0) {
      filteredArticles = filteredArticles.filter(article => {
        return appliedTags.some(tag => article.data.tags.includes(tag));
      });
    }

    if (appliedAuthors.length > 0) {
      filteredArticles = filteredArticles.filter(article => {
        return appliedAuthors.includes(article.data.author);
      });
    }

    if (query) {
      filteredArticles = filteredArticles.filter(article => {
        const titleMatch = article.data.title
          .toLowerCase()
          .includes(query.toLowerCase());
        // const bodyMatch =
        //   article.body &&
        //   article.body.toLowerCase().includes(query.toLowerCase());
        // const tagMatch = article.data.tags.some(tag =>
        //   tag.toLowerCase().includes(query.toLowerCase()),
        // );
        const slugMatch = article.id
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          // bodyMatch ||
          // tagMatch ||
          titleMatch || slugMatch
        );
      });
    }

    const noFiltersApplied =
      appliedTags.length === 0 && !query && appliedAuthors.length === 0;
    const noSearchResults = !noFiltersApplied && filteredArticles.length === 0;

    filtersAtom.set({
      ...filters,
      query,
      appliedTags,
      appliedAuthors,
      noSearchResults,
      noFiltersApplied,
      filteredArticles,
    });
  }, [window.location.search]);
}

export default useApplyFiltersFromUrl;
