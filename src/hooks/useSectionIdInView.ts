import { useStore } from '@nanostores/react';
import { useEffect, useRef, useState } from 'react';
import { headingIdInView } from 'src/stores/globalStore';

export function useSectionIdInView() {
  const $idInView = useStore(headingIdInView);

  const observer = useRef(
    new IntersectionObserver(
      observedSections => {
        observedSections.forEach(observedSection => {
          if (observedSection.isIntersecting && observedSection.target.id) {
            headingIdInView.set(observedSection.target.id);
          }
        });
      },
      {
        rootMargin: '-120px 0px -80% 0px',
      },
    ),
  );
  useEffect(() => {
    const allH2sAndH3s = Array.from(document.querySelectorAll('h2, h3'));

    allH2sAndH3s.forEach(heading => {
      observer.current.observe(heading);
    });

    return () => {
      observer.current.disconnect();
      headingIdInView.set(null);
    };
  }, []);

  return { idInView: $idInView };
}
