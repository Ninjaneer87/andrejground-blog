type Props = {
  tag: string;
  isApplied: boolean;
  onChange: () => void;
};

export default function TagFilterChip({ tag, isApplied, onChange }: Props) {
  
  return (
    <button
      onClick={onChange}
      type="button"
      className={`text-xs ${isApplied ? 'text-accent border-accent' : ''} border-solid border-[1px] px-2 py-1 rounded-lg uppercase focus-visible:border-secondary cursor-pointer select-none`}
    >
      {tag}
    </button>
  );
}
