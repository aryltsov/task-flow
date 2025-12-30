import { renderHook } from '@testing-library/react';
import { usePriorityMap } from '../use-priority-map';
import { useMetaStore } from '@stores/meta.store';

jest.mock('@stores/meta.store');
jest.mock('@services/meta.service', () => ({
  metaService: {
    getPriorities: jest.fn().mockReturnValue([
      { type: 'high', color: 'red' },
      { type: 'low', color: 'green' },
    ]),
  },
}));

describe('usePriorityMap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should map priorities correctly', () => {
    (useMetaStore as unknown as jest.Mock).mockReturnValue([
      { type: 'high', color: 'red' },
      { type: 'low', color: 'green' },
    ]);

    const { result } = renderHook(() => usePriorityMap());

    expect(result.current).toEqual({
      high: { label: 'high', cls: 'badge-red' },
      low: { label: 'low', cls: 'badge-green' },
    });
  });

  it('should return empty object if no priorities', () => {
    (useMetaStore as unknown as jest.Mock).mockReturnValue([]);
    const { result } = renderHook(() => usePriorityMap());
    expect(result.current).toEqual({});
  });
});
