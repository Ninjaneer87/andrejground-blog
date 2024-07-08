document.addEventListener('astro:page-load', () => {
  const h2s = Array.from(document.querySelectorAll('h2'));
  const allH2sAndH3s = Array.from(document.querySelectorAll('h2, h3'));
  type HeadingWithSubheadings = {
    h2: Element;
    h3s: Element[];
  };

  const sectionsLevelOne = Array.from(
    document.querySelectorAll('[data-heading-rank="2"]'),
  );
  const sectionsLevelTwo = Array.from(
    document.querySelectorAll('[data-heading-rank="3"]'),
  );

  // Create an array of h2s with their h3s
  const h2sWithH3s = h2s.reduce((acc, h2, i) => {
    const h3s = Array.from(sectionsLevelOne[i]?.querySelectorAll('h3') ?? []);
    acc.push({ h2, h3s });

    return acc;
  }, [] as HeadingWithSubheadings[]);

  const tocListElement = document.querySelector('.toc-list');

  // Create h2s elements and insert into DOM
  h2sWithH3s.forEach(({ h2, h3s }) => {
    const h2Link = document.createElement('a');
    h2Link.textContent = h2.textContent;
    h2Link.classList.add('break-words');
    h2Link.title = h2.textContent!;
    h2Link.href = `#${h2.id}`;

    tocListElement?.appendChild(h2Link);

    h3s.forEach(h3 => {
      const h3Link = document.createElement('a');
      h3Link.textContent = h3.textContent;
      h3Link.classList.add('break-words', 'pl-4');
      h3Link.title = h3.textContent!;
      h3Link.href = `#${h3.id}`;

      tocListElement?.appendChild(h3Link);
    });
  });

  // Observe sections and highlight the current heading in the TOC
  const observer = new IntersectionObserver(
    observedSections => {
      observedSections.forEach(observedSection => {
        if (observedSection.isIntersecting) {
          const headingInView = allH2sAndH3s.find(
            heading => heading.id === observedSection.target.id,
          );
          const allTocLinks = Array.from(
            tocListElement?.querySelectorAll('a') ?? [],
          );
          const linkInView = tocListElement?.querySelector(
            `[href="#${headingInView?.id}"]`,
          ) as HTMLElement | null;
          if (!linkInView) return;

          allTocLinks.forEach(link => {
            link.classList.remove('text-accent');
          });
          linkInView?.classList.add('text-accent');
          linkInView?.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
        }
      });
    },
    {
      rootMargin: '-120px 0px -80% 0px',
    },
  );
  allH2sAndH3s.forEach(heading => {
    observer.observe(heading);
  });
});
