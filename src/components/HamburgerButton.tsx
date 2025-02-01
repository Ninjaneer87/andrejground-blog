import { Button } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { isMobileMenuDrawerOpen } from 'src/stores/globalStore';

function HamburgerButton() {
  function onClick() {
    isMobileMenuDrawerOpen.set(true);
  }

  return (
    <Button
      onPress={onClick}
      isIconOnly
      aria-label="Toggle mobile menu"
      className="bg-glass text-accent shadow-3d"
    >
      <Icon icon="mdi:menu" />
    </Button>
  );
}

export default HamburgerButton;
