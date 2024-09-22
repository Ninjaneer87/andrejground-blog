import { createRoot } from 'react-dom/client';
import { getAllHeadings } from 'src/utils/common';
import ClipboardCopy from 'src/components/ui/ClipboardCopy';

document.addEventListener('astro:page-load', () => {
  if (
    window.location.href.includes('/articles/') &&
    !window.location.href.includes('authors')
  ) {
    const { allHeadingsButH1s } = getAllHeadings();

    allHeadingsButH1s.forEach(h => {
      const id = h.id;
      const link = `${window.location.href}#${id}`;

      const copySpan = document.createElement('span');
      copySpan.classList.add('opacity-40', 'ml-2');

      h.insertAdjacentElement('beforeend', copySpan);

      const root = createRoot(copySpan);
      root.render(<ClipboardCopy text={link} />);
    });
  }
});
