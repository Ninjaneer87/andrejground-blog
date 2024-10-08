import { useStore } from '@nanostores/react';
import { Progress } from '@nextui-org/react';
import { isPageLoadingAtom } from 'src/stores/globalStore';

function Loader() {
  const isPageLoading = useStore(isPageLoadingAtom);
  return isPageLoading ? (
    <Progress
      size="sm"
      isIndeterminate
      color="secondary"
      aria-label="Page loading..."
      className="fixed top-0 left-0 max-w-full w-full z-50"
      classNames={{
        indicator: 'bg-secondary',
        base: 'bg-secondary',
        track: 'bg-accent',
      }}
    />
  ) : null;
}

export default Loader;
