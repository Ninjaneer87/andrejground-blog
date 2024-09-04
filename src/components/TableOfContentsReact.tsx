import React, { Fragment, useEffect, useRef } from 'react';
import { useHeadings } from '../hooks/useHeadings';
import { useSectionIdInView } from '../hooks/useSectionIdInView';
import { ScrollShadow } from '@nextui-org/react';
import { isTocModalOpen } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';
import classes from './TableOfContentsReact.module.css';
import useFloatingBox from 'src/hooks/useFloatingBox';

function TableOfContentsReact() {
  const { h2sAndH3s, allHeadings } = useHeadings();
  const { idInView } = useSectionIdInView();
  const inViewElement = useRef<HTMLAnchorElement | null>(null);
  const $isModalOpen = useStore(isTocModalOpen);

  const { activeElementRef, allElementsRef, boxSizeAndPosition } =
    useFloatingBox({ activeItem: idInView, remapObserver: h2sAndH3s });

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

  console.log({ boxSizeAndPosition, idInView });
  return (
    <ScrollShadow
      as="ul"
      className={`flex flex-col toc-list max-h-[50vh] pr-1 pb-10 scroll-py-10 text-sm z-0 ${classes.list}`}
      style={boxSizeAndPosition}
    >
      {h2sAndH3s.map(({ h2, h3s }) => (
        <Fragment key={h2.id}>
          <li>
            <a
              className={`py-2 break-words`}
              href={`#${h2.id}`}
              data-key={h2.id}
              ref={node => {
                if (!node) return;

                allElementsRef.current[h2.id] = node;

                if (isInView(h2.id)) {
                  activeElementRef.current = node;
                  inViewElement.current = node;
                }
              }}
              onClick={() => isTocModalOpen.set(false)}
            >
              {h2.text}
            </a>
          </li>
          {h3s.map(h3 => (
            <li key={h3.id}>
              <a
                className={`break-words pl-4 py-2`}
                href={`#${h3.id}`}
                data-key={h3.id}
                ref={node => {
                  if (!node) return;

                  allElementsRef.current[h3.id] = node;

                  if (isInView(h3.id)) {
                    activeElementRef.current = node;
                    inViewElement.current = node;
                  }
                }}
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
