import { INITIAL_TASKS } from '../data/tasks';
import type { Task } from '../utils/types.ts';

function simulateDelay<T>(data: T, delay = 800): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    return simulateDelay(INITIAL_TASKS);
  },
  getTaskById: async (id: string): Promise<Task | null> => {
    const task = INITIAL_TASKS.find((t) => t.id === id) || null;
    return simulateDelay(task);
  },
};
