interface LoaderProps {
  text?: string;
}

export default function Loader({ text = 'Loading...' }: LoaderProps) {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full py-10'>
      <span className='loading loading-spinner loading-lg text-primary mb-4'></span>
      <span className='text-lg text-gray-700'>{text}</span>
    </div>
  );
}
