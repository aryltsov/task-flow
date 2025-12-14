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
  loadingTask: false,

  getTasks: async () => {
    set({ loadingTasks: true });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks });
    } finally {
      set({ loadingTasks: false });
    }
  },

  fetchTaskById: async (id: string) => {
    set({ loadingTask: true });
    try {
      const task = await taskService.getTaskById(id);
      set({ currentTask: task });
    } finally {
      set({ loadingTask: false });
    }
  },
}));
