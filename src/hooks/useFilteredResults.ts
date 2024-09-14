import type { CollectionEntry } from 'astro:content';
import { getQueryParams } from 'src/utils/common';

function useFilteredResults(allBlogArticles: CollectionEntry<'blog'>[]) {
  const params = getQueryParams(window.location.search);
  const { q, tag, author } = params;

  const query = q?.[0] || '';
  const appliedTags = tag || [];
  const appliedAuthors = author || [];

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
      const bodyMatch = article.body
        .toLowerCase()
        .includes(query.toLowerCase());
      const tagMatch = article.data.tags.some(tag =>
        tag.toLowerCase().includes(query.toLowerCase()),
      );
      const slugMatch = article.slug
        .toLowerCase()
        .includes(query.toLowerCase());

      return titleMatch || bodyMatch || tagMatch || slugMatch;
    });
  }

  const noFiltersApplied =
    appliedTags.length === 0 && !query && appliedAuthors.length === 0;
  const noSearchResults = !noFiltersApplied && filteredArticles.length === 0;

  return {
    query,
    appliedTags,
    appliedAuthors,
    noSearchResults,
    noFiltersApplied,
    filteredArticles,
  };
}

export default useFilteredResults;
