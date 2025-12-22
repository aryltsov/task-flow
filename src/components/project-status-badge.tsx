import type { ProjectInterface } from '@models/project.interface.ts';

export default function ProjectStatusBadge(project: ProjectInterface) {
  const className = `badge badge-xs capitalize ${project.status === 'active' ? 'badge-success' : 'badge-neutral badge-soft opacity-60'}`;

  return <span className={className}>{project.status}</span>;
}
