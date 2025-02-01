import { useStore } from '@nanostores/react';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@nextui-org/react';
import { isMobileMenuDrawerOpen } from 'src/stores/globalStore';
import LogoAnimated from './LogoAnimated';

type Props = {
  links: {
    href: string;
    text: string;
    isActive: boolean;
  }[];
};

function MobileMenuDrawer({ links }: Props) {
  const isOpen = useStore(isMobileMenuDrawerOpen);

  function onOpenChange(isOpen: boolean) {
    isMobileMenuDrawerOpen.set(isOpen);
  }
  return (
    <Drawer
      className="bg-glass"
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={onOpenChange}
      hideCloseButton
      backdrop='blur'
    >
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader className="flex font-light justify-center items-center">
              Andrej<span className="text-accent">Ground</span>
            </DrawerHeader>
            <Divider className="bg-accent/30" />
            <DrawerBody>
              <ul className="flex flex-col gap-4 py-8 justify-center items-center">
                {links.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`${link.isActive ? 'text-accent' : ''}`}
                      onClick={onClose}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>

              <LogoAnimated />
            </DrawerBody>
            <DrawerFooter>
              <Button
                onPress={onClose}
                aria-label="Close mobile menu"
                className="bg-glass text-accent shadow-3d"
              >
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default MobileMenuDrawer;
