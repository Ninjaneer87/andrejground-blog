import { useEffect, useRef, useState } from 'react';

export function useSectionIdInView() {
  const [idInView, setIdInView] = useState<string | null>(null);
  const observer = useRef(
    new IntersectionObserver(
      observedSections => {
        observedSections.forEach(observedSection => {
          if (observedSection.isIntersecting) {
            setIdInView(observedSection.target.id);
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
    };
  }, []);

  return { idInView };
}
