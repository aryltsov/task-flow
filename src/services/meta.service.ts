import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const metaService = {
  getStatuses: async (): Promise<any> => {
    const statusesSnap = await getDocs(collection(db, 'statuses'));
    return statusesSnap.docs.map((doc) => doc.data());
  },
};
