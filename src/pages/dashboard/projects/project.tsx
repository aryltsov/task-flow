import { useLocation, useNavigate } from 'react-router-dom';
import type { ProjectInterface } from '@models/project.interface';
import { ROUTES } from '@routes/paths.ts';
import ProjectStatusBadge from '@components/project-status-badge.tsx';

export default function Project(project: ProjectInterface) {
  const navigate = useNavigate();
  const location = useLocation();

  const openProject = () => {
    navigate(ROUTES.dashboard.projects.tasks.root(project.id));
  };

  const viewProject = () => {
    navigate(ROUTES.dashboard.projects.view(project.id), {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div
      key={project.id}
      className='card bg-base-100 shadow-md min-h-[220px]'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openProject();
      }}>
      <div className='card-body'>
        <h2 className='card-title flex justify-between items-center'>
          <p className='line-clamp-1'>{project.title}</p>
          <ProjectStatusBadge {...project} />
        </h2>

        <p className='text-sm text-gray-600'>{project.description}</p>

        <div className='card-actions justify-end mt-4'>
          <button
            className='btn btn-sm btn-neutral'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              viewProject();
            }}>
            View
          </button>
        </div>
      </div>
    </div>
  );
}
