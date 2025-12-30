import { renderHook } from '@testing-library/react';
import { useDebouncedEffect } from '../use-debounced-effect';

jest.useFakeTimers();

describe('useDebouncedEffect', () => {
  it('should call effect after delay', () => {
    const effect = jest.fn();
    renderHook(() => useDebouncedEffect(effect, [], 500));

    expect(effect).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on rerender', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useDebouncedEffect(effect, [dep], 300), { initialProps: { dep: 1 } });

    rerender({ dep: 2 });

    jest.advanceTimersByTime(300);
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
