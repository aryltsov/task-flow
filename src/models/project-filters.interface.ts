export type ProjectStatus = 'active' | 'archived';

export interface ProjectFilters {
  search?: string;
  status?: ProjectStatus;
  creatorId?: string;
}
