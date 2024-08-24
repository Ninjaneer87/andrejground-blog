import React from 'react';
import { Input } from '@nextui-org/react';
import TagFilterChip from './TagFilterChip';

type Props = {
  tags: string[];
  appliedTags: string[];
  searchQuery: string;
  noFiltersApplied: boolean;
};
function Filters({ tags, appliedTags, searchQuery, noFiltersApplied }: Props) {
  return (
    <form action="/articles" className="flex flex-col gap-8">
      <fieldset>
        <h3 className="font-thin mb-2">Search</h3>
        <Input
          variant="underlined"
          defaultValue={searchQuery || undefined}
          color="secondary"
          type="text"
          name="q"
          id="q"
          placeholder="Search titles and content..."
        />
      </fieldset>

      <fieldset>
        <h3 className="font-thin mb-2">Tags</h3>
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

      <fieldset className="flex gap-4">
        <button
          className="border-secondary border grow bg-background rounded-2xl p-4"
          type="submit"
        >
          Apply
        </button>
        <a
          className={`border-secondary border bg-background rounded-2xl p-4 ${noFiltersApplied ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
          href="/articles"
        >
          Clear
        </a>
      </fieldset>
    </form>
  );
}

export default Filters;
