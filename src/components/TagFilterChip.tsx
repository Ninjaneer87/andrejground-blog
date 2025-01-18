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
      className={`text-xs ${isApplied ? 'text-accent border-accent' : ''} bg-glass px-4 py-2 rounded-lg uppercase focus-visible:border-secondary cursor-pointer select-none shadow-3d`}
    >
      {tag}
    </button>
  );
}
