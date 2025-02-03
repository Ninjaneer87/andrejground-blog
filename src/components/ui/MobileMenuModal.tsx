import { useStore } from '@nanostores/react';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { isMobileMenuModalOpen } from 'src/stores/globalStore';
import LogoAnimated from '../LogoAnimated';

type Props = {
  links: {
    href: string;
    text: string;
    isActive: boolean;
  }[];
};

function MobileMenuModal({ links }: Props) {
  const isOpen = useStore(isMobileMenuModalOpen);

  function onClose() {
    isMobileMenuModalOpen.set(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onClose={onClose}
      scrollBehavior="inside"
      hideCloseButton
    >
      <ModalContent className="bg-glass">
        <ModalHeader className='flex justify-center font-normal'>
          Andrej<span className="text-accent">Ground</span>
        </ModalHeader>

        <Divider className="bg-accent/30" />

        <ModalBody>
          <ul className="flex flex-col gap-4 py-8 justify-center items-center">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${link.isActive ? 'text-accent' : ''} bg-glass shadow-3d rounded-xl py-2 px-4 flex`}
                  onClick={onClose}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <div className="mx-auto">
            <LogoAnimated width={150} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={onClose}
            aria-label="Close mobile menu"
            className="bg-glass text-accent shadow-3d"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MobileMenuModal;
