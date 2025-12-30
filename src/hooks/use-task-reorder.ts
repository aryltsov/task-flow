import { useCallback } from 'react';
import type { Task } from '@models/task.interface';
import type { DropResult } from '@hello-pangea/dnd';

/**
 * in real life we don't need this, we would only make a request with tasks, status and sortIndex
 */
export const useTaskReorder = () => {
  return useCallback((tasks: Task[], result: DropResult): Task[] => {
    const { source, destination } = result;
    if (!destination) return tasks;

    // copy tasks to avoid mutation
    const tasksCopy = tasks.map((t) => ({ ...t }));

    if (source.droppableId === destination.droppableId) {
      // drag inside the same column
      const list = tasksCopy.filter((t) => t.status === source.droppableId).sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0));

      const [moved] = list.splice(source.index, 1);
      list.splice(destination.index, 0, moved);

      list.forEach((t, i) => (t.sortIndex = i));

      return tasksCopy.map((t) => (t.status === source.droppableId ? list.find((l) => l.id === t.id)! : t));
    } else {
      // drag between columns
      const sourceList = tasksCopy.filter((t) => t.status === source.droppableId).sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0));

      const destList = tasksCopy.filter((t) => t.status === destination.droppableId).sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0));

      const [moved] = sourceList.splice(source.index, 1);
      moved.status = destination.droppableId;
      destList.splice(destination.index, 0, moved);

      sourceList.forEach((t, i) => (t.sortIndex = i));
      destList.forEach((t, i) => (t.sortIndex = i));

      // merge back
      return tasksCopy.map((t) => {
        const inSource = sourceList.find((s) => s.id === t.id);
        if (inSource) return inSource;
        const inDest = destList.find((d) => d.id === t.id);
        if (inDest) return inDest;
        return t;
      });
    }
  }, []);
};
