import { create } from 'zustand';
import type { User } from '@models/user.interface.ts';
import { getUsersService } from '@services/users.service.ts';

type UsersState = {
  users: User[];
  loading: boolean;
  loaded: boolean;

  fetchUsers: () => Promise<void>;
};

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  loading: false,
  loaded: false,

  fetchUsers: async () => {
    if (get().loaded || get().loading) return;

    set({ loading: true });

    try {
      const users = await getUsersService().getAll();
      // eslint-disable-next-line no-console
      console.log('useUsersStore.fetchUsers: loaded users:', users);
      set({ users, loading: false, loaded: true });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('useUsersStore.fetchUsers: error', err);
      set({ loading: false });
    }
  },
}));
