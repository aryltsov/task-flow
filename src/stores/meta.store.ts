import { create } from 'zustand';
import { metaService } from '@services/meta.service';

export interface TaskPriority {
  type: string;
  color: string;
}

export type TaskPriorities = TaskPriority[];

type MetaState = {
  statuses: string[];
  priorities: TaskPriorities;

  fetchMeta: () => Promise<void>;
};

export const useMetaStore = create<MetaState>((set, get) => ({
  statuses: [],
  priorities: [],
  loading: false,

  fetchMeta: async () => {
    if (get().statuses.length) return;

    try {
      const response = await metaService.getStatuses();
      const meta = response[0];

      const statuses = meta['task-statuses'];
      const priorities = meta['task-priorities'];

      set({
        statuses,
        priorities,
      });
    } catch (e) {
      console.error('Failed to fetch metadata', e);
    }
  },
}));
