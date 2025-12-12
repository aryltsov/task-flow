import './App.css';
import { Outlet } from 'react-router-dom';
import type { JSX } from 'react';

function App(): JSX.Element {
  return (
    <div className='min-h-screen min-w-screen'>
      <Outlet />
    </div>
  );
}

export default App;
