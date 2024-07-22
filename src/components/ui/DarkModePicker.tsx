import { type DarkModeOption } from '../../stores/themeStore';
import { COOKIE_KEYS, DARK_MODE_OPTIONS } from '../../constants';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';
import { applyDarkMode } from '../../utils';
import Cookies from 'js-cookie';
import { useWindowResize } from '../../hooks/useWindowResize';
import { Tooltip } from '@nextui-org/react';

const DarkModeIcon = {
  light: 'mdi:white-balance-sunny',
  dark: 'mdi:weather-night',
  system: 'mdi:laptop-mac',
};

type Props = {
  withText?: boolean;
};
function DarkModePicker({ withText }: Props) {
  const [darkMode, setDarkMode] = useState<DarkModeOption | undefined>(
    Cookies.get(COOKIE_KEYS.selectedDarkMode) as DarkModeOption,
  );

  useWindowResize(() =>
    setDarkMode(Cookies.get(COOKIE_KEYS.selectedDarkMode) as DarkModeOption),
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
          <Tooltip
            key={mode}
            placement="bottom"
            color="default"
            isDisabled={withText}
            content={
              <span>
                Theme:{' '}
                <span className="text-primary font-semibold">{mode}</span>
              </span>
            }
          >
            <button
              key={mode}
              className={`flex items-center gap-1 text-lg rounded-lg capitalize p-1 md:p-2 ${
                isSelected
                  ? 'text-accent duration-200 transition-all'
                  : 'text-foreground'
              } `}
              title={mode}
              onClick={() => onDarkModeChange(mode)}
              aria-label={`Change theme to ${mode}`}
            >
              {withText && mode}
              <Icon
                className={`${
                  isSelected
                    ? 'duration-200 transition-transform rotate-[360deg]'
                    : ''
                }`}
                icon={DarkModeIcon[mode]}
              />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default DarkModePicker;
