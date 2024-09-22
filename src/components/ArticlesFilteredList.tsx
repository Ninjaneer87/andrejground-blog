import ArticleCard from './cards/ArticleCard';
import { filtersAtom } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';

function ArticlesFilteredList() {
  const { filteredArticles } = useStore(filtersAtom);

  return (
    <ul className="flex gap-16 items-center flex-wrap max-md:justify-center">
      {filteredArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ul>
  );
}

export default ArticlesFilteredList;
