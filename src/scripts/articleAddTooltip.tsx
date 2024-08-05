import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';

document.addEventListener('astro:page-load', () => {
  const tooltipElements = Array.from(document.querySelectorAll('.tooltip'));

  tooltipElements.forEach(element => {
    const content = element.getAttribute('data-tooltip');
    const triggerContent = element.innerHTML;
    element.innerHTML = '';
    const root = createRoot(element!);
    const triggerElementTag = element.tagName.toLowerCase();
    const Trigger = React.createElement(
      triggerElementTag,
      { className: 'border-b border-dashed border-b-2 cursor-pointer' },
      triggerContent,
    );
    root.render(
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>{Trigger}</PopoverTrigger>
        <PopoverContent>
          <span className="max-w-60 p-2 text-primary">{content}</span>
        </PopoverContent>
      </Popover>,
    );
  });
});
