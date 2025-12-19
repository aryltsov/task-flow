import { Link } from 'react-router-dom';

export default function ErrorFallback() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-200 p-8'>
      <div className='text-center max-w-md'>
        <h1 className='text-5xl font-extrabold text-error mb-4 animate-bounce'>Oops!</h1>
        <h2 className='text-2xl font-semibold mb-2'>Something went wrong</h2>
        <p className='text-gray-600 mb-6'>An unexpected error has occurred in the application. Don't worry, it's not you - it's us.</p>
        <div className='flex gap-4 justify-center'>
          <button onClick={() => window.location.reload()} className='btn btn-error shadow-lg'>
            Reload Page
          </button>
          <Link to='/dashboard'>
            <button className='btn btn-primary outline-accent shadow-lg'>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
