import { useStore } from '@nanostores/react';
import { filtersAtom } from 'src/stores/globalStore';

function NoArticlesFound() {
  const { noSearchResults }  = useStore(filtersAtom);

  if (noSearchResults) {
    return (
      <div className="text-center text-2xl text-accent">
        No articles found matching these filters
      </div>
    );
  }
  return null;
}

export default NoArticlesFound;
