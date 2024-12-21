import ArticleCard from './cards/ArticleCard';
import { filtersAtom } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';

function ArticlesFilteredList() {
  const { filteredArticles, sorting } = useStore(filtersAtom);
  const sortedArticles = sortArticles();

  function sortArticles() {
    switch (sorting) {
      case 'Latest':
        return filteredArticles.sort(
          (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
        );
      case 'Oldest':
        return filteredArticles.sort(
          (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
        );
      case 'A - Z':
        return filteredArticles.sort((a, b) =>
          a.data.title.localeCompare(b.data.title),
        );
      case 'Z - A':
        return filteredArticles.sort((a, b) =>
          b.data.title.localeCompare(a.data.title),
        );

      default:
        return filteredArticles;
    }
  }

  if (!filteredArticles.length) return null;

  return (
    <>
      <h2 className="sr-only">Filtered articles list</h2>

      <ul className="flex gap-16 items-start flex-wrap max-md:justify-center">
        {sortedArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </>
  );
}

export default ArticlesFilteredList;
