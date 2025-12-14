function TaskCardSkeleton() {
  return (
    <div className='card bg-base-200 shadow-sm p-6 space-y-3 animate-pulse'>
      <div className='h-4 w-3/4 bg-base-300 rounded' />
      <div className='h-3 w-full bg-base-300 rounded' />
      <div className='h-3 w-5/6 bg-base-300 rounded' />

      <div className='flex justify-between items-center pt-2'>
        <div className='h-6 w-16 bg-base-300 rounded-full' />
        <div className='h-6 w-6 bg-base-300 rounded-full' />
      </div>
    </div>
  );
}

function ColumnSkeleton() {
  return (
    <div className='w-96 flex-shrink-0 space-y-4'>
      {/* Column header */}
      <div className='h-6 w-24 bg-base-300 rounded animate-pulse' />

      {/* Cards */}
      <div className='space-y-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoardSkeleton() {
  return (
    <div className='flex gap-4 overflow-x-auto p-3'>
      {Array.from({ length: 5 }).map((_, i) => (
        <ColumnSkeleton key={i} />
      ))}
    </div>
  );
}
