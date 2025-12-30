import { renderHook } from '@testing-library/react';
import { useMetaStore } from '@stores/meta.store';
import { useBoardSections } from '../use-board-sections';
import type { Task } from '@models/task.interface';

jest.mock('@stores/meta.store', () => ({
  useMetaStore: jest.fn(),
}));

const mockedUseMetaStore = useMetaStore as jest.MockedFunction<typeof useMetaStore>;

describe('useBoardSections', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should organize tasks by status', () => {
    mockedUseMetaStore.mockImplementation((selector) =>
      selector({
        statuses: ['todo', 'done'],
      } as any)
    );

    const tasks = [{ id: '1', status: 'todo', title: 'Task 1' } as Task, { id: '2', status: 'done', title: 'Task 2' } as Task];

    const { result } = renderHook(() => useBoardSections(tasks));

    expect(result.current).toEqual({
      todo: [{ id: '1', status: 'todo', title: 'Task 1' }],
      done: [{ id: '2', status: 'done', title: 'Task 2' }],
    });
  });

  it('should return empty object if no statuses', () => {
    mockedUseMetaStore.mockImplementation((selector) =>
      selector({
        statuses: [],
      } as any)
    );

    const { result } = renderHook(() => useBoardSections([]));

    expect(result.current).toEqual({});
  });
});
