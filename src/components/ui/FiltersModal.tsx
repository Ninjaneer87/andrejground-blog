import React from 'react';
import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import ClientOnlyPortal from './Portal';
import { isFiltersModalOpenAtom } from 'src/stores/globalStore';

type Props = {
  children: React.ReactNode;
};

function FiltersModal({ children }: Props) {
  const isFiltersModalOpen = useStore(isFiltersModalOpenAtom);

  function close() {
    isFiltersModalOpenAtom.set(false);
  }

  function toggle() {
    isFiltersModalOpenAtom.set(!isFiltersModalOpen);
  }

  return (
    <ClientOnlyPortal>
      <button
        className="flex md:hidden transition-transform ease-linear duration-150 active:scale-90 fixed bottom-4 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-glass items-center justify-center text-accent border-solid border-[1px] border-accent blur-in z-10"
        aria-label="Toggle filters modal"
        onClick={toggle}
      >
        <Icon icon="mdi:magnify" />
      </button>

      <Modal
        isOpen={isFiltersModalOpen}
        backdrop="blur"
        onClose={close}
        scrollBehavior="outside"
        placement="bottom-center"
        hideCloseButton
      >
        <ModalContent className="bg-glass h-[500px]">
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </ClientOnlyPortal>
  );
}

export default FiltersModal;
