import React from 'react';
import { useCheckbox, VisuallyHidden } from '@nextui-org/react';

type Props = {
  tag: string;
  isApplied: boolean;
};

export default function TagFilterChip({ tag, isApplied }: Props) {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: isApplied,
    name: 'tag',
    value: tag,
  });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div
        {...getLabelProps()}
        className={`text-xs ${isSelected ? 'text-accent border-accent' : ''} border-solid border-[1px] px-2 py-1 rounded-lg uppercase ${isFocusVisible ? 'border-secondary' : ''}`}
      >
        {tag}
      </div>
    </label>
  );
}
