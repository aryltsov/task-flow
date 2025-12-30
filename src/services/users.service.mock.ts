import type { User } from '@models/user.interface';

const mockUsers: User[] = [
  { id: 'alice', name: 'Alice', email: 'alice@example.com' },
  { id: 'bob', name: 'Bob', email: 'bob@example.com' },
];

export const usersServiceMock = {
  fetchUsers: async () => mockUsers,
  getUserById: async (id: string) => mockUsers.find(u => u.id === id) || null,
  getAll: async () => mockUsers
};
