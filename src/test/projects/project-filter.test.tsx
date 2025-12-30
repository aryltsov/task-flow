import { render, screen, fireEvent, act } from '@testing-library/react';
import { useUsersStore } from '@stores/users.store';
import ProjectFilter from '@components/project-filter';
import { beforeEach, describe, it, expect, jest } from '@jest/globals';

jest.mock('@stores/users.store', () => {
  return {
    useUsersStore: jest.fn(),
  };
});

describe('ProjectFilter', () => {
  const users = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' },
  ];

  const mockFetchUsers = jest.fn();

  beforeEach(() => {
    (useUsersStore as unknown as jest.Mock).mockReturnValue({
      users,
      fetchUsers: mockFetchUsers,
      loading: false,
      loaded: true,
    });
  });

  it('fetches users on mount', async () => {
    await act(async () => {
      render(<ProjectFilter />);
    });

    expect(mockFetchUsers).toHaveBeenCalled();
  });

  it('updates status filter', async () => {
    await act(async () => {
      render(<ProjectFilter />);
    });

    const combos = screen.getAllByRole('combobox');
    const select = combos.find((el) => el.tagName.toLowerCase() === 'select') as HTMLSelectElement;

    await act(async () => {
      fireEvent.change(select, { target: { value: 'active' } });
    });

    expect(select.value).toBe('active');
  });

  it('updates creatorId filter', async () => {
    await act(async () => {
      render(<ProjectFilter />);
    });

    const inputs = screen.getAllByRole('combobox');
    const creatorInput = inputs.find((el) => (el as HTMLInputElement).placeholder === 'Select creator...') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(creatorInput, { target: { value: 'Alice' } });
    });

    expect(creatorInput.value).toBe('Alice');
  });
});
