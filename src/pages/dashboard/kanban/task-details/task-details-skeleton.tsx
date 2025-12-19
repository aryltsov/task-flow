function TaskDetailsSkeleton() {
  return (
    <div className='w-full max-w-lg mx-auto animate-pulse space-y-6'>
      <div className='h-14 w-3/4 mt-3 bg-base-300 rounded' />

      <div className='h-4 w-full bg-base-300 rounded' />

      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div className='flex flex-col gap-1'>
          <div className='h-3 w-16 bg-base-300 rounded' />
          <div className='h-8 w-8 bg-base-300 rounded-full' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='h-3 w-16 bg-base-300 rounded' />
          <div className='h-8 w-8 bg-base-300 rounded-full' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='h-3 w-16 bg-base-300 rounded' />
          <div className='h-6 w-20 bg-base-300 rounded' />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='h-3 w-16 bg-base-300 rounded' />
          <div className='h-6 w-20 bg-base-300 rounded' />
        </div>
        <div className='flex flex-col col-span-2 gap-1'>
          <div className='h-3 w-20 bg-base-300 rounded' />
          <div className='h-6 w-20 bg-base-300 rounded' />
        </div>
      </div>

      <div className='h-4 mt-8 w-32 bg-base-300 rounded' />
      <div className='border border-base-300 rounded-xl p-4 space-y-4 mt-0'>
        {[1, 2].map((i) => (
          <div key={i} className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='h-8 w-8 bg-base-300 rounded-full' />
              <div className='h-4 mt-2 w-32 bg-base-300 rounded' />
            </div>
            <div className='h-4 w-full bg-base-300 rounded' />
          </div>
        ))}
      </div>

      <div className='flex justify-end mt-2 mb-4'>
        <div className='h-10 w-24 bg-base-300 rounded' />
      </div>
    </div>
  );
}

export default TaskDetailsSkeleton;
