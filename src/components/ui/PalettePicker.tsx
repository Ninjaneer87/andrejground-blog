import React, { useEffect, useState } from 'react';
import { COLOR_PALETTE_OPTIONS, COOKIE_KEYS } from '../../constants';
import { type ColorPaletteOption } from '../../stores/themeStore';
import { applyColorPalette } from '../../utils';
import Cookies from 'js-cookie';
import { useWindowResize } from '../../hooks/useWindowResize';

type Props = {
  withText?: boolean;
};

function PalettePicker({ withText }: Props) {
  const [colorPalette, setColorPalette] = useState<
    ColorPaletteOption | undefined
  >(Cookies.get(COOKIE_KEYS.selectedColorPalette) as ColorPaletteOption);

  useWindowResize(() =>
    setColorPalette(
      Cookies.get(COOKIE_KEYS.selectedColorPalette) as ColorPaletteOption,
    ),
  );

  function onPaletteChange(palette: ColorPaletteOption) {
    setColorPalette(palette);
    applyColorPalette(palette);
  }

  useEffect(() => {
    console.log('Add resize event listener');
  }, []);

  return (
    <div className="flex gap-1 items-center">
      {COLOR_PALETTE_OPTIONS.map(themeClass => (
        <button
          key={themeClass}
          className={`rounded-full p-1 md:p-2 gap-1 flex items-center text-lg capitalize ${
            colorPalette === themeClass ? 'text-primary' : 'text-text'
          }`}
          title={themeClass}
          onClick={() => onPaletteChange(themeClass)}
          aria-label={`Change theme color to ${themeClass}`}
        >
          {withText && themeClass}

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
