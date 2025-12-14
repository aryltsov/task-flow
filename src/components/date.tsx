type DueDateProps = {
  date?: string;
};

export default function DueDate({ date }: DueDateProps) {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString();

  return <span className='text-xs text-muted'>{formatted}</span>;
}
