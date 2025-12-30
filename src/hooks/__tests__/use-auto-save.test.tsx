import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useAutoSave } from '../use-auto-save';

jest.useFakeTimers();

describe('useAutoSave', () => {
  it('should call onSave when data changes', async () => {
    const onSave = jest.fn(() => Promise.resolve());
    const { rerender } = renderHook(({ data }) => useAutoSave({ data, onSave, interval: 1000 }), {
      initialProps: { data: 'initial' },
    });

    rerender({ data: 'new data' });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(onSave).toHaveBeenCalledWith('new data');
  });

  it('should not call onSave if data did not change', async () => {
    const onSave = jest.fn();
    renderHook(() => useAutoSave({ data: 'same', onSave, interval: 1000 }));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(onSave).not.toHaveBeenCalled();
  });
});
