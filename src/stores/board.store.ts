import { create } from 'zustand';
import { getProjectService } from '@services/projects.service';
import { taskService } from '@services/task.service';
import type { ProjectInterface } from '@models/project.interface';
import type { Task } from '@models/task.interface';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { ProjectFilters } from '@models/project-filters.interface';
import type { TaskFilters } from '@models/task-filters.interface';

type BoardState = {
  projects: ProjectInterface[];
  projectFilters: ProjectFilters;
  lastDoc?: QueryDocumentSnapshot;
  hasMore: boolean;
  loadingProjects: boolean;
  loadingProject: boolean;

  tasks: Task[];
  filteredTasks: Task[];
  taskFilters: TaskFilters;
  loadingTasks: boolean;
  loadingTask: boolean;
  currentTask: Task | null;

  activeProjectId: string | null;
  activeProject: ProjectInterface | null;

  setActiveProjectId: (id: string | null) => void;
  dropActiveProject: () => void;

  setProjectFilters: (filters: Partial<ProjectFilters>) => void;
  setTaskFilters: (filters: Partial<TaskFilters>) => void;

  resetProjects: () => void;

  fetchNextPageProjects: () => Promise<void>;
  fetchActiveProject: (id: string) => Promise<void>;
  fetchTasksByProject: (projectId: string) => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createProject: (project: ProjectInterface) => Promise<ProjectInterface>;
  updateProject: (project: ProjectInterface) => void;
  deleteProjectFromStore: (projectId: string) => void;
  updateTasksOrder: (tasks: Task[]) => Promise<void>;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  projects: [],
  projectFilters: {},

  tasks: [],
  filteredTasks: [],
  taskFilters: {},

  activeProjectId: null,
  activeProject: null,
  currentTask: null,

  lastDoc: undefined,
  hasMore: true,

  loadingProjects: false,
  loadingProject: false,
  loadingTasks: false,
  loadingTask: false,

  setActiveProjectId: (id) => set({ activeProjectId: id }),
  dropActiveProject: () => set({ activeProjectId: null, activeProject: null }),

  setProjectFilters: (filters) => {
    set((s) => ({ projectFilters: { ...s.projectFilters, ...filters } }));
    get().resetProjects();
    get().fetchNextPageProjects();
  },

  setTaskFilters: (filters) =>
    set((s) => {
      const nextFilters = { ...s.taskFilters, ...filters };
      return {
        taskFilters: nextFilters,
        filteredTasks: filterTasks(s.tasks, nextFilters),
      };
    }),

  resetProjects: () => set({ projects: [], lastDoc: undefined, hasMore: true, loadingProjects: false }),

  fetchActiveProject: async (id) => {
    set({ loadingProject: true });
    try {
      const project = await getProjectService().getProjectById(id);
      set({ activeProject: project, loadingProject: false });
    } catch {
      set({ loadingProject: false });
    }
  },

  fetchTasksByProject: async (projectId) => {
    set({ loadingTasks: true });
    const tasks = await taskService.getTasksByProject(projectId);
    set({ tasks, filteredTasks: filterTasks(tasks, get().taskFilters), loadingTasks: false });
  },

  fetchTaskById: async (taskId) => {
    set({ loadingTask: true });
    const task = await taskService.getTaskById(taskId);
    set({ currentTask: task, loadingTask: false });
  },

  updateTasksOrder: async (tasks: Task[]) => {
    set({ tasks, filteredTasks: filterTasks(tasks, get().taskFilters) });
    try {
      await taskService.updateTasksBatch(tasks);
    } catch (err) {
      console.error('Failed to update tasks batch', err);
      if (get().activeProjectId) {
        await get().fetchTasksByProject(get().activeProjectId as string);
      }
    }
  },

  createProject: async (projectData: Omit<ProjectInterface, 'id'>): Promise<ProjectInterface> => {
    set({ loadingProjects: true });
    try {
      const newProject = await getProjectService().createProject(projectData);
      set((s) => ({ projects: [newProject, ...s.projects] }));
      get().resetProjects();
      await get().fetchNextPageProjects();
      return newProject;
    } catch (err) {
      console.error('Failed to create project', err);
      throw err;
    } finally {
      set({ loadingProjects: false });
    }
  },

  updateProject: async (project) => {
    const projects = get().projects.map((p) => (p.id === project.id ? project : p));
    set({ projects, activeProject: project });
    try {
      await getProjectService().updateProject(project);
    } catch (err) {
      console.error('Failed to update project on backend', err);
      if (project.id) {
        await get().fetchActiveProject(project.id);
        get().fetchNextPageProjects();
      }
    }
  },

  deleteProjectFromStore: (projectId: string) => {
    set((s) => ({
      projects: s.projects.filter((p) => p.id !== projectId),
      activeProject: s.activeProject?.id === projectId ? null : s.activeProject,
    }));
  },

  fetchNextPageProjects: async () => {
    const { loadingProjects, hasMore, lastDoc, projectFilters } = get();
    if (loadingProjects || !hasMore) return;

    set({ loadingProjects: true });
    try {
      const res = await getProjectService().fetchProjectsPage({ lastDoc, filters: projectFilters });
      const existingIds = new Set(get().projects.map((p) => p.id));
      const newItems = res.items.filter((p) => !existingIds.has(p.id));
      set((s) => ({
        projects: [...s.projects, ...newItems],
        lastDoc: res.lastDoc,
        hasMore: res.hasMore,
        loadingProjects: false,
      }));
    } catch {
      set({ loadingProjects: false });
    }
  },
}));

function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return !(filters.assigneeId && task.assignee?.id !== filters.assigneeId);
  });
}
