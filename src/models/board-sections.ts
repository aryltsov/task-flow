import type { Task } from '@models/task.interface.ts';

export type BoardSections = {
  [name: string]: Task[];
};
