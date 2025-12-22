import { create } from 'zustand';
import { taskService } from '@services/task.service';
import type { ProjectInterface } from '@models/project.interface.ts';
import type { Task } from '@models/task.interface';
import { projectService } from '@services/projects.service.ts';

// todo split into separate stores (task and projects)
type BoardState = {
  projects: ProjectInterface[];
  activeProjectId: string | null;
  activeProject: ProjectInterface | null;
  tasks: Task[];
  currentTask: Task | null;
  loadingProject: boolean;
  loadingTasks: boolean;
  loadingTask: boolean;
  loadingProjects: boolean;

  setProjects: (projects: ProjectInterface[]) => void;
  setActiveProjectId: (id: string | null) => void;
  dropActiveProject: () => void;
  fetchProjects: () => Promise<void>;
  fetchActiveProject: (id: string) => Promise<void>;
  fetchTasksByProject: (projectId: string) => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  projects: [],
  activeProjectId: null,
  activeProject: null,
  tasks: [],
  currentTask: null,
  loadingProject: false,
  loadingTasks: false,
  loadingTask: false,
  loadingProjects: false,

  setProjects: (projects) => set({ projects }),
  setActiveProjectId: (id) => {
    set({ activeProjectId: id });
  },

  dropActiveProject: () => {
    set({ activeProjectId: null, activeProject: null });
  },

  fetchProjects: async () => {
    set({ loadingProjects: true });
    try {
      const projects = await projectService.getProjects();
      set({ projects, loadingProjects: false });
    } catch {
      set({ loadingProjects: false });
    }
  },

  fetchActiveProject: async (id) => {
    set({ loadingProject: true });
    try {
      const project = await projectService.getProjectById(id);
      set({ activeProject: project, loadingProject: false });
    } catch {
      set({ loadingProject: false });
    }
  },

  fetchTasksByProject: async (projectId: string) => {
    set({ loadingTasks: true });
    try {
      const tasks = await taskService.getTasksByProject(projectId);
      set({ tasks, loadingTasks: false });
    } catch (e) {
      set({ loadingTasks: false });
    }
  },

  fetchTaskById: async (taskId: string) => {
    set({ loadingTask: true });
    try {
      const tasks = get().tasks;
      let currentTask = tasks.find((t) => t.id === taskId) || null;

      if (!currentTask) {
        currentTask = await taskService.getTaskById(taskId);
      }

      set({ currentTask, loadingTask: false });
    } catch {
      set({ loadingTask: false });
    }
  },
}));
