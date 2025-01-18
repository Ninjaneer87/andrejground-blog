import { FacebookShare, LinkedinShare, TwitterShare } from 'react-share-kit';

type Props = {
  url: string;
};

function SocialsShare({ url }: Props) {
  const buttonProps = {
    url,
    bgColor: 'rgb(var(--card) / 0.5)',
    color: 'rgb(var(--accent))',
    className: 'shadow-3d bg-glass',
    style: {
      boxShadow: 'var(--shadow-3d)',
      borderRadius: '0.5rem',
    },
    borderRadius: 16,
    size: 32,
  };
  return (
    <div className="flex gap-2 items-center blur-in text-accent">
      <FacebookShare {...buttonProps} />
      <LinkedinShare {...buttonProps} />
      <TwitterShare {...buttonProps} />
    </div>
  );
}

export default SocialsShare;
