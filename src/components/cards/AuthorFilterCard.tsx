import { AUTHORS } from 'src/constants';

type Props = {
  author: string;
  isApplied: boolean;
  onChange: () => void;
};
function AuthorFilterCard({ author, isApplied, onChange }: Props) {
  const authorObject = AUTHORS[author];

  return (
    <button
      className={`flex flex-col rounded-xl gap-2  items-center max-w-24 justify-center  cursor-pointer`}
      onClick={onChange}
      type="button"
    >
      <img
        className={`rounded-full ${isApplied ? '' : 'grayscale'}`}
        src={`/images/${authorObject.image}`}
        alt={`Author: ${authorObject.name}`}
        width={40}
        height={40}
      />
      <div className={`text-xs text-center ${isApplied ? 'text-accent' : ''}`}>
        {authorObject.name}
      </div>
    </button>
  );
}

export default AuthorFilterCard;
