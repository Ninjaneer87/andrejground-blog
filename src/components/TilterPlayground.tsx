import { useState } from 'react';
import Tilter from './Tilter';
import { Checkbox, Slider } from '@nextui-org/react';

const initialShowFrame = {
  tilterRootFrame: true,
  cardRootFrame: true,
  cardContentElevatorFrame: false,
};

const FRAMES_CHECKBOXES = [
  {
    key: 'tilterRootFrame',
    label: 'Show tilter root frame',
  },
  {
    key: 'cardRootFrame',
    label: 'Show card root frame',
  },
  {
    key: 'cardContentElevatorFrame',
    label: 'Show card content elevator frame',
  },
] as const;

function TilterPlayground() {
  const [addTilterPadding, setAddTilterPadding] = useState(true);
  const [isReverse, setIsReverse] = useState(true);
  const [showFrame, setShowFrame] = useState(initialShowFrame);
  const [elevation, setElevation] = useState(50);
  const [rotationCapDeg, setRotationCapDeg] = useState(30);

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[50vh] dark py-8">
      {/* Tilter */}
      <div className="grid place-items-center">
        <Tilter
          classNames={{
            tilterRoot: `${
              showFrame.tilterRootFrame ? 'shadow-3d' : ''
            } ${addTilterPadding ? 'p-8 lg:p-16' : ''} bg-glass rounded-2xl`,
            cardRoot: `${showFrame.cardRootFrame ? 'shadow-3d' : ''} rounded-2xl`,
            cardContentElevator: `${
              showFrame.cardContentElevatorFrame ? 'shadow-3d' : ''
            } p-8 lg:p-16 rounded-2xl`,
          }}
          elevation={elevation}
          rotationCapDeg={rotationCapDeg}
          isReverse={isReverse}
        >
          Hover over me
        </Tilter>
      </div>

      {/* Controls */}
      <div className="grid place-items-center">
        <div>
          {FRAMES_CHECKBOXES.map(field => (
            <div className="my-4 flex gap-2" key={field.key}>
              <Checkbox
                classNames={{
                  wrapper: 'text-accent',
                }}
                color="secondary"
                isSelected={showFrame[field.key]}
                onValueChange={() =>
                  setShowFrame(prev => ({
                    ...prev,
                    [field.key]: !prev[field.key],
                  }))
                }
              >
                {field.label}
              </Checkbox>
            </div>
          ))}

          <div className="my-4 flex gap-2" key="addTilterPadding">
            <Checkbox
              classNames={{
                wrapper: 'text-accent',
              }}
              color="secondary"
              isSelected={addTilterPadding}
              onValueChange={() => setAddTilterPadding(prev => !prev)}
            >
              Add tilter padding
            </Checkbox>
          </div>

          <div className="my-4 flex gap-2" key="isReverse">
            <Checkbox
              classNames={{
                wrapper: 'text-accent',
              }}
              color="secondary"
              isSelected={isReverse}
              onValueChange={() => setIsReverse(prev => !prev)}
            >
              Is reverse
            </Checkbox>
          </div>

          <div className="my-4 flex gap-2">
            <Slider
              aria-label="Elevation"
              className="max-w-[120px]"
              classNames={{
                thumb: 'after:bg-accent',
              }}
              size="sm"
              id="Elevation"
              color="secondary"
              minValue={0}
              maxValue={150}
              step={1}
              value={elevation}
              onChange={val => setElevation(val as number)}
            />
            <label htmlFor="Elevation">
              Elevation: <strong>{elevation}px</strong>
            </label>
          </div>

          <div className="my-4 flex gap-2">
            <Slider
              aria-label="Max rotation degrees"
              className="max-w-[120px]"
              classNames={{
                thumb: 'after:bg-accent',
              }}
              size="sm"
              id="Max rotation degrees"
              color="secondary"
              minValue={0}
              maxValue={90}
              step={1}
              value={rotationCapDeg}
              onChange={val => setRotationCapDeg(val as number)}
            />
            <label htmlFor="Max rotation degrees">
              Max rotation: <strong>{rotationCapDeg}deg</strong>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TilterPlayground;
