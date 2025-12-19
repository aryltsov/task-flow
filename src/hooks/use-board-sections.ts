import { useMemo } from 'react';
import { useMetaStore } from '@stores/meta.store';
import type { Task } from '@models/task.interface';
import type { BoardSections } from '@models/board-sections';

export const useBoardSections = (tasks: Task[]): BoardSections => {
  const statuses = useMetaStore((state) => state.statuses);

  return useMemo(() => {
    if (!statuses.length) {
      return {};
    }

    return initializeBoard(tasks, statuses);
  }, [tasks, statuses]);
};

const initializeBoard = (tasks: Task[], statuses: string[]): BoardSections => {
  const boardSections: BoardSections = {};

  statuses.forEach((status) => {
    boardSections[status] = getTasksByStatus(tasks, status);
  });

  return boardSections;
};

const getTasksByStatus = (tasks: Task[], status: string) => {
  return tasks.filter((task) => task.status === status);
};
