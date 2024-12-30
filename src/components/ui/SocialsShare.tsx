import { FacebookShare, LinkedinShare, TwitterShare } from 'react-share-kit';

type Props = {
  url: string;
};

function SocialsShare({ url }: Props) {
  return (
    <div className="flex gap-2 items-center blur-in text-accent">
      <FacebookShare
        url={url}
        bgColor="transparent"
        color="rgb(var(--accent))"
        style={{
          border: '1px solid rgb(var(--accent))',
          borderRadius: '0.5rem',
        }}
        borderRadius={16}
        size={32}
      />
      <LinkedinShare
        url={url}
        bgColor="transparent"
        color="rgb(var(--accent))"
        style={{
          border: '1px solid rgb(var(--accent))',
          borderRadius: '0.5rem',
        }}
        borderRadius={16}
        size={32}
      />
      <TwitterShare
        url={url}
        bgColor="transparent"
        color="rgb(var(--accent))"
        style={{
          border: '1px solid rgb(var(--accent))',
          borderRadius: '0.5rem',
        }}
        borderRadius={16}
        size={32}
      />
    </div>
  );
}

export default SocialsShare;
