import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type MutableRefObject,
} from 'react';

interface BoxSizeAndPosition extends CSSProperties {
  '--x': `${number}px`;
  '--y': `${number}px`;
  '--width': `${number}px`;
  '--height': `${number}px`;
}

type AllElements<T> = { [key: PropertyKey]: T };

const initialBoxSizeAndPosition: BoxSizeAndPosition = {
  '--x': '0px',
  '--y': '0px',
  '--width': '0px',
  '--height': '0px',
};

const itemPositionsMap = new Map<unknown, BoxSizeAndPosition>();

const mapAllPositions = (items: HTMLElement[]) => {
  items.forEach(item => {
    const itemKey = item.dataset.key;
    if (!itemKey) return;

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = item;
    const itemPosition: BoxSizeAndPosition = {
      '--x': `${Math.round(offsetLeft)}px`,
      '--y': `${Math.round(offsetTop)}px`,
      '--width': `${Math.round(offsetWidth)}px`,
      '--height': `${Math.round(offsetHeight)}px`,
    };

    itemPositionsMap.set(itemKey, itemPosition);
  });
};

type FloatingBox<Item> = {
  /** Ref for the current active element in the list. */
  activeElementRef: MutableRefObject<Item | null>;

  /** Ref containing an array of all the elements in the list. */
  allElementsRef: MutableRefObject<AllElements<Item>>;

  /**
   * Object containing the following CSS (variables) properties of the active item:
   *
   * `--x`(offsetLeft): x-axis position in `px`
   *
   * `--y`(offsetTop):  y-axis position in `px`
   *
   * `--width`(width): width in `px`
   *
   * `--height`(height): height in `px`
   */
  boxSizeAndPosition: BoxSizeAndPosition;
};

export default function useFloatingBox<ItemElement extends HTMLElement>({
  activeItem,
  remapObserver,
}: {
  /** A unique value representing active item in the list. */
  activeItem: unknown;

  /** Will recalculate (and map) all list elements' sizes and positions when ever this value changes. */
  remapObserver?: unknown;
}): FloatingBox<ItemElement> {
  const [boxSizeAndPosition, setBoxSizeAndPosition] = useState(
    initialBoxSizeAndPosition,
  );
  const allElementsRef: MutableRefObject<AllElements<ItemElement>> = useRef({});
  const activeElementRef: MutableRefObject<ItemElement | null> = useRef(null);

  const setActivePosition = useCallback(() => {
    const activeItemPosition = itemPositionsMap.get(activeItem);
    if (!activeItemPosition) return;

    setBoxSizeAndPosition(activeItemPosition);
  }, [activeItem]);

  const mapAndSetActivePosition = useCallback(() => {
    if (!allElementsRef.current) return;

    const allItems = Object.values(allElementsRef.current);
    mapAllPositions(allItems);
    setActivePosition();
  }, [setActivePosition, remapObserver]);

  useEffect(setActivePosition, [activeItem]);
  useEffect(mapAndSetActivePosition, [remapObserver]);
  useEffect(() => {
    window.addEventListener('resize', mapAndSetActivePosition);
    return () => window.removeEventListener('resize', mapAndSetActivePosition);
  }, [mapAndSetActivePosition]);

  return { activeElementRef, allElementsRef, boxSizeAndPosition };
}
