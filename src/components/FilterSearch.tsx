import { Icon } from '@iconify-icon/react';
import { Code, Input, Kbd } from '@nextui-org/react';
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
      variant="underlined"
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
        base: 'px-4 w-[320px] max-w-full',
        input: 'text-accent placeholder:text-foreground/45',
        clearButton: 'text-accent',
      }}
      startContent={<Icon icon="mdi:magnify" className="text-foreground/45" />}
      endContent={
        <Kbd
          className="pointer-events-none"
          classNames={{ base: 'bg-glass' }}
          keys={['shift']}
        >
          S
        </Kbd>
      }
      name="q"
      id="q"
      placeholder="Search..."
    />
  );
}

export default FilterSearch;
