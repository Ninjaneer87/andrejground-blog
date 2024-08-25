import { useCheckbox, VisuallyHidden } from '@nextui-org/react';
import { Image } from 'astro:assets';
import React from 'react';
import { AUTHORS } from 'src/utils/config';

type Props = {
  author: string;
  isApplied: boolean;
};
function AuthorFilterCard({ author, isApplied }: Props) {
  const authorObject = AUTHORS[author as keyof typeof AUTHORS];

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
        className={`flex flex-col rounded-xl gap-2 border-solid border-[1px] items-center ${isFocusVisible ? 'border-secondary' : 'border-transparent'}`}
      >
        <img
          className={`rounded-full ${isSelected ? '' : 'grayscale'}`}
          src={`/images/${authorObject.image}`}
          alt={authorObject.name}
          width={40}
          height={40}
        />
        <div className={`text-xs ${isSelected ? 'text-accent' : ''}`}>
          {authorObject.name}
        </div>
      </div>
    </label>
  );
}

export default AuthorFilterCard;
