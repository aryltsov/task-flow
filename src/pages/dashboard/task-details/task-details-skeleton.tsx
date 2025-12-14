function TaskDetailsSkeleton() {
  return (
    <div className='w-full max-w-2xl mx-auto animate-pulse space-y-6'>
      <div className='h-8 w-3/4 bg-base-300 rounded' />

      <div className='space-y-2'>
        <div className='h-4 w-full bg-base-300 rounded' />
      </div>

      <div className='flex gap-4 mb-2'>
        <div className='h-8 w-24 bg-base-300 rounded-full' />
        <div className='h-8 w-20 bg-base-300 rounded-full' />
      </div>

      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 bg-base-300 rounded-full' />
          <div className='h-4 w-32 bg-base-300 rounded' />
        </div>

        <div className='h-4 w-24 bg-base-300 rounded' />
      </div>

      <div className='h-6 w-32 bg-base-300 rounded mt-4 mb-2' />

      <div className='border border-base-300 rounded-xl p-4 space-y-4'>
        {[1, 2].map((i) => (
          <div key={i} className='space-y-3'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 bg-base-300 rounded-full' />
              </div>

              <div className='h-4 w-20 bg-base-300 rounded' />
            </div>

            <div className='h-4 w-full bg-base-300 rounded' />
          </div>
        ))}
      </div>

      <div className='flex justify-end pt-0'>
        <div className='h-10 w-24 bg-base-300 rounded' />
      </div>
    </div>
  );
}

export default TaskDetailsSkeleton;
