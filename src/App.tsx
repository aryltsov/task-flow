import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMetaStore } from '@stores/meta.store';
import { AuthProvider } from '@contexts/auth.context';
import { ModalProvider } from '@providers/modal.provider.tsx';

function App() {
  const { fetchMeta } = useMetaStore();

  useEffect(() => {
    fetchMeta();
  }, []);

  return (
    <ModalProvider>
      <AuthProvider>
        <div className='min-h-screen min-w-screen'>
          <Outlet />
        </div>
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;
