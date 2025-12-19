import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMetaStore } from '@stores/meta.store';
import { AuthProvider } from '@contexts/auth.context';

function App() {
  const { fetchMeta } = useMetaStore();

  useEffect(() => {
    fetchMeta();
  }, []);

  return (
    <AuthProvider>
      <div className='min-h-screen min-w-screen'>
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
