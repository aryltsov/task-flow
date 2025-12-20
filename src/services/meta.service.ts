import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const COLLECTION_NAME = 'statuses';

export interface StatusesInterface {
  'task-statuses': string[];
  'task-priorities': { color: string; type: string }[];
}

export const metaService = {
  getStatuses: async (): Promise<StatusesInterface> => {
    const statusesSnap = await getDocs(collection(db, COLLECTION_NAME));
    const data = statusesSnap.docs[0]?.data() as StatusesInterface;

    if (!data) {
      return { 'task-statuses': [], 'task-priorities': [] };
    }

    return data;
  },
};
