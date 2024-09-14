type Props = {
  tags: string[];
};

function Tags({ tags }: Props) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {tags.map(tag => (
        <li key={tag}>
          <a
            className="text-xs border-accent border-solid border-[1px] text-accent px-2 py-1 rounded-lg uppercase"
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
