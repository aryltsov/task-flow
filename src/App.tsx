import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useMetaStore } from '@stores/meta.store';
import { AuthProvider } from '@contexts/auth.context';
import { ModalProvider } from '@providers/modal.provider.tsx';
import { ToastProvider } from '@contexts/toast-context.tsx';
import { ErrorBoundary } from '@pages/error-boundary.tsx';

function App() {
  const { fetchMeta } = useMetaStore();

  useEffect(() => {
    fetchMeta();
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <ErrorBoundary>
            <div className='min-h-screen min-w-screen'>
              <Outlet />
            </div>
          </ErrorBoundary>
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
