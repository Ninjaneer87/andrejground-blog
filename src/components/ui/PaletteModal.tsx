import React, { useState } from 'react';
import Modal from './Modal';
import { Icon } from '@iconify-icon/react';
import DarkModePicker from './DarkModePicker';
import PalettePicker from './PalettePicker';

function PaletteModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <button
        className="transition-transform ease-linear duration-150 active:scale-90  h-12 w-12 rounded-full flex items-center justify-center text-text text-xl"
        aria-label="Toggle drawer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="mdi:theme-light-dark" />
      </button>
      {isOpen && (
        <Modal
          key={`${isOpen}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <>
            <div className="text-2xl">Theme settings</div>

            <hr className="my-8 h-0.5 border-t-0 bg-gradient-to-r from-primary to-transparent" />

            <div className="flex flex-col items-center gap-8">
              <DarkModePicker withText />
              <PalettePicker withText />
            </div>
          </>
        </Modal>
      )}
    </div>
  );
}

export default PaletteModal;
