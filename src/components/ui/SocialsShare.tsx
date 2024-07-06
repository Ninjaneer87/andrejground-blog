import React from 'react';
import { FacebookShare, LinkedinShare, TwitterShare } from 'react-share-kit';

type Props = {
  url: string;
};

function SocialsShare({ url }: Props) {
  return (
    <div className="flex gap-4 items-center py-4">
      <FacebookShare url={url} bgColor="#333" borderRadius={16} size={32} />
      <LinkedinShare url={url} bgColor="#333" borderRadius={16} size={32} />
      <TwitterShare url={url} bgColor="#333" borderRadius={16} size={32} />
    </div>
  );
}

export default SocialsShare;
