import React from 'react';
import { useCheckbox, VisuallyHidden } from '@nextui-org/react';
import { AUTHORS } from 'src/constants';

type Props = {
  author: string;
  isApplied: boolean;
};
function AuthorFilterCard({ author, isApplied }: Props) {
  const authorObject = AUTHORS[author];

  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: isApplied,
    name: 'author',
    value: author,
  });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div
        {...getLabelProps()}
        className={`flex flex-col rounded-xl gap-2 border-solid border-[1px] items-center max-w-24 justify-center ${isFocusVisible ? 'border-secondary' : 'border-transparent'}`}
      >
        <img
          className={`rounded-full ${isSelected ? '' : 'grayscale'}`}
          src={`/images/${authorObject.image}`}
          alt={`Author: ${authorObject.name}`}
          width={40}
          height={40}
        />
        <div
          className={`text-xs text-center ${isSelected ? 'text-accent' : ''}`}
        >
          {authorObject.name}
        </div>
      </div>
    </label>
  );
}

export default AuthorFilterCard;
