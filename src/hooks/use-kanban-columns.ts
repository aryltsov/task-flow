import { useEffect, useState } from 'react';
import type { Task, Status } from '../utils/types';
import tasksJson from '../data/tasks.json';

export interface UseKanbanColumnsResult {
  columns: Record<Status, Task[]>;
  onDragEnd: (activeId: string, overId: string | null) => void;
  findContainerByTaskId: (taskId: string) => Status | null;
}

const COLUMN_ORDER: Status[] = ['todo', 'in-progress', 'in-review', 'done', 'blocked'];

export function useKanbanColumns(): UseKanbanColumnsResult {
  const [columns, setColumns] = useState<Record<Status, Task[]>>({
    todo: [],
    'in-progress': [],
    'in-review': [],
    done: [],
    blocked: [],
  });

  useEffect(() => {
    const loaded = (tasksJson as Task[]).reduce(
      (acc, t) => {
        acc[t.status].push(t);
        return acc;
      },
      {
        todo: [] as Task[],
        'in-progress': [] as Task[],
        'in-review': [] as Task[],
        done: [] as Task[],
        blocked: [] as Task[],
      }
    );
    // Гарантируем наличие всех статусов
    for (const status of COLUMN_ORDER) {
      if (!loaded[status]) loaded[status] = [];
    }
    setColumns(loaded);
  }, []);

  const findContainerByTaskId = (taskId: string): Status | null => {
    for (const k of COLUMN_ORDER) {
      if (columns[k].some((t) => t.id === taskId)) return k;
    }
    return null;
  };

  const onDragEnd = (activeId: string, overId: string | null) => {
    if (!overId) return;

    const srcCol = findContainerByTaskId(activeId);
    const destCol = overId.startsWith('column-') ? (overId.replace('column-', '') as Status) : findContainerByTaskId(overId);

    if (!srcCol || !destCol) return;

    const srcList = [...columns[srcCol]];
    const destList = [...columns[destCol]];

    const oldIndex = srcList.findIndex((t) => t.id === activeId);
    const destIndex = overId.startsWith('column-') ? destList.length : destList.findIndex((t) => t.id === overId);

    if (oldIndex === -1 || destIndex === -1) return;

    // Перемещение внутри одной колонки
    if (srcCol === destCol) {
      const newList = [...srcList];
      const [moved] = newList.splice(oldIndex, 1);
      newList.splice(destIndex, 0, moved);
      setColumns((prev) => ({ ...prev, [srcCol]: newList }));
      return;
    }

    // Перемещение между колонками
    const [moved] = srcList.splice(oldIndex, 1);
    const updatedMoved = { ...moved, status: destCol };
    destList.splice(destIndex, 0, updatedMoved);

    setColumns((prev) => ({
      ...prev,
      [srcCol]: srcList,
      [destCol]: destList,
    }));
  };

  return { columns, onDragEnd, findContainerByTaskId };
}
