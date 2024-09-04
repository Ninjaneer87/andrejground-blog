import { useStore } from '@nanostores/react';
import { useEffect, useRef } from 'react';
import { headingIdInView } from 'src/stores/globalStore';

const rootMargin = '-120px 0px -80% 0px';

export function useSectionIdInView() {
  const $idInView = useStore(headingIdInView);

  const headingsObserver = useRef(
    new IntersectionObserver(
      observedHeadings => {
        observedHeadings.forEach(observedSection => {
          if (observedSection.isIntersecting && observedSection.target.id) {
            headingIdInView.set(observedSection.target.id);
            return;
          }
        });
      },
      {
        rootMargin,
      },
    ),
  );

  useEffect(() => {
    const allH2sAndH3s = Array.from(document.querySelectorAll('h2, h3'));

    allH2sAndH3s.forEach(heading => {
      headingsObserver.current.observe(heading);
    });

    return () => {
      headingsObserver.current.disconnect();
      headingIdInView.set(null);
    };
  }, []);

  return { idInView: $idInView };
}
