import React, { Fragment, useEffect, useRef } from 'react';
import { useHeadings } from '../hooks/useHeadings';
import { useSectionIdInView } from '../hooks/useSectionIdInView';
import { ScrollShadow } from '@nextui-org/react';
import { isTocModalOpen } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';

function TableOfContentsReact() {
  const { h2sAndH3s } = useHeadings();
  const { idInView } = useSectionIdInView();
  const inViewElement = useRef<HTMLAnchorElement | null>(null);
  const $isModalOpen = useStore(isTocModalOpen);

  useEffect(() => {
    if (!idInView) return;

    setTimeout(() => {
      inViewElement.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }, 0);
  }, [idInView]);

  useEffect(() => {
    if (!idInView || !$isModalOpen) return;

    setTimeout(() => {
      inViewElement.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }, 0);
  }, [$isModalOpen]);

  function isInView(id: string) {
    return id === idInView;
  }

  return (
    <ScrollShadow
      as="ul"
      className="flex flex-col gap-4 toc-list max-h-[50vh] pr-1 pb-10 scroll-pb-10"
    >
      {h2sAndH3s.map(({ h2, h3s }) => (
        <Fragment key={h2.id}>
          <li>
            <a
              className={`${isInView(h2.id) ? 'text-accent' : ''} break-words`}
              href={`#${h2.id}`}
              {...(isInView(h2.id) && { ref: inViewElement })}
              onClick={() => isTocModalOpen.set(false)}
            >
              {h2.text}
            </a>
          </li>
          {h3s.map(h3 => (
            <li key={h3.id}>
              <a
                className={`${
                  isInView(h3.id) ? 'text-accent' : ''
                } break-words pl-4`}
                href={`#${h3.id}`}
                {...(isInView(h3.id) && { ref: inViewElement })}
                onClick={() => isTocModalOpen.set(false)}
              >
                {h3.text}
              </a>
            </li>
          ))}
        </Fragment>
      ))}
    </ScrollShadow>
  );
}

export default TableOfContentsReact;
