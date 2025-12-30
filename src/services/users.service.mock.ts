import type { User } from '@models/user.interface';

const mockUsers: User[] = [
  { id: 'alice', name: 'Alice', email: 'alice@example.com' },
  { id: 'bob', name: 'Bob', email: 'bob@example.com' },
];

export const usersServiceMock = {
  fetchUsers: async () => {
    // eslint-disable-next-line no-console
    console.log('MOCK fetchUsers called, returning:', mockUsers);
    return mockUsers;
  },
  getUserById: async (id: string) => {
    const user = mockUsers.find(u => u.id === id) || null;
    // eslint-disable-next-line no-console
    console.log('MOCK getUserById called, id:', id, 'result:', user);
    return user;
  },
  getAll: async () => {
    // eslint-disable-next-line no-console
    console.log('MOCK getAll called, returning:', mockUsers);
    return mockUsers;
  }
};
