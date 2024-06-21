import React from 'react';
import { COLOR_PALETTE_OPTIONS } from '../../constants';
import { colorPalette } from '../../stores/themeStore';
import { useStore } from '@nanostores/react';

function PalettePicker() {
  const $colorPalette = useStore(colorPalette);

  return (
    <div className="flex gap-1 items-center">
      {COLOR_PALETTE_OPTIONS.map(themeClass => (
        <button
          key={themeClass}
          className={`rounded-full p-2`}
          title={themeClass}
          onClick={() => colorPalette.set(themeClass)}
          aria-label={`Change theme color to ${themeClass}`}
        >
          <span
            className={`block rounded-full w-4 h-4 transition-transform ${
              $colorPalette === themeClass ? 'scale-100' : 'scale-75'
            }`}
            style={{
              backgroundColor: `rgb(var(--color-${themeClass}-primary))`,
            }}
          ></span>
        </button>
      ))}
    </div>
  );
}

export default PalettePicker;
