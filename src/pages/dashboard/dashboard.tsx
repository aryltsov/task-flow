import type { JSX } from 'react';
import NavBar from '../../components/nav-bar.tsx';
import KanbanBoard from './kanban-board.tsx';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <NavBar />

      <main role='main' className='w-full p-0'>
        <KanbanBoard />
      </main>
    </>
  );
}
