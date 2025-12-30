import React from 'react';

export const ProjectDetailsSkeleton: React.FC = () => {
  return (
    <div className='w-[700px] h-[400px] mx-auto p-6 space-y-4 animate-pulse'>
      <div className='flex items-center justify-between'>
        <div className='h-8 bg-base-300 rounded w-2/3'></div>
        <div className='h-6 bg-base-300 rounded w-20'></div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-base-300 rounded-full'></div>
        <div className='flex flex-col gap-1'>
          <div className='h-4 bg-base-300 rounded w-32'></div>
          <div className='h-3 bg-base-300 rounded w-48'></div>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='h-3 bg-base-300 rounded w-full'></div>
        <div className='h-3 bg-base-300 rounded w-5/6'></div>
        <div className='h-3 bg-base-300 rounded w-4/6'></div>
      </div>

      <div className='mt-4'>
        <div className='h-4 bg-base-300 rounded w-24 mb-2'></div>
        <div className='space-y-2'>
          <div className='h-3 bg-base-300 rounded w-full'></div>
          <div className='h-3 bg-base-300 rounded w-5/6'></div>
          <div className='h-3 bg-base-300 rounded w-4/6'></div>
        </div>
      </div>
    </div>
  );
};
