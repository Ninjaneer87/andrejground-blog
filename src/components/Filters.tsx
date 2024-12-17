import { Input } from '@nextui-org/react';
import TagFilterChip from './TagFilterChip';
import AuthorFilterCard from './cards/AuthorFilterCard';
import useApplyFiltersFromUrl from 'src/hooks/useApplyFiltersFromUrl';
import type { CollectionEntry } from 'astro:content';
import { useReducer } from 'react';
import { getQueryParams, pushFiltersToUrl } from 'src/utils/common';
import { useStore } from '@nanostores/react';
import { filtersAtom } from 'src/stores/globalStore';
import { Icon } from '@iconify-icon/react';

type Props = {
  tags: string[];
  authors: string[];
  allBlogArticles: CollectionEntry<'blog'>[];
};

function Filters({ tags, authors, allBlogArticles }: Props) {
  const { q } = getQueryParams(window.location.search);
  useApplyFiltersFromUrl(allBlogArticles);

  const [, forceRender] = useReducer(x => x + 1, 0);

  const { appliedTags, appliedAuthors, noFiltersApplied } =
    useStore(filtersAtom);

  return (
    <div className="relative">
      <h2 className="font-thin flex items-center py-4 gap-2 text-xl md:text-2xl mb-2">
        Search
        <Icon icon="mdi:magnify" />
        {!noFiltersApplied && (
          <button
            className={`ml-auto flex items-center pl-2 pr-0 text-xl md:text-2xl text-accent transition-opacity text-center opacity-70 hover:opacity-100`}
            aria-label="Clear all filters"
            onClick={() => {
              pushFiltersToUrl({}, true);
              forceRender();
            }}
          >
            <Icon icon="mdi:close-circle" className='scale-85' />
          </button>
        )}
      </h2>

      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-8 max-h-[60vh] overflow-y-auto pr-2 pb-4"
      >
        <fieldset>
          <h3 className="text-lg font-thin mb-2 flex gap-2 items-center opacity-60">
            Text
            <Icon icon="mdi:text-search-variant" className="opacity-70" />
          </h3>
          <Input
            variant="underlined"
            value={q?.[0] || ''}
            color="secondary"
            type="text"
            autoComplete="off"
            isClearable
            onChange={e => {
              pushFiltersToUrl({ q: e.target.value.trim() });
              forceRender();
            }}
            onClear={() => {
              pushFiltersToUrl({ q: '' });
              forceRender();
            }}
            autoCorrect=""
            spellCheck={false}
            classNames={{
              input: 'text-accent placeholder:text-foreground/45',
              clearButton: 'text-accent',
            }}
            name="q"
            id="q"
            placeholder="Search titles and content..."
          />
        </fieldset>

        <fieldset>
          <h3 className="text-lg font-thin mb-2 flex gap-2 items-center opacity-60">
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
          <h3 className="text-lg font-thin mb-2 flex gap-2 items-center opacity-60">
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
    </div>
  );
}

export default Filters;
