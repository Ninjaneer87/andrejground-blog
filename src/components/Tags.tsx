type Props = {
  tags: string[];
};

function Tags({ tags }: Props) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {tags.map(tag => (
        <li key={tag}>
          <a
            className="flex text-xs text-accent px-4 py-2 rounded-lg uppercase shadow-3d"
            href={`/articles?tag=${tag}`}
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Tags;
