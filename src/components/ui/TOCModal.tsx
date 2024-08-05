import React from 'react';
import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import ClientOnlyPortal from './Portal';
import { isTocModalOpen } from 'src/stores/globalStore';

type Props = {
  children: React.ReactNode;
};

function TOCModal({ children }: Props) {
  const $isModalOpen = useStore(isTocModalOpen);

  function close() {
    isTocModalOpen.set(false);
  }

  function toggle() {
    isTocModalOpen.set(!$isModalOpen);
  }

  return (
    <ClientOnlyPortal>
      <button
        className="flex xl:hidden transition-transform ease-linear duration-150 active:scale-90 fixed bottom-4 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-glass items-center justify-center text-accent border-solid border-[1px] border-accent blur-in z-10"
        aria-label="Toggle table of contents modal"
        onClick={toggle}
      >
        <Icon icon="mdi:format-list-bulleted" />
      </button>

      <Modal
        isOpen={$isModalOpen}
        backdrop="blur"
        onClose={close}
        scrollBehavior="inside"
        hideCloseButton
      >
        <ModalContent className="bg-glass">
          <ModalHeader>Table of contents</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </ClientOnlyPortal>
  );
}

export default TOCModal;
