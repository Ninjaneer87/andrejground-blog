import { Fragment, useEffect, useRef } from 'react';
import { useHeadings } from '../hooks/useHeadings';
import { useSectionIdInView } from '../hooks/useSectionIdInView';
import { ScrollShadow } from '@nextui-org/react';
import { isTocModalOpenAtom } from 'src/stores/globalStore';
import { useStore } from '@nanostores/react';
import classes from './TableOfContentsReact.module.css';
import { useActiveBoxPosition } from '@andrejground/hooks';

function TableOfContentsReact() {
  const { h2sAndH3s } = useHeadings();
  const { idInView } = useSectionIdInView();
  const inViewElement = useRef<HTMLAnchorElement | null>(null);
  const isTocModalOpen = useStore(isTocModalOpenAtom);

  const { listItemsRef, activeBoxPosition } =
    useActiveBoxPosition({ activeItem: idInView, recalculate: [h2sAndH3s] });

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
    if (!idInView || !isTocModalOpen) return;

    setTimeout(() => {
      inViewElement.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }, 0);
  }, [isTocModalOpen]);

  function isInView(id: string) {
    return id === idInView;
  }

  return (
    <ScrollShadow
      as="ul"
      className={`grow flex flex-col toc-list max-h-[50vh] pr-1 scroll-py-10 text-sm z-0 ${classes.list}`}
      style={idInView ? activeBoxPosition : {}}
    >
      {h2sAndH3s.map(({ h2, h3s }) => (
        <Fragment key={h2.id}>
          <li>
            <a
              className={`py-2 break-words block  w-full`}
              href={`#${h2.id}`}
              data-key={h2.id}
              ref={node => {
                if (!node) return;

                listItemsRef.current[h2.id] = node;

                if (isInView(h2.id)) {
                  inViewElement.current = node;
                }
              }}
              onClick={() => isTocModalOpenAtom.set(false)}
            >
              {h2.text}
            </a>
          </li>
          {h3s.map(h3 => (
            <li key={h3.id}>
              <a
                className={`break-words pl-4 py-2 block`}
                href={`#${h3.id}`}
                data-key={h3.id}
                ref={node => {
                  if (!node) return;

                  listItemsRef.current[h3.id] = node;

                  if (isInView(h3.id)) {
                    inViewElement.current = node;
                  }
                }}
                onClick={() => isTocModalOpenAtom.set(false)}
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
