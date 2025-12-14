import type { JSX } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Project = {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Archived';
  tasksCount: number;
};

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with new branding.',
    status: 'Active',
    tasksCount: 12,
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Develop a mobile app for iOS and Android.',
    status: 'Active',
    tasksCount: 8,
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch a new marketing campaign for Q1.',
    status: 'Archived',
    tasksCount: 5,
  },
];

export default function ProjectsPage(): JSX.Element {
  const [projects] = useState<Project[]>(initialProjects);

  return (
    <div className='p-4 w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <button className='btn btn-primary'>Create Project</button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <div key={project.id} className='card bg-base-100 shadow-md border border-base-300'>
            <div className='card-body'>
              <h2 className='card-title'>
                {project.name}
                <div className={`badge ${project.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{project.status}</div>
              </h2>
              <p className='text-sm text-gray-600'>{project.description}</p>
              <div className='card-actions justify-between items-center mt-4'>
                <span className='text-xs text-gray-500'>{project.tasksCount} tasks</span>
                <Link to={`/dashboard/projects/${project.id}`} className='btn btn-sm btn-outline btn-primary'>
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
