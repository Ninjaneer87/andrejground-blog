import ArticleCard from './cards/ArticleCard';
import { filtersAtom } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';

function ArticlesFilteredList() {
  const { filteredArticles } = useStore(filtersAtom);

  if (!filteredArticles.length) return null;

  return (
    <>
      <h2 className="sr-only">Filtered articles list</h2>

      <ul className="flex gap-16 items-start flex-wrap max-md:justify-center">
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </>
  );
}

export default ArticlesFilteredList;
