import { AUTHORS } from 'src/constants';

type Props = {
  author: string;
};

function AuthorCard({ author }: Props) {
  const authorObject = AUTHORS[author];
  const authorImage = authorObject.image;
  const authorName = authorObject.name;

  return (
    <a
      href={`/articles/authors/${authorObject.slug}`}
      className="flex gap-2 items-center hover:text-accent transition-colors"
    >
      <img
        className="rounded-full"
        src={`/images/${authorImage}`}
        alt={authorName}
        width={32}
        height={32}
      />
      <div>{authorName}</div>
    </a>
  );
}

export default AuthorCard;
