import { useEffect } from 'react';

export function useDebouncedEffect(effect: () => void, deps: any[], delay = 400) {
  useEffect(() => {
    const id = setTimeout(effect, delay);
    return () => clearTimeout(id);
  }, deps);
}
