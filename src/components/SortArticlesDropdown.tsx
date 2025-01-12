import { Icon } from '@iconify-icon/react';
import { useStore } from '@nanostores/react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  type SharedSelection,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import {
  filtersAtom,
  sortingOptions,
  type Sorting,
} from 'src/stores/globalStore';

function SortArticlesDropdown() {
  const [selected, setSelected] = useLocalStorage<Sorting>(
    'selectedSortingKeys',
    'Latest',
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

  function onSelectionChange(keys: SharedSelection) {
    setSelected(keys.anchorKey as Sorting);
  }

  return (
    <Dropdown
      placement="bottom-start"
      classNames={{ content: 'bg-glass' }}
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DropdownTrigger>
        <Button
          className="capitalize bg-glass text-accent w-full justify-start"
          startContent={<Icon icon="mdi:sort" />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {selected}

          <Kbd
            className="ml-auto pointer-events-none"
            classNames={{ base: 'bg-glass' }}
            keys={['shift']}
          >
            Z
          </Kbd>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        aria-label="Select sorting type"
        selectedKeys={[selected]}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        {sortingOptions.map(option => (
          <DropdownItem key={option}>{option}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default SortArticlesDropdown;
