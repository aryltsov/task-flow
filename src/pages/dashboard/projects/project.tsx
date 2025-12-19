import { Link } from 'react-router-dom';
import type { ProjectInterface } from '@models/project.interface';

export default function Project(project: ProjectInterface) {
  return (
    <div key={project.id} className='card bg-base-100 shadow-md'>
      <div className='card-body'>
        <div>
          <h2 className='card-title'>
            {project.title}
            <span className='badge badge-outline'>{project.status}</span>
          </h2>
          <button>Add Project</button>
        </div>

        <p className='text-sm text-gray-600'>{project.description}</p>

        <div className='card-actions justify-end mt-4'>
          <Link to={`/dashboard/projects/${project.id}`} className='btn btn-sm btn-primary'>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
