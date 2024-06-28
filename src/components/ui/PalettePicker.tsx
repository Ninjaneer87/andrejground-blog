import React, { useState } from 'react';
import { COLOR_PALETTE_OPTIONS } from '../../constants';
import { type ColorPaletteOption } from '../../stores/themeStore';
import { applyColorPalette } from '../../utils';

type Props = {
  initialPalette: ColorPaletteOption | undefined;
};

function PalettePicker({ initialPalette }: Props) {
  const [colorPalette, setColorPalette] = useState<
    ColorPaletteOption | undefined
  >(initialPalette);

  function onPaletteChange(palette: ColorPaletteOption) {
    setColorPalette(palette);
    applyColorPalette(palette);
  }

  return (
    <div className="flex gap-1 items-center">
      {COLOR_PALETTE_OPTIONS.map(themeClass => (
        <button
          key={themeClass}
          className={`rounded-full p-2`}
          title={themeClass}
          onClick={() => onPaletteChange(themeClass)}
          aria-label={`Change theme color to ${themeClass}`}
        >
          <span
            className={`block rounded-full w-4 h-4 transition-transform ${
              colorPalette === themeClass ? 'scale-100' : 'scale-75'
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
