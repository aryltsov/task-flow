import { useEffect } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { useBoardStore } from '@stores/board.store';
import Project from './project';
import { ROUTES } from '@routes/paths';
import { useNavigate } from 'react-router-dom';
import ProjectsSkeleton from '@pages/dashboard/projects/projects-skeleton.tsx';

export default function ProjectsPage() {
  const projects = useBoardStore((s) => s.projects);
  const fetchNextPageProjects = useBoardStore((s) => s.fetchNextPageProjects);
  const loadingProjects = useBoardStore((s) => s.loadingProjects);
  const navigate = useNavigate();

  useEffect(() => {
    if (projects.length === 0) fetchNextPageProjects();
  }, []);

  if (projects.length === 0 && loadingProjects) {
    return <ProjectsSkeleton />;
  }

  return (
    <div className='p-4 w-full h-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <button
          className='btn btn-primary'
          onClick={() =>
            navigate(ROUTES.dashboard.projects.new, {
              state: { backgroundLocation: location.pathname },
            })
          }>
          Add Project
        </button>
      </div>

      <VirtuosoGrid
        data={projects}
        style={{ height: 'calc(100vh - 160px)' }}
        listClassName='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        endReached={fetchNextPageProjects}
        overscan={300}
        itemContent={(_, project) => <Project {...project} />}
        components={{
          Footer: () =>
            loadingProjects ? (
              <div className='col-span-full'>
                <ProjectsSkeleton cardsNumber={3} withTitle={false} />
              </div>
            ) : null,
        }}
      />
    </div>
  );
}
