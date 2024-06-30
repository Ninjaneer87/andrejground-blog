import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
};
type H2sAndH3s = {
  h2: Heading;
  h3s: Heading[];
};
function getHeadingsFromDom() {
  const h2s = Array.from(document.querySelectorAll('h2'));
  const allH2sAndH3s = Array.from(document.querySelectorAll('h2, h3'));
  const sectionsLevelOne = Array.from(
    document.querySelectorAll('[data-heading-rank="2"]'),
  );
  const h2sWithH3s = h2s.reduce((acc, h2, i) => {
    const h3s = Array.from(sectionsLevelOne[i]?.querySelectorAll('h3') ?? []);
    acc.push({
      h2: { id: h2.id, text: h2.textContent! },
      h3s: h3s.map(h3 => ({ id: h3.id, text: h3.textContent! })),
    });

    return acc;
  }, [] as H2sAndH3s[]);

  return { h2sWithH3s, allH2sAndH3s };
}

export function useHeadings() {
  const [h2sAndH3s, setH2sAndH3s] = useState<H2sAndH3s[]>([]);
  const [allHeadings, setAllHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    const { h2sWithH3s, allH2sAndH3s } = getHeadingsFromDom();

    setH2sAndH3s(h2sWithH3s);
    setAllHeadings(allH2sAndH3s.map(h => ({ id: h.id, text: h.textContent! })));
  }, []);

  return { h2sAndH3s, allHeadings };
}
