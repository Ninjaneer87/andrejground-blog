import { Icon } from '@iconify-icon/react';
import { Input, Kbd, Progress } from '@nextui-org/react';
import type { CollectionEntry } from 'astro:content';
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import useApplyFiltersFromUrl from 'src/hooks/useApplyFiltersFromUrl';
import { getQueryParams, pushFiltersToUrl } from 'src/utils/common';

type Props = {
  allBlogArticles: CollectionEntry<'blog'>[];
};

let debounceTimer: NodeJS.Timeout;
let progressTimer: NodeJS.Timeout;

function FilterSearch({ allBlogArticles }: Props) {
  const { q } = getQueryParams(window.location.search);
  useApplyFiltersFromUrl(allBlogArticles);
  const [, forceRender] = useReducer(x => x + 1, 0);
  const [progress, setProgress] = useState(0);
  const [isInProgress, setIsInProgress] = useState(false);
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

  function handleDebouncedSearch(e: ChangeEvent<HTMLInputElement>) {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (progressTimer) clearTimeout(progressTimer);

    setProgress(0);
    setIsInProgress(false);

    progressTimer = setTimeout(() => {
      setProgress(100);
      setIsInProgress(true);

      if (progressTimer) clearTimeout(progressTimer);
    }, 10);

    debounceTimer = setTimeout(() => {
      pushFiltersToUrl({ q: e.target.value.trim() });
      forceRender();

      setIsInProgress(false);
      if (debounceTimer) clearTimeout(debounceTimer);
    }, 500);
  }

  return (
    <div className="w-full md:w-[320px] max-w-full mx-auto">
      <Input
        defaultValue={q?.[0] || ''}
        color="secondary"
        type="text"
        autoComplete="off"
        onChange={handleDebouncedSearch}
        autoCorrect=""
        ref={inputRef}
        spellCheck={false}
        className='shadow-3d rounded-2xl'
        classNames={{
          mainWrapper: '',
          inputWrapper:
            'bg-glass group-data-[focus=true]:bg-glass group-data-[hover=true]:bg-glass px-4 shadow-3d',
          innerWrapper: 'bg-transparent',
          base: 'w-full',
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
        startContent={
          <Icon icon="mdi:magnify" className="text-foreground/45" />
        }
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

      <div
        className={`${isInProgress ? 'opacity-100' : 'opacity-0'} duration-500 transition-opacity w-[90%] mx-auto pointer-events-none -translate-y-2`}
      >
        <Progress
          aria-label="Loading..."
          className={`h-[2px]`}
          classNames={{
            indicator: `${isInProgress ? '!duration-500' : '!duration-0'} bg-gradient-to-r from-secondary to-primary ease-linear`,
            track: `bg-transparent`,
          }}
          value={progress}
        />
      </div>
    </div>
  );
}

export default FilterSearch;
