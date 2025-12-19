import { useEffect } from 'react';
import { useBoardStore } from '@stores/board.store.ts';
import ProjectsSkeleton from './projects-skeleton.tsx';
import Project from './project.tsx';

export default function ProjectsPage() {
  const projects = useBoardStore((s) => s.projects);
  const fetchProjects = useBoardStore((s) => s.fetchProjects);
  const loadingProjects = useBoardStore((s) => s.loadingProjects);

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loadingProjects) {
    return <ProjectsSkeleton />;
  }
  return (
    <div className='p-4 w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
