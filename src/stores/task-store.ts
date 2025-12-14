import { create } from 'zustand';
import type { Task } from '../utils/types';
import { taskService } from '../services/task-service.ts';

type TaskState = {
  tasks: Task[];
  currentTask: Task | null;
  loadingTasks: boolean;
  loadingTask: boolean;
  getTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  currentTask: null,
  loadingTasks: false,
  loadingTask: true,

  getTasks: async () => {
    set({ loadingTasks: true });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks, loadingTasks: false });
    } catch (e) {
      set({ loadingTasks: false });
    }
  },

  fetchTaskById: async (id: string) => {
    set({ loadingTask: true });
    try {
      const task = await taskService.getTaskById(id);
      set({ currentTask: task, loadingTask: false });
    } catch (e) {
      set({ loadingTask: false });
    }
  },
}));
