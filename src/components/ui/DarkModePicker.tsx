import { useStore } from '@nanostores/react';
import { darkMode, type DarkModeOption } from '../../stores/themeStore';
import { DARK_MODE_OPTIONS } from '../../constants';
import { Icon } from '@iconify-icon/react';

const DarkModeIcon = {
  light: 'mdi:white-balance-sunny',
  dark: 'mdi:weather-night',
  system: 'mdi:laptop-mac',
};

function DarkModePicker() {
  const $darkMode = useStore(darkMode);

  return (
    <div className="flex gap-1 items-center">
      {DARK_MODE_OPTIONS.map(mode => {
        const isSelected = $darkMode === mode;
        return (
          <button
            key={mode}
            className={`flex items-center gap-1 text-lg rounded-lg capitalize p-2 ${
              isSelected ? 'text-primary duration-200 transition-all rotate-[360deg]' : 'text-text'
            } `}
            title={mode}
            onClick={() => darkMode.set(mode)}
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
