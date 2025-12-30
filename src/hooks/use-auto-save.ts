import { useEffect, useRef } from 'react';

type UseAutoSaveOptions<T> = {
  data: T;
  onSave: (data: T) => Promise<void> | void;
  interval?: number;
  enabled?: boolean;
};

export function useAutoSave<T>({ data, onSave, interval = 30_000, enabled = true }: UseAutoSaveOptions<T>) {
  const lastSavedRef = useRef<T>(data);
  const savingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(async () => {
      if (savingRef.current) return;

      if (Object.is(lastSavedRef.current, data)) return;

      try {
        savingRef.current = true;
        await onSave(data);
        lastSavedRef.current = data;
      } catch (e) {
        console.error('AutoSave error:', e);
      } finally {
        savingRef.current = false;
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data, onSave, interval, enabled]);
}
