import { useEffect, useState } from 'react';
import { getH2sAndH3s, type H2sAndH3s, type Heading } from 'src/utils/common';

export function useHeadings() {
  const [h2sAndH3s, setH2sAndH3s] = useState<H2sAndH3s[]>([]);
  const [allHeadings, setAllHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    const { h2sWithH3s, allH2sAndH3s } = getH2sAndH3s();

    setH2sAndH3s(h2sWithH3s);
    setAllHeadings(allH2sAndH3s.map(h => ({ id: h.id, text: h.textContent! })));
  }, []);

  return { h2sAndH3s, allHeadings };
}
