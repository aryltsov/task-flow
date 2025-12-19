import { useMemo } from 'react';
import { useMetaStore } from '@stores/meta.store';

type PriorityMap = Record<
  string,
  {
    label: string;
    cls: string;
  }
>;
export const usePriorityMap = (): PriorityMap => {
  const priorities = useMetaStore((state) => state.priorities);

  return useMemo(() => {
    return priorities.reduce((acc, item) => {
      acc[item.type] = {
        label: item.type,
        cls: `badge-${item.color}`,
      };
      return acc;
    }, {} as PriorityMap);
  }, [priorities]);
};
