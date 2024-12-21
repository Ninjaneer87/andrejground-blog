import { Icon } from '@iconify-icon/react';
import { Input, Kbd } from '@nextui-org/react';
import type { CollectionEntry } from 'astro:content';
import { useEffect, useReducer, useRef } from 'react';
import useApplyFiltersFromUrl from 'src/hooks/useApplyFiltersFromUrl';
import { getQueryParams, pushFiltersToUrl } from 'src/utils/common';

type Props = {
  allBlogArticles: CollectionEntry<'blog'>[];
};

function FilterSearch({ allBlogArticles }: Props) {
  const { q } = getQueryParams(window.location.search);
  useApplyFiltersFromUrl(allBlogArticles);
  const [, forceRender] = useReducer(x => x + 1, 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSearchQuery = !!q?.[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's' && e.shiftKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Input
      value={q?.[0] || ''}
      color="secondary"
      type="text"
      autoComplete="off"
      onChange={e => {
        pushFiltersToUrl({ q: e.target.value.trim() });
        forceRender();
      }}
      autoCorrect=""
      ref={inputRef}
      spellCheck={false}
      classNames={{
        inputWrapper:
          'bg-glass group-data-[focus=true]:bg-glass group-data-[hover=true]:bg-glass',
        innerWrapper: 'bg-transparent',
        base: 'w-[320px] max-w-full',
        input: 'bg-transparent text-accent placeholder:text-foreground/45',
        clearButton: 'text-accent',
      }}
      isClearable={hasSearchQuery}
      onClear={
        hasSearchQuery
          ? () => {
              pushFiltersToUrl({ q: '' });
              forceRender();
            }
          : undefined
      }
      startContent={<Icon icon="mdi:magnify" className="text-foreground/45" />}
      endContent={
        hasSearchQuery ? undefined : (
          <Kbd
            className="pointer-events-none"
            classNames={{ base: 'bg-glass' }}
            keys={['shift']}
          >
            S
          </Kbd>
        )
      }
      name="q"
      id="q"
      placeholder="Search..."
    />
  );
}

export default FilterSearch;
