import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { ProjectInterface } from '@models/project.interface';
import type { ProjectFilters } from '@models/project-filters.interface';

export type FetchProjectsArgs = {
  lastDoc?: QueryDocumentSnapshot;
  filters?: ProjectFilters;
};

export interface ProjectService {
  fetchProjectsPage(args?: FetchProjectsArgs): Promise<{
    items: ProjectInterface[];
    lastDoc?: QueryDocumentSnapshot;
    hasMore: boolean;
  }>;

  getProjectById(projectId: string): Promise<ProjectInterface | null>;
  updateProject(project: ProjectInterface): Promise<void>;
  createProject(project: Omit<ProjectInterface, 'id'>): Promise<ProjectInterface>;
  deleteProject(projectId: string): Promise<void>;
}
