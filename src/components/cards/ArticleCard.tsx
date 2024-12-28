import type { CollectionEntry } from 'astro:content';
import DateCard from './DateCard';
import AuthorCard from './AuthorCard';
import Tags from '../Tags';

type Props = {
  article: CollectionEntry<'blog'>;
};

function ArticleCard({ article }: Props) {
  return (
    <li className="rounded-2xl max-w-[300px] flex grow flex-col justify-center bg-background/50 z-10 shrink-0 snap-center snap-always">
      <div className="flex flex-col h-[500px] max-h-[60vh] w-full p-8 rounded-2xl justify-between">
        <div className="flex flex-col gap-4">
          <a
            href={`/articles/${article.id}`}
            className="block text-xl text-foreground hover:text-accent transition-colors"
          >
            {article.data.title}
          </a>

          <Tags tags={article.data.tags} />

          <hr className="my-2 h-0.5 border-t-0 bg-gradient-to-r from-accent to-transparent w-full" />
          <DateCard date={article.data.pubDate} />
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <AuthorCard author={article.data.author} />
        </div>
      </div>
    </li>
  );
}

export default ArticleCard;
