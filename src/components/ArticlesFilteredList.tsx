import type { CollectionEntry } from 'astro:content';
import useFilteredResults from 'src/hooks/useFilteredResults';
import ArticleCard from './cards/ArticleCard';

type Props = {
  allBlogArticles: CollectionEntry<'blog'>[];
};
function ArticlesFilteredList({ allBlogArticles }: Props) {
  const { filteredArticles } = useFilteredResults(allBlogArticles);

  return (
    <ul className="flex gap-16 items-center flex-wrap">
      {filteredArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ul>
  );
}

export default ArticlesFilteredList;
