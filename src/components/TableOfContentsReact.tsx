import React, { Fragment, useEffect, useRef } from 'react';
import { useHeadings } from '../hooks/useHeadings';
import { useSectionIdInView } from '../hooks/useSectionIdInView';

function TableOfContentsReact() {
  const { h2sAndH3s } = useHeadings();
  const { idInView } = useSectionIdInView();
  const inViewRefItem = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    inViewRefItem.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [idInView]);

  function isInView(id: string) {
    return id === idInView;
  }

  return (
    <ul className="flex flex-col gap-4 toc-list max-h-[50vh] overflow-y-auto pr-1">
      {h2sAndH3s.map(({ h2, h3s }) => (
        <Fragment key={h2.id}>
          <li>
            <a
              className={`${isInView(h2.id) ? 'text-primary' : ''} break-words`}
              href={`#${h2.id}`}
              {...(isInView(h2.id) && { ref: inViewRefItem })}
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
                {...(isInView(h3.id) && { ref: inViewRefItem })}
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

export default TableOfContentsReact;
