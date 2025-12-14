import type { JSX } from 'react';
import NavBar from '../../components/nav-bar.tsx';
import KanbanBoard from './kanban/kanban-board.tsx';
import { ModalProvider } from '../../components/modal.tsx';
import { TaskModalController } from '../../controllers/task-modal-controller.tsx';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <NavBar />

      <ModalProvider>
        <TaskModalController />
        <main role='main' className='w-full overflow-x-scroll p-3'>
          <KanbanBoard />
        </main>
      </ModalProvider>
    </>
  );
}
