import { type DarkModeOption } from '../../stores/themeStore';
import { DARK_MODE_OPTIONS } from '../../constants';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';
import { applyDarkMode } from '../../utils';

const DarkModeIcon = {
  light: 'mdi:white-balance-sunny',
  dark: 'mdi:weather-night',
  system: 'mdi:laptop-mac',
};

type Props = {
  initialDarkMode: DarkModeOption | undefined;
};
function DarkModePicker({ initialDarkMode }: Props) {
  const [darkMode, setDarkMode] = useState<DarkModeOption | undefined>(
    initialDarkMode,
  );

  function onDarkModeChange(mode: DarkModeOption) {
    setDarkMode(mode);
    applyDarkMode(mode);
  }

  return (
    <div className="flex gap-1 items-center">
      {DARK_MODE_OPTIONS.map(mode => {
        const isSelected = darkMode === mode;

        return (
          <button
            key={mode}
            className={`flex items-center gap-1 text-lg rounded-lg capitalize p-2 ${
              isSelected
                ? 'text-primary duration-200 transition-all rotate-[360deg]'
                : 'text-text'
            } `}
            title={mode}
            onClick={() => onDarkModeChange(mode)}
            aria-label={`Change dark mode to ${mode}`}
          >
            <Icon icon={DarkModeIcon[mode]} />
          </button>
        );
      })}
    </div>
  );
}

export default DarkModePicker;
