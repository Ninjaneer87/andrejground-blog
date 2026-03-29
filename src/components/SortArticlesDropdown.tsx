import { Select, useLocalStorage, type OptionItem } from '@andrejground/lab';
import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import { Kbd } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { filtersAtom, sortingOptions } from 'src/stores/globalStore';

function SortArticlesDropdown() {
  const [selected, setSelected] = useLocalStorage<OptionItem>(
    'selectedSortingKeys',
    sortingOptions[0],
  );
  const [isOpen, setIsOpen] = useState(false);
  const filters = useStore(filtersAtom);

  useEffect(() => {
    filtersAtom.set({ ...filters, sorting: selected });
  }, [selected]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'z' && e.shiftKey) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Select
      fullWidth
      classNames={{
        popover: { content: 'bg-glass text-white' },
        trigger: {
          base: 'text-[14px] px-4 min-h-[40px] border-none capitalize bg-glass text-accent w-full justify-start shadow-3d',
        },
        item: {
          base: 'text-[14px] hover:bg-background/70 focus-visible:bg-background/70',
        },
      }}
      backdrop="blur"
      isOpen={isOpen}
      onSelectionChange={({ selectedOption }) => {
        if (!selectedOption) return;

        setSelected(selectedOption);
      }}
      onOpenChange={setIsOpen}
      items={sortingOptions}
      popOnSelection={false}
      caret={
        <Kbd
          className="ml-auto pointer-events-none"
          classNames={{ base: 'bg-glass' }}
          keys={['shift']}
        >
          Z
        </Kbd>
      }
      renderValue={newValues => {
        return (
          <div className="flex gap-1 items-center">
            <Icon icon="mdi:sort" /> {newValues[0]?.text}
          </div>
        );
      }}
    />
  );
}

export default SortArticlesDropdown;
