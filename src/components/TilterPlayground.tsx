import { useMemo, useState } from 'react';
import Tilter from './Tilter';
import { Button, Checkbox, Slider } from '@nextui-org/react';
import { objectEntries } from 'src/utils/common';

const CHECKBOX_FIELDS = [
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
  {
    key: 'addTilterPadding',
    label: 'Add tilter padding',
  },
  {
    key: 'isReverse',
    label: 'Is reverse',
  },
] as const;

const SLIDER_FIELDS = [
  {
    key: 'elevation',
    label: 'Elevation',
    min: 0,
    max: 150,
  },
  {
    key: 'rotationCapDeg',
    label: 'Max rotation',
    min: 0,
    max: 90,
  },
] as const;

const initialSettings = {
  elevation: 50,
  rotationCapDeg: 30,
  isReverse: true,
  addTilterPadding: true,
  tilterRootFrame: true,
  cardRootFrame: true,
  cardContentElevatorFrame: false,
};

function TilterPlayground() {
  const [settings, setSettings] = useState(initialSettings);

  const hasSettingsChanged = useMemo(() => {
    return objectEntries(settings).some(
      ([key, value]) => value !== initialSettings[key],
    );
  }, [settings]);

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[50vh] dark py-8">
      {/* Tilter */}
      <div className="grid place-items-center min-h-40 lg:min-h-64">
        {/* <div className='min-h-40 lg:min-h-64'> */}
          <Tilter
            classNames={{
              tilterRoot: `${
                settings.tilterRootFrame ? 'shadow-3d' : ''
              } ${settings.addTilterPadding ? 'p-8 lg:p-16' : ''} bg-glass rounded-2xl`,
              cardRoot: `${settings.cardRootFrame ? 'shadow-3d' : ''} rounded-2xl`,
              cardContentElevator: `${
                settings.cardContentElevatorFrame ? 'shadow-3d' : ''
              } p-8 lg:p-16 rounded-2xl`,
            }}
            elevation={settings.elevation}
            rotationCapDeg={settings.rotationCapDeg}
            isReverse={settings.isReverse}
          >
            Hover over me
          </Tilter>
        {/* </div> */}
      </div>

      {/* Settings */}
      <div className="grid place-items-center">
        <div>
          <ul>
            {CHECKBOX_FIELDS.map(field => (
              <li className="my-4 flex gap-2" key={field.key}>
                <Checkbox
                  classNames={{
                    wrapper: 'text-accent',
                  }}
                  color="secondary"
                  isSelected={settings[field.key]}
                  onValueChange={() =>
                    setSettings(prev => ({
                      ...prev,
                      [field.key]: !prev[field.key],
                    }))
                  }
                >
                  {field.label}
                </Checkbox>
              </li>
            ))}

            {SLIDER_FIELDS.map(field => (
              <li className="my-4 flex gap-2" key={field.key}>
                <Slider
                  aria-label={field.label}
                  className="max-w-[120px]"
                  classNames={{
                    thumb: 'after:bg-accent',
                  }}
                  size="sm"
                  id={field.label}
                  color="secondary"
                  minValue={field.min}
                  maxValue={field.max}
                  step={1}
                  value={settings[field.key]}
                  onChange={val =>
                    setSettings(prev => ({
                      ...prev,
                      [field.key]: val,
                    }))
                  }
                />
                <label htmlFor={field.label}>
                  {field.label}: <strong>{settings[field.key]}px</strong>
                </label>
              </li>
            ))}
          </ul>

          <Button
            color="secondary"
            isDisabled={!hasSettingsChanged}
            onPress={() => setSettings(initialSettings)}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TilterPlayground;
