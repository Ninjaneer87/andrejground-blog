import React from 'react';
import { FacebookShare, LinkedinShare, TwitterShare } from 'react-share-kit';

type Props = {
  url: string;
};

function SocialsShare({ url }: Props) {
  return (
    <div className="flex gap-2 items-center blur-in">
      <FacebookShare
        url={url}
        bgColor="rgb(var(--secondary))"
        borderRadius={16}
        size={32}
      />
      <LinkedinShare
        url={url}
        bgColor="rgb(var(--secondary))"
        borderRadius={16}
        size={32}
      />
      <TwitterShare
        url={url}
        bgColor="rgb(var(--secondary))"
        borderRadius={16}
        size={32}
      />
    </div>
  );
}

export default SocialsShare;
