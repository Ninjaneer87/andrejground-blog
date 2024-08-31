import { useStore } from '@nanostores/react';
import { Progress } from '@nextui-org/react';
import React from 'react';
import { isPageLoading } from 'src/stores/globalStore';

function Loader() {
  const isLoading = useStore(isPageLoading);
  return isLoading ? (
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
