import { useRef, type MouseEvent } from 'react';

function capRotateValue(value: number, rotationCapDeg: number) {
  if (value > rotationCapDeg) return rotationCapDeg;
  if (value < -rotationCapDeg) return -rotationCapDeg;
  return value;
}

function getTransformStyles({
  rotateX,
  rotateY,
  perspective,
}: {
  rotateX: number;
  rotateY: number;
  perspective: number;
}) {
  return `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

type Props = {
  rotationCapDeg?: number;
  perspective?: number;
  transitionDuration?: number;
  isReverse?: boolean;
  children: React.ReactNode;
  easing?: string;
  elevation?: number;
  classNames?: {
    cardRoot?: string;
    cardContentElevator?: string;
    tilterRoot?: string;
  };
};

function Tilter({
  children,
  rotationCapDeg = 30,
  perspective = 1600,
  transitionDuration = 1500,
  easing = 'cubic-bezier(.03,.98,.52,.99)',
  isReverse = true,
  elevation = 32,
  classNames = {
    cardRoot: '',
    cardContentElevator: '',
    tilterRoot: '',
  },
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  let isAnimationFramePending = false;
  let lastMouseMoveEvent: MouseEvent | null = null;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isAnimationFramePending) return;
    lastMouseMoveEvent = e;

    isAnimationFramePending = true;
    requestAnimationFrame(() => {
      if (!lastMouseMoveEvent || !cardRef.current) {
        isAnimationFramePending = false;
        return;
      }

      const {
        offsetWidth: cardWidth,
        offsetHeight: cardHeight,
        style,
      } = cardRef.current;

      const halfCardWidth = cardWidth / 2;
      const halfCardHeight = cardHeight / 2;

      const { top, left } = cardRef.current.getBoundingClientRect();
      const cardCenterX = left + halfCardWidth;
      const cardCenterY = top + halfCardHeight;

      const mouseFromCenterX = e.clientX - cardCenterX;
      const mouseFromCenterY = e.clientY - cardCenterY;

      const uncappedRotateX =
        (mouseFromCenterY * rotationCapDeg) / halfCardHeight;
      const uncappedRotateY = -(
        (mouseFromCenterX * rotationCapDeg) /
        halfCardWidth
      );

      const rotateX = capRotateValue(uncappedRotateX, rotationCapDeg);
      const rotateY = capRotateValue(uncappedRotateY, rotationCapDeg);

      const transformStyles = getTransformStyles({
        rotateX: isReverse ? -rotateX : rotateX,
        rotateY: isReverse ? -rotateY : rotateY,
        perspective,
      });

      style.transform = transformStyles;
      isAnimationFramePending = false;
    });
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;

    cardRef.current.style.transform = getTransformStyles({
      perspective,
      rotateX: 0,
      rotateY: 0,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classNames.tilterRoot}
    >
      <div
        ref={cardRef}
        className={classNames.cardRoot}
        style={{
          transformStyle: 'preserve-3d',
          transition: `transform ${transitionDuration}ms ${easing}`,
        }}
      >
        <div
          className={classNames.cardContentElevator}
          style={{
            transform: `translateZ(${elevation}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Tilter;
