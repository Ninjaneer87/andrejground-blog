import { useRef, type MouseEvent } from 'react';

function capRotateValue(value: number, maxRotationDeg: number) {
  if (value > maxRotationDeg) return maxRotationDeg;
  if (value < -maxRotationDeg) return -maxRotationDeg;
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
  maxRotationDeg?: number;
  perspective?: number;
  transitionDuration?: number;
  isReverse?: boolean;
  children: React.ReactNode;
  easing?: string;
};
function TiltContainer({
  children,
  maxRotationDeg = 30,
  perspective = 1600,
  transitionDuration = 1500,
  easing = 'cubic-bezier(.03,.98,.52,.99)',
  isReverse = true,
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
        (mouseFromCenterY * maxRotationDeg) / halfCardHeight;
      const uncappedRotateY = -(
        (mouseFromCenterX * maxRotationDeg) /
        halfCardWidth
      );

      const rotateX = capRotateValue(uncappedRotateX, maxRotationDeg);
      const rotateY = capRotateValue(uncappedRotateY, maxRotationDeg);

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
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        ref={cardRef}
        className="rounded-xl border border-accent/20"
        style={{
          transformStyle: 'preserve-3d',
          transition: `transform ${transitionDuration}ms ${easing}`,
        }}
      >
        <div
          style={{
            transform: 'translateZ(32px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default TiltContainer;
