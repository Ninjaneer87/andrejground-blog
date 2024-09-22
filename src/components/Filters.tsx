import { Input } from '@nextui-org/react';
import TagFilterChip from './TagFilterChip';
import AuthorFilterCard from './cards/AuthorFilterCard';
import useApplyFiltersFromUrl from 'src/hooks/useApplyFiltersFromUrl';
import type { CollectionEntry } from 'astro:content';
import { useReducer } from 'react';
import { getQueryParams, pushFiltersToUrl } from 'src/utils/common';
import { useStore } from '@nanostores/react';
import { filtersAtom } from 'src/stores/globalStore';

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
    <form
      onSubmit={e => e.preventDefault()}
      className="flex flex-col gap-8 gradient-circle"
    >
      <fieldset>
        <h3 className="font-thin mb-2">Keywords</h3>
        <Input
          variant="underlined"
          defaultValue={q?.[0] || ''}
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
          }}
          name="q"
          id="q"
          placeholder="Search titles and content..."
        />
      </fieldset>

      <fieldset>
        <h3 className="font-thin mb-2">Topics</h3>
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
        <h3 className="font-thin mb-2">Authors</h3>
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

      <fieldset>
        <a
          className={`block transition-opacity grow text-center border-secondary border bg-background rounded-2xl p-4 ${
            noFiltersApplied
              ? 'opacity-50 pointer-events-none cursor-not-allowed'
              : ''
          }`}
          href="/articles"
          tabIndex={noFiltersApplied ? -1 : 0}
        >
          Clear all filters
        </a>
      </fieldset>
    </form>
  );
}

export default Filters;
