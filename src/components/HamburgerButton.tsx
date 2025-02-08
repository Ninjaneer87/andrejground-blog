import { Button } from '@nextui-org/react';
import { Icon } from '@iconify-icon/react';
import { isMobileMenuModalOpen } from 'src/stores/globalStore';

function HamburgerButton() {
  function onClick() {
    isMobileMenuModalOpen.set(true);
  }

  return (
    <Button
      onPress={onClick}
      isIconOnly
      aria-label="Toggle mobile menu"
      className="bg-transparent text-accent shadow-3d p-0 text-2xl"
    >
      <Icon icon="mdi:menu" />
    </Button>
  );
}

export default HamburgerButton;
