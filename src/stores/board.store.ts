import { create } from 'zustand';
import { taskService } from '@services/task.service';
import { projectService } from '@services/projects.service';
import type { ProjectInterface } from '@models/project.interface';
import type { Task } from '@models/task.interface';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

type BoardState = {
  projects: ProjectInterface[];
  activeProjectId: string | null;
  activeProject: ProjectInterface | null;
  tasks: Task[];
  currentTask: Task | null;

  lastDoc?: QueryDocumentSnapshot;
  hasMore: boolean;
  loadingProjects: boolean;
  loadingProject: boolean;
  loadingTasks: boolean;
  loadingTask: boolean;

  setProjects: (projects: ProjectInterface[]) => void;
  setActiveProjectId: (id: string | null) => void;
  dropActiveProject: () => void;

  fetchNextPageProjects: () => Promise<void>;
  fetchActiveProject: (id: string) => Promise<void>;
  fetchTasksByProject: (projectId: string) => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  updateProject: (project: ProjectInterface) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  projects: [],
  activeProjectId: null,
  activeProject: null,
  tasks: [],
  currentTask: null,
  lastDoc: undefined,
  hasMore: true,
  loadingProjects: false,
  loadingProject: false,
  loadingTasks: false,
  loadingTask: false,

  setProjects: (projects) => set({ projects }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  dropActiveProject: () => set({ activeProjectId: null, activeProject: null }),

  fetchNextPageProjects: async () => {
    const { loadingProjects, hasMore, lastDoc } = get();
    if (loadingProjects || !hasMore) return;

    set({ loadingProjects: true });

    try {
      const res = await projectService.fetchProjectsPage(lastDoc);
      set((state) => ({
        projects: [...state.projects, ...res.items],
        lastDoc: res.lastDoc,
        hasMore: res.hasMore,
        loadingProjects: false,
      }));
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
    } catch {
      set({ loadingTasks: false });
    }
  },

  fetchTaskById: async (taskId: string) => {
    set({ loadingTask: true });
    try {
      const tasks = get().tasks;
      let currentTask = tasks.find((t) => t.id === taskId) || null;
      if (!currentTask) currentTask = await taskService.getTaskById(taskId);
      set({ currentTask, loadingTask: false });
    } catch {
      set({ loadingTask: false });
    }
  },

  updateProject: (project) => {
    const projects = get().projects.map((p) => (p.id === project.id ? project : p));
    set({ projects, activeProject: project });
  },
}));
