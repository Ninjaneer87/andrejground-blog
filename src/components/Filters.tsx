import TagFilterChip from './TagFilterChip';
import AuthorFilterCard from './cards/AuthorFilterCard';
import useApplyFiltersFromUrl from 'src/hooks/useApplyFiltersFromUrl';
import type { CollectionEntry } from 'astro:content';
import { useReducer } from 'react';
import { pushFiltersToUrl } from 'src/utils/common';
import { useStore } from '@nanostores/react';
import { filtersAtom } from 'src/stores/globalStore';
import { Icon } from '@iconify-icon/react';
import SortArticlesDropdown from './SortArticlesDropdown';

type Props = {
  tags: string[];
  authors: string[];
  allBlogArticles: CollectionEntry<'blog'>[];
};

function Filters({ tags, authors, allBlogArticles }: Props) {
  useApplyFiltersFromUrl(allBlogArticles);

  const [, forceRender] = useReducer(x => x + 1, 0);

  const { appliedTags, appliedAuthors } = useStore(filtersAtom);

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="relative flex flex-col gap-8 max-h-[60vh] overflow-y-auto md:p-2 pb-4"
    >
      <fieldset>
        <SortArticlesDropdown />
      </fieldset>

      <fieldset>
        <h3 className="text-lg font-thin mb-4 flex gap-2 items-center opacity-60">
          Tags
          <Icon icon="mdi:tag-search-outline" className="opacity-70" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <TagFilterChip
              key={tag}
              tag={tag}
              isApplied={appliedTags.includes(tag)}
              onChange={() => {
                pushFiltersToUrl({ tag });
                forceRender();
              }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <h3 className="text-lg font-thin mb-4 flex gap-2 items-center opacity-60">
          Authors
          <Icon icon="mdi:account-search-outline" className="opacity-70" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {authors.map(author => (
            <AuthorFilterCard
              key={author}
              author={author}
              isApplied={appliedAuthors.includes(author)}
              onChange={() => {
                pushFiltersToUrl({ author });
                forceRender();
              }}
            />
          ))}
        </div>
      </fieldset>
    </form>
  );
}

export default Filters;
