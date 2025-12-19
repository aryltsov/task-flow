function TaskCardSkeleton() {
  return (
    <div className='rounded-xl bg-base-100 shadow-sm p-4 space-y-3 animate-pulse'>
      <div className='h-4 w-4/5 bg-base-200 rounded' />

      <div className='space-y-2'>
        <div className='h-3 w-full bg-base-200 rounded' />
        <div className='h-3 w-5/6 bg-base-200 rounded' />
      </div>

      <div className='flex justify-between items-center pt-2'>
        <div className='h-5 w-14 bg-base-200 rounded-full' />
        <div className='h-7 w-7 bg-base-200 rounded-full' />
      </div>
    </div>
  );
}

function ColumnSkeleton() {
  return (
    <div className='w-96 min-h-[calc(100vh-110px)] flex-shrink-0 rounded-xl bg-base-200 p-3 space-y-4'>
      <div className='flex items-center justify-between animate-pulse'>
        <div className='h-4 w-24 bg-base-300 rounded' />
        <div className='h-4 w-6 bg-base-300 rounded' />
      </div>

      <div className='space-y-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoardSkeleton() {
  return (
    <div className='flex gap-4 overflow-x-auto'>
      {Array.from({ length: 4 }).map((_, i) => (
        <ColumnSkeleton key={i} />
      ))}
    </div>
  );
}
