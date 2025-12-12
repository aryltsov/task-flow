import { type JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <button className='btn btn-primary btn-lg loading' aria-label='loading' />
    </div>
  );
}
