import type { ProjectInterface } from '@models/project.interface.ts';
import ProjectStatusBadge from '@components/project-status-badge.tsx';
import Avatar from '@components/avatar.tsx';

type ProjectViewProps = {
  project: ProjectInterface;
};

export default function ProjectView({ project }: ProjectViewProps) {
  return (
    <div className='w-[700px] max-h-[80vh]'>
      <ProjectStatusBadge {...project} />
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <Avatar name={project.creator.name} avatarUrl={project.creator.avatarUrl} rtl={true} />
      </div>

      <div className='prose max-w-none'>
        <p>{project.description}</p>
      </div>

      {project.wiki && (
        <div className='mt-4 max-h-[calc(80vh-120px)] overflow-y-scroll'>
          <div className='prose max-w-none'>{project.wiki}</div>
        </div>
      )}
    </div>
  );
}
