import type { ProjectService } from '@services/projects/project.service.interface';

declare global {
  interface Window {
    __E2E_PROJECTS_MOCK__?: ProjectService;
  }
}

export {};
