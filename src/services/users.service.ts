import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '@models/user.interface';

const COLLECTION_NAME = 'users';

const realUsersService = {
  getAll: async (): Promise<User[]> => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<User, 'id'>),
    }));
    return users;
  },
};

export function getUsersService() {
  if (typeof window !== 'undefined' && (window as any).__E2E_USERS_MOCK__) {
    return (window as any).__E2E_USERS_MOCK__;
  }
  return realUsersService;
}
