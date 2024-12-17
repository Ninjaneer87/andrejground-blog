import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import { filtersAtom } from 'src/stores/globalStore';

function NoArticlesFound() {
  const { noSearchResults } = useStore(filtersAtom);

  if (noSearchResults) {
    return (
      <div className="w-fit text-xl md:text-2xl z-0 p-8 rounded-2xl bg-glass h-fit">
        <div className="flex gap-4 items-center">
          <Icon icon="mdi:minus-box-outline" className='text-4xl' />

          <div>No articles found matching these filters</div>
        </div>
      </div>
    );
  }
  return null;
}

export default NoArticlesFound;
