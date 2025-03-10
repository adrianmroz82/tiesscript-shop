interface Props {
  text: string;
}
export function EmptyState({ text }: Props) {
  return (
    <div className="flex h-2/3 items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">{text}</h1>
      {/* TODO: add redirect back button */}
    </div>
  );
}
