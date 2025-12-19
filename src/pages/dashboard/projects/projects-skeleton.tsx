function ProjectCardSkeleton() {
  return (
    <div className='rounded-xl bg-base-100 shadow-sm p-6 space-y-4 animate-pulse'>
      <div className='flex items-center gap-3'>
        <div className='h-4 w-40 bg-base-200 rounded' />
        <div className='h-4 w-16 bg-base-200 rounded-full' />
      </div>

      <div className='space-y-2'>
        <div className='h-3 w-full bg-base-200 rounded' />
        <div className='h-3 w-3/4 bg-base-200 rounded' />
      </div>

      <div className='flex justify-end pt-4'>
        <div className='h-8 w-14 bg-base-200 rounded-md' />
      </div>
    </div>
  );
}

export default function ProjectsSkeleton() {
  return (
    <div className='p-4'>
      <div className='h-7 mb-5 w-32 bg-base-300 rounded animate-pulse' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
