import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from '@nextui-org/react';
import { createRoot } from 'react-dom/client';

document.addEventListener('astro:page-load', () => {
  const tooltipElements = Array.from(document.querySelectorAll('.tooltip'));

  tooltipElements.forEach(element => {
    const tooltipContent = element.getAttribute('data-tooltip');
    const TooltipTriggerContent = element.innerHTML;
    element.innerHTML = '';
    const root = createRoot(element!);
    const triggerElementTag = element.tagName.toLowerCase();
    const TooltipTrigger = React.createElement(
      triggerElementTag,
      { className: 'border-b border-dashed border-b-2' },
      TooltipTriggerContent,
    );
    root.render(
      <Tooltip
        showArrow
        color="default"
        content={
          <span className="max-w-60 p-2 text-primary">{tooltipContent}</span>
        }
      >
        {TooltipTrigger}
      </Tooltip>,
    );
  });
});
