import { Icon } from '@iconify-icon/react';
import React from 'react';

type Props = {
  text: string;
};
function ClipboardCopy({ text }: Props) {
  const [copied, setCopied] = React.useState(false);

  function onCopy() {
    navigator?.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <button
      aria-label="Copy text"
      aria-description="Copy to clipboard"
      className="blur-in cursor-pointer text-accent"
      onClick={onCopy}
    >
      <Icon icon={`mdi:${copied ? 'check-all' : 'content-copy'}`} />
    </button>
  );
}

export default ClipboardCopy;
