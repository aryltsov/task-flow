import type { Creator } from '@models/creator';
import type { ProjectStatus } from '@models/project-filters.interface';

export interface ProjectInterface {
  id: string;
  title: string;
  description: string;
  wiki: string;
  status: ProjectStatus;
  creator: Creator;
  createdAt: string;
}
