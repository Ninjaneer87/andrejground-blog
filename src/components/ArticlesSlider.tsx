import { ScrollShadow } from '@nextui-org/react';
import type { CollectionEntry } from 'astro:content';
import ArticleCard from './cards/ArticleCard';
import type { ReactNode } from 'react';

type Props = {
  sectionTitle: ReactNode | string;
  sectionDescription: ReactNode | string;
  articles: CollectionEntry<'blog'>[];
};

function ArticlesSlider({ articles, sectionTitle, sectionDescription }: Props) {
  return (
    <div className="container mx-auto">
      <div className="flex gap-8 items-center mt-20 relative mx-4">
        <div className="absolute top-0 bottom-0 left-[-1px] w-2 bg-gradient-to-b from-secondary to-primary z-10"></div>
        <div className="absolute top-0 bottom-0 right-[-1px] w-2 bg-gradient-to-b from-primary to-secondary z-10"></div>
        <ScrollShadow
          as="ul"
          className="flex gap-16 overflow-x-auto items-center px-8 snap-x snap-mandatory py-4"
          orientation="horizontal"
        >
          <li className="rounded-2xl max-w-[180px] flex grow flex-col justify-center z-10 snap-center snap-always md:sticky md:left-0">
            <div className="flex flex-col h-[500px] max-h-[60vh] w-full p-8 rounded-2xl justify-center gap-8">
              <h3>{sectionTitle}</h3>

              <div className="opacity-60">{sectionDescription}</div>
            </div>
          </li>

          <ScrollShadow
            as="ul"
            className="contents md:flex gap-16 overflow-x-auto items-center px-8 snap-x snap-mandatory py-4"
            orientation="horizontal"
          >
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </ScrollShadow>
        </ScrollShadow>
      </div>
    </div>
  );
}

export default ArticlesSlider;
