import React from 'react';
import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import ClientOnlyPortal from './Portal';
import { isTocModalOpenAtom } from 'src/stores/globalStore';

type Props = {
  children: React.ReactNode;
};

function TOCModal({ children }: Props) {
  const isTocModalOpen = useStore(isTocModalOpenAtom);

  function close() {
    isTocModalOpenAtom.set(false);
  }

  function toggle() {
    isTocModalOpenAtom.set(!isTocModalOpen);
  }

  return (
    <ClientOnlyPortal>
      <button
        className="flex xl:hidden transition-transform ease-linear duration-150 active:scale-90 fixed bottom-32 right-4 h-12 w-12 rounded-2xl bg-glass items-center justify-center text-accent text-2xl shadow-3d blur-in z-30"
        aria-label="Toggle table of contents modal"
        onClick={toggle}
      >
        <Icon icon="mdi:format-list-bulleted" />
      </button>

      <Modal
        isOpen={isTocModalOpen}
        backdrop="blur"
        onClose={close}
        scrollBehavior="inside"
        hideCloseButton
      >
        <ModalContent className="bg-glass">
          <ModalHeader>Table of contents</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              onPress={close}
              aria-label="Close mobile menu"
              className="bg-glass text-accent shadow-3d"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ClientOnlyPortal>
  );
}

export default TOCModal;
