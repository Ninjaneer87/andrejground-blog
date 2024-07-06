import React, { useState } from 'react';
import ClientOnlyPortal from './Portal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
function Modal({ isOpen, onClose, children }: Props) {
  const [closing, setClosing] = useState(false);
  console.log({ isOpen });

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  return (
    <ClientOnlyPortal>
      {isOpen ? (
        <div
          onClick={handleClose}
          style={{ animationDuration: '150ms' }}
          className={`p-4 blur-in fixed inset-0 bg-black/50 backdrop-blur-lg flex justify-center items-center z-10 ${
            closing ? 'blur-out' : ''
          }`}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-[500px] max-h-[80vh] p-4 bg-bg rounded-xl overflow-y-auto"
          >
            {children}
          </div>
        </div>
      ) : null}
    </ClientOnlyPortal>
  );
}

export default Modal;
