import { useCallback, useEffect } from 'react';

export function useWindowResize(cb: Function) {
  useEffect(() => {
    const handleResize = () => {
      cb();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
