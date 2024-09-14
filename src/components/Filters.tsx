import { Input } from '@nextui-org/react';
import TagFilterChip from './TagFilterChip';
import AuthorFilterCard from './cards/AuthorFilterCard';
import useFilteredResults from 'src/hooks/useFilteredResults';
import type { CollectionEntry } from 'astro:content';

type Props = {
  tags: string[];
  authors: string[];
  allBlogArticles: CollectionEntry<'blog'>[];
};
function Filters({ tags, authors, allBlogArticles }: Props) {
  const { appliedAuthors, appliedTags, noFiltersApplied, query } =
    useFilteredResults(allBlogArticles);

  return (
    <form action="/articles" className="flex flex-col gap-8">
      <fieldset>
        <h3 className="font-thin mb-2">Keywords</h3>
        <Input
          variant="underlined"
          defaultValue={query || undefined}
          color="secondary"
          type="text"
          autoComplete="off"
          autoCorrect=""
          spellCheck={false}
          className="text-accent placeholder:text-foreground/45"
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
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="flex gap-4">
        <button
          className="border-secondary border grow bg-background rounded-2xl p-4"
          type="submit"
        >
          Search
        </button>
        <a
          className={`border-secondary border bg-background rounded-2xl p-4 ${noFiltersApplied ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
          href="/articles"
          tabIndex={noFiltersApplied ? -1 : 0}
        >
          Clear
        </a>
      </fieldset>
    </form>
  );
}

export default Filters;
