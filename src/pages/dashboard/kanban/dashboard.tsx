import KanbanBoard from './kanban-board.tsx';
import { ModalProvider } from '@components/modal.tsx';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <ModalProvider>
      <Outlet />
      <main role='main' className='w-full overflow-x-scroll p-3'>
        <KanbanBoard />
      </main>
    </ModalProvider>
  );
}
