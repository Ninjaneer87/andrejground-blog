import React from 'react';
import { Icon } from '@iconify-icon/react';
import ClientOnlyPortal from './Portal';

type Props = {
  children: React.ReactNode;
};

function Drawer({ children }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ClientOnlyPortal>
      <div
        className={`${
          isOpen ? '-translate-y-[calc(100%_+_1rem)]' : 'translate-y-0'
        } block xl:hidden fixed top-full left-1/2 -translate-x-1/2 w-[80vw] z-10 transition-transform ease-in-out rounded-2xl`}
      >
        <button
          className="transition-transform ease-linear duration-150 active:scale-90 absolute bottom-[calc(100%_+_1rem)] left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-glass flex items-center justify-center text-primary border-solid border-[1px] border-primary blur-in"
          aria-label="Toggle drawer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon="mdi:format-list-bulleted" />
        </button>
        <div className="p-4 rounded-lg bg-glass">{children}</div>
      </div>
    </ClientOnlyPortal>
  );
}

export default Drawer;
