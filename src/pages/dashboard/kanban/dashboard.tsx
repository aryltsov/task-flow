import KanbanBoard from './kanban-board.tsx';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <Outlet />
      <main role='main' className='w-full overflow-x-scroll p-3'>
        <KanbanBoard />
      </main>
    </>
  );
}
