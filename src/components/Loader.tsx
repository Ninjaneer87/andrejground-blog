import { useStore } from '@nanostores/react';
import { Progress } from '@nextui-org/react';
import { isPageLoadingAtom } from 'src/stores/globalStore';

function Loader() {
  const isPageLoading = useStore(isPageLoadingAtom);

  return (
    <Progress
      isIndeterminate
      color="secondary"
      aria-label="Page loading..."
      className={`${isPageLoading ? 'opacity-100' : 'opacity-0'} duration-500 transition-opacity fixed top-0 left-0 max-w-full w-full z-50 h-[6px]`}
      classNames={{
        indicator: 'bg-secondary',
        base: 'bg-secondary',
        track: 'bg-primary',
      }}
    />
  );
}

export default Loader;
