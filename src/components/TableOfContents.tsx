import React, { Fragment, useEffect, useMemo } from 'react';
import { useHeadings } from '../hooks/useHeadings';
import { useSectionIdInView } from '../hooks/useSectionIdInView';

function TableOfContents() {
  const { h2sAndH3s, allHeadings } = useHeadings();
  const { idInView } = useSectionIdInView();
  const allHeadingsLinks = useMemo(() => {
    allHeadings.map(({ id }) => {
      const link = document.querySelector(`a#${id}`);
      return link;
    });
  }, [allHeadings]);

  useEffect(() => {
    const linkInView = document.querySelector(`a#${idInView}`);
    linkInView?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [idInView, allHeadingsLinks]);

  function isInView(id: string) {
    return id === idInView;
  }

  return (
    <ul className="flex flex-col gap-4 toc-list max-h-[50vh] overflow-y-auto">
      {h2sAndH3s.map(({ h2, h3s }) => (
        <Fragment key={h2.id}>
          <li>
            <a
              className={`${isInView(h2.id) ? 'text-primary' : ''} break-words`}
              href={`#${h2.id}`}
            >
              {h2.text}
            </a>
          </li>
          {h3s.map(h3 => (
            <li key={h3.id}>
              <a
                className={`${
                  isInView(h3.id) ? 'text-primary' : ''
                } break-words pl-4`}
                href={`#${h3.id}`}
              >
                {h3.text}
              </a>
            </li>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}

export default TableOfContents;
